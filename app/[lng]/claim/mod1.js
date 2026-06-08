'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Wallet, 
    ArrowRight, 
    CheckCircle2, 
    AlertTriangle, 
    RefreshCw, 
    Lock, 
    Unlock, 
    Coins, 
    ExternalLink,
    ChevronDown,
    Activity
} from 'lucide-react';
import { HyperText } from '@/app/components/ui/hyper-text';
import Pagination from '../components/pagination';

// --- CONTRACT CONFIGURATION ---
const CONTRACT_CONFIGS = {
    // Ethereum Mainnet (ChainID: 1)
    1: {
        name: 'Ethereum',
        symbol: 'ETH',
        saleAddress: '0xe704d6ed1a159e20afcc17421257818206413633',
        nphAddress: '0xb000f8da0ed095554ac1e27d8e3ff9cecc1d0000',
        explorer: 'https://etherscan.io',
        rpc: 'https://ethereum.publicnode.com'
    },
    // BNB Chain (ChainID: 56)
    56: {
        name: 'BNB Chain',
        symbol: 'BSC',
        saleAddress: '0x4DF1bF251834b48399cF0EaA8358f4A1C2f64602',
        nphAddress: '0xb000f8da0ed095554ac1e27d8e3ff9cecc1d0000',
        explorer: 'https://bscscan.com',
        rpc: 'https://bsc-dataseed1.binance.org'
    }
};

// --- ABIs ---
const SALE_ABI = [
    "function getUserPurchases(address _user) external view returns (tuple(uint256 totalNphAmount, uint256 tgeAmount, uint256 vestingAmount, uint256 claimedAmount, uint256 purchaseTime)[] memory)",
    "function getClaimableTokens(address _user) external view returns (uint256 totalClaimable)",
    "function claimTokens() external",
    "function vestingStartTime() external view returns (uint256)",
    "function VESTING_DURATION() external view returns (uint256)"
];

const ELIGIBLE_EVENTS = [
    { label: 'Public Sale Buyer', desc: 'Participated in the NPH Token Sale on Ethereum or BNB Chain.' },
    { label: 'Early Community Member', desc: 'Whitelist participants from official campaigns and early contributions.' },
    { label: 'Airdrop Recipient', desc: 'Qualified users from social tasks, testnet activities, and partner rewards.' },
];

export default function ClaimMod1() {
    // --- WEB3 STATES ---
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [chainId, setChainId] = useState(1); // Default to Ethereum
    const [targetChainId, setTargetChainId] = useState(1); // Selected chain tab (1 or 56)
    
    // --- DATA STATES ---
    const [isLoading, setIsLoading] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [vestingStartTime, setVestingStartTime] = useState(0);
    const [vestingDuration, setVestingDuration] = useState(180 * 24 * 3600); // 180 days default
    const [userPurchases, setUserPurchases] = useState([]);
    const [claimableAmount, setClaimableAmount] = useState(0n);
    const [stats, setStats] = useState({
        totalPurchased: 0n,
        tgeReleased: 0n,
        vestingLocked: 0n,
        alreadyClaimed: 0n,
        availableToClaim: 0n
    });

    // --- INTERACTION STATES ---
    const [txHash, setTxHash] = useState('');
    const [txStatus, setTxHashStatus] = useState(''); // 'pending' | 'success' | 'failed'
    const [particles, setParticles] = useState([]);
    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

    // --- TIMERS & UPDATES ---
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Math.floor(Date.now() / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Generate beautiful particle positions on client side
    useEffect(() => {
        const generated = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            delay: `${(i * 0.4) % 4}s`,
            duration: `${4 + (i % 5)}s`,
        }));
        setParticles(generated);
    }, []);

    // Detect injected wallet on mount
    useEffect(() => {
        if (typeof window !== 'undefined' && window.ethereum) {
            const handleAccounts = (accounts) => {
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                    setWalletConnected(true);
                    initEthers();
                } else {
                    setWalletConnected(false);
                    setWalletAddress('');
                    setSigner(null);
                }
            };

            const handleChain = (hexChainId) => {
                const parsedId = parseInt(hexChainId, 16);
                setChainId(parsedId);
                if (parsedId === 1 || parsedId === 56) {
                    setTargetChainId(parsedId);
                }
            };

            window.ethereum.on('accountsChanged', handleAccounts);
            window.ethereum.on('chainChanged', handleChain);

            // Auto-connect if already authorized
            window.ethereum.request({ method: 'eth_accounts' })
                .then(handleAccounts)
                .catch(console.error);

            return () => {
                if (window.ethereum.removeListener) {
                    window.ethereum.removeListener('accountsChanged', handleAccounts);
                    window.ethereum.removeListener('chainChanged', handleChain);
                }
            };
        }
    }, []);

    // Initialize ethers provider
    const initEthers = async () => {
        if (typeof window !== 'undefined' && window.ethereum) {
            const browserProvider = new ethers.BrowserProvider(window.ethereum);
            const browserSigner = await browserProvider.getSigner();
            const network = await browserProvider.getNetwork();
            
            setProvider(browserProvider);
            setSigner(browserSigner);
            setChainId(Number(network.chainId));
            
            const currentChain = Number(network.chainId);
            if (currentChain === 1 || currentChain === 56) {
                setTargetChainId(currentChain);
            }
        }
    };

    // Trigger wallet connection
    const handleConnectWallet = async () => {
        setIsLoading(true);
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setWalletConnected(true);
                await initEthers();
            } catch (e) {
                console.error("User rejected wallet connection", e);
            }
        } else {
            alert("No Web3 wallet detected. Please install MetaMask or OKX Wallet.");
        }
        setIsLoading(false);
    };

    // Switch network helper
    const handleSwitchNetwork = async (targetId) => {
        if (typeof window !== 'undefined' && window.ethereum) {
            const hexChainId = '0x' + targetId.toString(16);
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: hexChainId }],
                });
                setTargetChainId(targetId);
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        const chainParams = targetId === 56 ? {
                            chainId: '0x38',
                            chainName: 'BNB Smart Chain',
                            nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
                            rpcUrls: ['https://bsc-dataseed1.binance.org'],
                            blockExplorerUrls: ['https://bscscan.com']
                        } : null;

                        if (chainParams) {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [chainParams],
                            });
                        }
                    } catch (addError) {
                        console.error("Failed to add network", addError);
                    }
                }
                console.error("Failed to switch network", switchError);
            }
        }
    };

    // Fetch user data from contract
    const fetchContractData = async () => {
        if (!walletAddress) return;
        setIsLoading(true);
        
        try {
            const config = CONTRACT_CONFIGS[targetChainId];
            if (!config) return;

            // Use BrowserProvider if connected to correct chain, otherwise use static fallback JsonRpcProvider
            let activeProvider;
            if (walletConnected && chainId === targetChainId && provider) {
                activeProvider = provider;
            } else {
                activeProvider = new ethers.JsonRpcProvider(config.rpc);
            }

            const saleContract = new ethers.Contract(config.saleAddress, SALE_ABI, activeProvider);

            // Fetch global parameters
            const [startTime, duration] = await Promise.all([
                saleContract.vestingStartTime().catch(() => 0n),
                saleContract.VESTING_DURATION().catch(() => 180n * 24n * 3600n)
            ]);

            setVestingStartTime(Number(startTime));
            setVestingDuration(Number(duration));

            // Fetch user purchases & claimable
            const [purchases, claimable] = await Promise.all([
                saleContract.getUserPurchases(walletAddress).catch(() => []),
                saleContract.getClaimableTokens(walletAddress).catch(() => 0n)
            ]);

            setUserPurchases(purchases);
            setClaimableAmount(claimable);

            // Calculate aggregate stats
            let totalPurchased = 0n;
            let tgeReleased = 0n;
            let vestingLocked = 0n;
            let alreadyClaimed = 0n;

            purchases.forEach(p => {
                totalPurchased += p.totalNphAmount;
                tgeReleased += p.tgeAmount;
                vestingLocked += p.vestingAmount;
                alreadyClaimed += p.claimedAmount;
            });

            setStats({
                totalPurchased,
                tgeReleased,
                vestingLocked,
                alreadyClaimed,
                availableToClaim: claimable
            });

        } catch (error) {
            console.error("Failed to fetch contract data", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Re-fetch when wallet, chain, or target tab changes
    useEffect(() => {
        fetchContractData();
    }, [walletAddress, chainId, targetChainId, walletConnected]);

    // Execute Claim Transaction
    const handleExecuteClaim = async () => {
        if (!walletConnected || !signer) return;
        if (chainId !== targetChainId) {
            await handleSwitchNetwork(targetChainId);
            return;
        }

        if (claimableAmount === 0n) {
            alert("You do not have any claimable NPH tokens at the moment.");
            return;
        }

        setIsActionLoading(true);
        setTxHash('');
        setTxHashStatus('pending');

        try {
            const config = CONTRACT_CONFIGS[targetChainId];
            const saleContract = new ethers.Contract(config.saleAddress, SALE_ABI, signer);

            const tx = await saleContract.claimTokens();
            setTxHash(tx.hash);
            
            // Wait for confirmation
            await tx.wait();
            setTxHashStatus('success');
            
            // Refresh data
            await fetchContractData();
        } catch (error) {
            console.error("Claim transaction failed", error);
            setTxHashStatus('failed');
        } finally {
            setIsActionLoading(false);
        }
    };

    // Helper: format address
    const formatAddress = (addr) => {
        if (!addr) return '';
        return addr.slice(0, 6) + '...' + addr.slice(-4);
    };

    // Helper: format big numbers to clean decimal strings
    const formatNph = (amount) => {
        if (!amount) return '0.00';
        const formatted = ethers.formatEther(amount);
        return parseFloat(formatted).toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    };

    // Calculate live linear unlocking progress
    const calculateLiveProgress = () => {
        if (vestingStartTime === 0 || currentTime <= vestingStartTime) {
            return 0;
        }
        const timePassed = currentTime - vestingStartTime;
        if (timePassed >= vestingDuration) {
            return 100;
        }
        return (timePassed / vestingDuration) * 100;
    };

    const liveProgress = calculateLiveProgress();

    return (
        <>
            {/* Hero Section */}
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-[46px] left-0 -z-1 border-[#2B2B2B] cut-border max-qw:hidden' />
                <div className="w-base min-h-[820px] text-white border border-b-0 border-t-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none relative overflow-hidden max-qw:min-h-[600px] flex flex-col justify-between">
                    <Pagination className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none' page='01' title='CLAIM' desc='$NPH' />
                    
                    {/* Animated background particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {particles.map((p) => (
                            <div
                                key={p.id}
                                className="absolute w-1.5 h-1.5 bg-[#C6AC6F] opacity-15 rounded-full animate-pulse"
                                style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }}
                            />
                        ))}
                    </div>

                    <div className='w-full flex-grow flex flex-col items-center justify-center py-24 px-6 max-qw:py-16'>
                        {/* Title */}
                        <div className='text-center mb-10'>
                            <div className='text-[11px] text-[#C6AC6F] tracking-[5px] mb-3 uppercase font-mono flex items-center justify-center gap-2'>
                                <Activity className="w-3.5 h-3.5 animate-pulse text-[#C6AC6F]" />
                                Live Linear Vesting Portal
                            </div>
                            <h1 className='text-[52px] font-bold leading-tight max-qw:text-[32px] tracking-tight'>
                                CLAIM YOUR <span className='text-[#C6AC6F] font-mono'>$NPH</span>
                            </h1>
                            <div className='text-[15px] text-[rgba(255,255,255,0.4)] mt-3 max-qw:text-[13px] max-w-[560px] mx-auto leading-relaxed'>
                                Connect your designated Web3 wallet to check eligibility, view live unlocking progress, and claim your vested NPH tokens.
                            </div>
                        </div>

                        {/* --- MAIN INTERACTION CONTAINER --- */}
                        <div className='w-full max-w-[620px] bg-[#111111]/90 border border-[#2B2B2B] relative group backdrop-blur-md overflow-hidden shadow-2xl'>
                            {/* Decorative corner accents */}
                            <div className='absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#C6AC6F]' />
                            <div className='absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#C6AC6F]' />
                            <div className='absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#C6AC6F]' />
                            <div className='absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#C6AC6F]' />

                            {/* --- TAB HEADERS (Ethereum / BNB Chain) --- */}
                            <div className='flex border-b border-[#2B2B2B] bg-[#0A0A0A]'>
                                <button
                                    onClick={() => setTargetChainId(1)}
                                    className={`flex-1 py-4 text-[13px] font-mono tracking-widest transition-all duration-300 border-r border-[#2B2B2B] flex items-center justify-center gap-2 ${targetChainId === 1 ? 'bg-[#111111] text-[#C6AC6F] font-semibold' : 'text-[rgba(255,255,255,0.4)] hover:text-white'}`}
                                >
                                    <span className={`w-2 h-2 rounded-full ${chainId === 1 && walletConnected ? 'bg-green-500 animate-pulse' : 'bg-neutral-600'}`} />
                                    ETHEREUM MAINNET
                                </button>
                                <button
                                    onClick={() => setTargetChainId(56)}
                                    className={`flex-1 py-4 text-[13px] font-mono tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${targetChainId === 56 ? 'bg-[#111111] text-[#C6AC6F] font-semibold' : 'text-[rgba(255,255,255,0.4)] hover:text-white'}`}
                                >
                                    <span className={`w-2 h-2 rounded-full ${chainId === 56 && walletConnected ? 'bg-green-500 animate-pulse' : 'bg-neutral-600'}`} />
                                    BNB SMART CHAIN
                                </button>
                            </div>

                            <div className='p-8 max-qw:p-5'>
                                <AnimatePresence mode='wait'>
                                    {/* --- STATE 1: NOT CONNECTED --- */}
                                    {!walletConnected ? (
                                        <motion.div
                                            key="not-connected"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className='flex flex-col items-center py-6 text-center'
                                        >
                                            <div className='w-16 h-16 rounded-full bg-[#C6AC6F]/5 border border-[#C6AC6F]/20 flex items-center justify-center mb-6 shadow-inner animate-pulse'>
                                                <Wallet className='w-8 h-8 text-[#C6AC6F]' />
                                            </div>
                                            <h3 className='text-[20px] font-medium mb-2'>Secure Web3 Authorization</h3>
                                            <p className='text-[13px] text-[rgba(255,255,255,0.4)] mb-8 max-w-[380px] leading-relaxed'>
                                                Please authorize your Web3 wallet (MetaMask, OKX, etc.) to verify your $NPH token allocation and access the linear claim panel.
                                            </p>
                                            <button
                                                onClick={handleConnectWallet}
                                                disabled={isLoading}
                                                className='w-full py-4 bg-[#C6AC6F] text-black font-semibold text-[14px] hover:bg-[#D7C08C] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]'
                                            >
                                                {isLoading ? (
                                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <Wallet className="w-4 h-4" />
                                                        Connect Wallet
                                                    </>
                                                )}
                                            </button>
                                        </motion.div>
                                    ) : (
                                        /* --- STATE 2: CONNECTED & LOADING --- */
                                        isLoading ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className='flex flex-col items-center py-16'
                                            >
                                                <RefreshCw className="w-10 h-10 animate-spin text-[#C6AC6F] mb-4" />
                                                <div className="text-[13px] font-mono text-[rgba(255,255,255,0.4)]">Synchronizing with blockchain...</div>
                                            </motion.div>
                                        ) : (
                                            /* --- STATE 3: CONNECTED & LOADED --- */
                                            <motion.div
                                                key="dashboard"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className='space-y-6'
                                            >
                                                {/* Wallet Address & Network Banner */}
                                                <div className='flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#2B2B2B] text-[12px] font-mono rounded'>
                                                    <div className='flex items-center gap-2'>
                                                        <div className='w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse' />
                                                        <span className='text-[rgba(255,255,255,0.4)]'>Address:</span>
                                                        <span className='text-white font-semibold'>{formatAddress(walletAddress)}</span>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='text-[rgba(255,255,255,0.4)]'>Network:</span>
                                                        <span className='text-[#C6AC6F] uppercase font-bold'>{CONTRACT_CONFIGS[chainId]?.name || 'Unsupported'}</span>
                                                    </div>
                                                </div>

                                                {/* --- IF USER HAS NO PURCHASES --- */}
                                                {userPurchases.length === 0 ? (
                                                    <div className='py-8 text-center border border-dashed border-[#2B2B2B] p-6 rounded bg-[#111111]'>
                                                        <Coins className='w-12 h-12 text-[rgba(255,255,255,0.2)] mx-auto mb-4' />
                                                        <h4 className='text-[16px] font-medium mb-1'>No Allocation Found</h4>
                                                        <p className='text-[12px] text-[rgba(255,255,255,0.4)] max-w-[340px] mx-auto mb-6 leading-relaxed'>
                                                            We could not detect any NPH token purchases for this wallet address on {CONTRACT_CONFIGS[targetChainId]?.name}.
                                                        </p>
                                                        <a
                                                            href="/"
                                                            className='inline-flex items-center gap-1.5 text-[12px] text-[#C6AC6F] font-semibold hover:underline'
                                                        >
                                                            Go to Token Sale Page <ArrowRight className='w-3.5 h-3.5' />
                                                        </a>
                                                    </div>
                                                ) : (
                                                    /* --- IF USER HAS PURCHASES (DASHBOARD) --- */
                                                    <div className='space-y-6'>
                                                        {/* Linear Vesting Progress Bar */}
                                                        <div className='space-y-2'>
                                                            <div className='flex justify-between text-[12px] font-mono'>
                                                                <span className='text-[rgba(255,255,255,0.4)] flex items-center gap-1.5'>
                                                                    <Lock className='w-3.5 h-3.5 text-[#C6AC6F]' />
                                                                    Linear Unlocking Progress (6 Months)
                                                                </span>
                                                                <span className='text-[#C6AC6F] font-bold'>{liveProgress.toFixed(4)}%</span>
                                                            </div>
                                                            <div className='w-full h-2 bg-[#0A0A0A] border border-[#2B2B2B] rounded-full overflow-hidden p-[1px]'>
                                                                <motion.div 
                                                                    className='h-full bg-gradient-to-r from-[#8E7843] to-[#C6AC6F] rounded-full shadow-[0_0_8px_#C6AC6F]'
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${liveProgress}%` }}
                                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                                />
                                                            </div>
                                                            <div className='flex justify-between text-[10px] text-[rgba(255,255,255,0.3)] font-mono pt-1'>
                                                                <span>Vesting Started: {vestingStartTime > 0 ? new Date(vestingStartTime * 1000).toLocaleDateString() : 'Pending'}</span>
                                                                <span>Duration: 180 Days</span>
                                                            </div>
                                                        </div>

                                                        {/* Stats Grid */}
                                                        <div className='grid grid-cols-2 gap-4'>
                                                            <div className='p-4 bg-[#0A0A0A] border border-[#2B2B2B] rounded'>
                                                                <div className='text-[10px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider mb-1 font-mono'>Total Purchased</div>
                                                                <div className='text-[18px] font-bold text-white font-mono'>{formatNph(stats.totalPurchased)}</div>
                                                                <div className='text-[9px] text-[rgba(255,255,255,0.25)] font-mono mt-1'>20% TGE + 80% Locked</div>
                                                            </div>
                                                            <div className='p-4 bg-[#0A0A0A] border border-[#2B2B2B] rounded'>
                                                                <div className='text-[10px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider mb-1 font-mono'>TGE Released (20%)</div>
                                                                <div className='text-[18px] font-bold text-neutral-400 font-mono'>{formatNph(stats.tgeReleased)}</div>
                                                                <div className='text-[9px] text-[rgba(255,255,255,0.25)] font-mono mt-1'>Transferred immediately</div>
                                                            </div>
                                                            <div className='p-4 bg-[#0A0A0A] border border-[#2B2B2B] rounded'>
                                                                <div className='text-[10px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider mb-1 font-mono'>Vested Locked (80%)</div>
                                                                <div className='text-[18px] font-bold text-neutral-400 font-mono'>{formatNph(stats.vestingLocked)}</div>
                                                                <div className='text-[9px] text-[rgba(255,255,255,0.25)] font-mono mt-1'>Subject to linear unlock</div>
                                                            </div>
                                                            <div className='p-4 bg-[#0A0A0A] border border-[#2B2B2B] rounded'>
                                                                <div className='text-[10px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider mb-1 font-mono'>Already Claimed</div>
                                                                <div className='text-[18px] font-bold text-neutral-400 font-mono'>{formatNph(stats.alreadyClaimed)}</div>
                                                                <div className='text-[9px] text-[rgba(255,255,255,0.25)] font-mono mt-1'>Transferred to wallet</div>
                                                            </div>
                                                        </div>

                                                        {/* Claim Panel */}
                                                        <div className='p-5 bg-[#C6AC6F]/5 border border-[#C6AC6F]/20 rounded space-y-4'>
                                                            <div className='flex items-center justify-between'>
                                                                <div className='flex items-center gap-2'>
                                                                    <Unlock className='w-4 h-4 text-[#C6AC6F]' />
                                                                    <span className='text-[13px] font-semibold text-white'>Available to Claim</span>
                                                                </div>
                                                                <span className='text-[22px] font-bold text-[#C6AC6F] font-mono'>{formatNph(stats.availableToClaim)} <span className='text-[12px] text-white font-sans font-normal'>NPH</span></span>
                                                            </div>

                                                            {/* Action Button */}
                                                            {chainId !== targetChainId ? (
                                                                <button
                                                                    onClick={() => handleSwitchNetwork(targetChainId)}
                                                                    className='w-full py-4 bg-[#C6AC6F] text-black font-semibold text-[13px] hover:bg-[#D7C08C] transition-all duration-300 flex items-center justify-center gap-2'
                                                                >
                                                                    <RefreshCw className='w-4 h-4' />
                                                                    Switch to {CONTRACT_CONFIGS[targetChainId]?.name}
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={handleExecuteClaim}
                                                                    disabled={isActionLoading || stats.availableToClaim === 0n}
                                                                    className={`w-full py-4 font-semibold text-[13px] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] ${stats.availableToClaim === 0n ? 'bg-[#2B2B2B] text-[rgba(255,255,255,0.3)] cursor-not-allowed' : 'bg-[#C6AC6F] text-black hover:bg-[#D7C08C]'}`}
                                                                >
                                                                    {isActionLoading ? (
                                                                        <RefreshCw className='w-4 h-4 animate-spin' />
                                                                    ) : (
                                                                        <>
                                                                            <Coins className='w-4 h-4' />
                                                                            Claim Unlocked Tokens
                                                                        </>
                                                                    )}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Transaction Status Overlay */}
                                                {txHash && (
                                                    <div className='p-4 bg-[#0A0A0A] border border-[#2B2B2B] rounded space-y-2 text-[12px] font-mono'>
                                                        <div className='flex items-center justify-between'>
                                                            <span className='text-[rgba(255,255,255,0.4)]'>Status:</span>
                                                            <span className={`font-bold flex items-center gap-1.5 uppercase ${txStatus === 'success' ? 'text-green-500' : txStatus === 'failed' ? 'text-red-500' : 'text-yellow-500 animate-pulse'}`}>
                                                                {txStatus === 'pending' && <RefreshCw className='w-3.5 h-3.5 animate-spin' />}
                                                                {txStatus === 'success' && <CheckCircle2 className='w-3.5 h-3.5' />}
                                                                {txStatus === 'failed' && <AlertTriangle className='w-3.5 h-3.5' />}
                                                                {txStatus}
                                                            </span>
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <span className='text-[rgba(255,255,255,0.4)]'>Tx Hash:</span>
                                                            <a 
                                                                href={`${CONTRACT_CONFIGS[targetChainId]?.explorer}/tx/${txHash}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className='text-[#C6AC6F] hover:underline flex items-center gap-1'
                                                            >
                                                                {formatAddress(txHash)} <ExternalLink className='w-3 h-3' />
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Card bottom accent line */}
                            <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-[#2B2B2B] to-transparent' />
                        </div>

                        {/* Pre-registration Phase / Live Status Info */}
                        <div className='mt-6 text-[12px] text-[rgba(255,255,255,0.25)] text-center max-w-[480px] leading-relaxed font-mono'>
                            Secure ERC-20 Vesting Gateway. All operations are processed directly on-chain via smart contracts on Ethereum and BNB Chain.
                        </div>
                    </div>
                </div>
            </div>

            {/* Eligibility Info Section */}
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base text-white border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] relative overflow-hidden">
                    <Pagination page='02' title='ELIGIBILITY' total='02' />
                    <div className='w-full p-[40px] max-qw:p-5'>
                        <div className='mb-8'>
                            <h2 className='text-[28px] font-semibold mb-2 max-qw:text-[20px]'>Who Can Claim?</h2>
                            <p className='text-[14px] text-[rgba(255,255,255,0.4)]'>The following groups are eligible to claim $NPH tokens in this round.</p>
                        </div>
                        <div className='grid grid-cols-3 gap-4 max-bw:grid-cols-1'>
                            {ELIGIBLE_EVENTS.map((item, idx) => (
                                <div key={idx} className='border border-[#2B2B2B] p-6 bg-[#111111] relative group hover:border-[#C6AC6F]/40 transition-all duration-300'>
                                    <div className='absolute top-4 right-4 text-[11px] text-[rgba(255,255,255,0.2)] font-mono'>/ 0x0{idx + 1}</div>
                                    <div className='w-8 h-[2px] bg-[#C6AC6F] mb-4' />
                                    <h3 className='text-[16px] text-white mb-3 font-medium'>
                                        <HyperText>{item.label}</HyperText>
                                    </h3>
                                    <p className='text-[13px] text-[rgba(255,255,255,0.4)] leading-relaxed'>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Token Distribution Info */}
                        <div className='mt-10 border border-[#2B2B2B] p-6 bg-[#111111]'>
                            <div className='grid grid-cols-4 gap-6 max-bw:grid-cols-2 max-qw:grid-cols-1'>
                                <div>
                                    <div className='text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-widest mb-2'>Token Name</div>
                                    <div className='text-[20px] text-[#C6AC6F] font-semibold'>$NPH</div>
                                </div>
                                <div>
                                    <div className='text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-widest mb-2'>Total Supply</div>
                                    <div className='text-[20px] text-white font-semibold'>200,000,000</div>
                                </div>
                                <div>
                                    <div className='text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-widest mb-2'>Network</div>
                                    <div className='text-[20px] text-white font-semibold'>Multi-Chain (OFT)</div>
                                </div>
                                <div>
                                    <div className='text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-widest mb-2'>Linear Unlock</div>
                                    <div className='text-[20px] text-white font-semibold'>180 Days</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
