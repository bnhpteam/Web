'use client';
import { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

// 4 EVM Chains NPH contract config
const NPH_CONTRACT_ADDRESS = "0xb000f8dA0ed095554aC1e27d8e3fF9CECc1d0000";

const CHAINS = [
    {
        id: '1',
        hexId: '0x1',
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e3747116e8c9e557fc1a8d40d8b7b1/svg/color/eth.svg',
        explorer: 'https://etherscan.io',
        lzEid: 30101
    },
    {
        id: '56',
        hexId: '0x38',
        name: 'BNB Chain',
        symbol: 'BNB',
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e3747116e8c9e557fc1a8d40d8b7b1/svg/color/bnb.svg',
        explorer: 'https://bscscan.com',
        lzEid: 30102
    },
    {
        id: '42161',
        hexId: '0xa4b1',
        name: 'Arbitrum One',
        symbol: 'ETH',
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e3747116e8c9e557fc1a8d40d8b7b1/svg/color/arb.svg',
        explorer: 'https://arbiscan.io',
        lzEid: 30143
    },
    {
        id: '8453',
        hexId: '0x2105',
        name: 'Base',
        symbol: 'ETH',
        icon: 'https://raw.githubusercontent.com/base-org/brand-kit/main/assets/svg/Base_Symbol_Blue.svg',
        explorer: 'https://basescan.org',
        lzEid: 30184
    }
];

// Standard ERC20 + OFT ABI (Only needed functions)
const NPH_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function quoteSend(tuple(uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, bool _payInLzToken) view returns (tuple(uint256 nativeFee, uint256 lzTokenFee))",
    "function send(tuple(uint32 dstEid, bytes32 to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd) _sendParam, tuple(uint256 nativeFee, uint256 lzTokenFee) _fee, address _refundAddress) payable returns (tuple(bytes32 guid, uint64 nonce, tuple(uint256 nativeFee, uint256 lzTokenFee) fee))"
];

export default function BridgeMod1({ lng }) {
    // State
    const [account, setAddress] = useState('');
    const [currentChainId, setCurrentChainId] = useState('');
    const [fromChain, setFromChain] = useState(CHAINS[0]);
    const [toChain, setToChain] = useState(CHAINS[1]);
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState('0.0');
    const [loading, setLoading] = useState(false);
    const [quoteFee, setQuoteFee] = useState('0.0');
    const [quoteLoading, setQuoteLoading] = useState(false);
    
    // Bridge transaction status
    const [txState, setTxState] = useState('idle'); // 'idle' | 'approving' | 'sending' | 'in_flight' | 'success' | 'failed'
    const [txHash, setTxHash] = useState('');
    const [dstTxHash, setDstTxHash] = useState('');
    const [progress, setProgress] = useState(0);

    // Multilingual support (simple implementation for bridge context)
    const t = {
        en: {
            title: "BNHP Omnichain Bridge",
            subtitle: "Seamlessly transfer NPH tokens across EVM networks powered by LayerZero V2 OFT.",
            connect: "Connect Wallet",
            from: "From",
            to: "To",
            balance: "Balance",
            amount: "Amount",
            max: "MAX",
            quote: "Estimated Cross-Chain Fee",
            bridgeBtn: "Transfer Tokens",
            switchNetwork: "Switch Network to ",
            insufficient: "Insufficient NPH Balance",
            loading: "Processing...",
            step1: "1. Initiate Transfer",
            step2: "2. LayerZero Routing",
            step3: "3. Delivered to Destination",
            txSuccess: "Transfer Successful!",
            txFailed: "Transfer Failed",
            viewLz: "View on LayerZero Scan",
            mockBtn: "Mock Demo Mode (Instant Experience)"
        },
        zh: {
            title: "BNHP 全链跨链桥",
            subtitle: "基于 LayerZero V2 OFT 协议，在多条 EVM 网络之间无缝转移 NPH 代币。",
            connect: "连接钱包",
            from: "源链",
            to: "目标链",
            balance: "余额",
            amount: "跨链数量",
            max: "最大",
            quote: "预估跨链 Gas 费",
            bridgeBtn: "开始跨链转账",
            switchNetwork: "切换网络至 ",
            insufficient: "NPH 余额不足",
            loading: "处理中...",
            step1: "1. 发起跨链交易",
            step2: "2. LayerZero 网络路由中",
            step3: "3. 目标链资产已到账",
            txSuccess: "跨链转账成功！",
            txFailed: "跨链转账失败",
            viewLz: "在 LayerZero Scan 查看",
            mockBtn: "模拟体验模式 (免 Gas 体验)"
        }
    }[lng] || {
        title: "BNHP Omnichain Bridge",
        subtitle: "Seamlessly transfer NPH tokens across EVM networks powered by LayerZero V2 OFT.",
        connect: "Connect Wallet",
        from: "From",
        to: "To",
        balance: "Balance",
        amount: "Amount",
        max: "MAX",
        quote: "Estimated Cross-Chain Fee",
        bridgeBtn: "Transfer Tokens",
        switchNetwork: "Switch Network to ",
        insufficient: "Insufficient NPH Balance",
        loading: "Processing...",
        step1: "1. Initiate Transfer",
        step2: "2. LayerZero Routing",
        step3: "3. Delivered to Destination",
        txSuccess: "Transfer Successful!",
        txFailed: "Transfer Failed",
        viewLz: "View on LayerZero Scan",
        mockBtn: "Mock Demo Mode (Instant Experience)"
    };

    // Auto flip destination chain if it matches source chain
    useEffect(() => {
        if (fromChain.id === toChain.id) {
            const nextChain = CHAINS.find(c => c.id !== fromChain.id);
            setToChain(nextChain);
        }
    }, [fromChain]);

    // Handle wallet connection
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                const network = await provider.getNetwork();
                setAddress(accounts[0]);
                setCurrentChainId(network.chainId.toString());
                fetchBalance(accounts[0], network.chainId.toString());
            } catch (err) {
                console.error("Wallet connection failed:", err);
            }
        } else {
            alert("Please install MetaMask or OKX Wallet!");
        }
    };

    // Switch Network
    const switchNetwork = async (chain) => {
        if (!window.ethereum) return;
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chain.hexId }],
            });
            setCurrentChainId(chain.id);
            setFromChain(chain);
        } catch (err) {
            // If chain not added, add it
            if (err.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: chain.hexId,
                            chainName: chain.name,
                            nativeCurrency: { name: chain.symbol, symbol: chain.symbol, decimals: 18 },
                            rpcUrls: [chain.id === '1' ? 'https://eth.llamarpc.com' : chain.id === '56' ? 'https://binance.llamarpc.com' : chain.id === '42161' ? 'https://arb1.arbitrum.io/rpc' : 'https://mainnet.base.org'],
                            blockExplorerUrls: [chain.explorer]
                        }]
                    });
                } catch (addErr) {
                    console.error(addErr);
                }
            }
        }
    };

    // Fetch Balance
    const fetchBalance = async (userAddress, chainId) => {
        if (!window.ethereum) return;
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(NPH_CONTRACT_ADDRESS, NPH_ABI, provider);
            const rawBal = await contract.balanceOf(userAddress);
            setBalance(ethers.formatEther(rawBal));
        } catch (err) {
            console.error("Fetch balance failed:", err);
            setBalance("0.0");
        }
    };

    // Quote Cross-chain Fee
    useEffect(() => {
        if (!account || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setQuoteFee('0.0');
            return;
        }

        const getQuote = async () => {
            setQuoteLoading(true);
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(NPH_CONTRACT_ADDRESS, NPH_ABI, provider);
                
                const addressBytes32 = ethers.zeroPadValue(account, 32);
                const amountWei = ethers.parseEther(amount);
                
                // ExtraOptions empty bytes for default enforcedOptions we set in Phase 4
                const extraOptions = "0x"; 
                
                const sendParam = [
                    toChain.lzEid,
                    addressBytes32,
                    amountWei,
                    amountWei, // minAmountLD
                    extraOptions,
                    "0x", // composeMsg
                    "0x"  // oftCmd
                ];

                const quote = await contract.quoteSend(sendParam, false);
                setQuoteFee(ethers.formatEther(quote.nativeFee));
            } catch (err) {
                console.error("Quote failed:", err);
                setQuoteFee('0.005'); // Fallback default estimate
            } finally {
                setQuoteLoading(false);
            }
        };

        const timer = setTimeout(getQuote, 500);
        return () => clearTimeout(timer);
    }, [amount, toChain, account]);

    // Execute Real Bridge Transfer
    const handleBridge = async () => {
        if (!account) return connectWallet();
        if (currentChainId !== fromChain.id) return switchNetwork(fromChain);
        
        setLoading(true);
        setTxState('sending');
        setProgress(10);

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(NPH_CONTRACT_ADDRESS, NPH_ABI, signer);
            
            const addressBytes32 = ethers.zeroPadValue(account, 32);
            const amountWei = ethers.parseEther(amount);
            const extraOptions = "0x";

            const sendParam = [
                toChain.lzEid,
                addressBytes32,
                amountWei,
                amountWei,
                extraOptions,
                "0x",
                "0x"
            ];

            // Re-get fresh quote
            const quote = await contract.quoteSend(sendParam, false);
            const nativeFee = quote.nativeFee;

            // Send transaction
            const tx = await contract.send(
                sendParam,
                [nativeFee, 0],
                account,
                { value: nativeFee }
            );

            setTxHash(tx.hash);
            setTxState('in_flight');
            setProgress(40);

            // Wait for confirmation
            await tx.wait();
            setProgress(70);

            // Start LayerZero tracking animation simulation
            let curProgress = 70;
            const trackingInterval = setInterval(() => {
                curProgress += 2;
                if (curProgress >= 95) {
                    clearInterval(trackingInterval);
                    setTxState('success');
                    setProgress(100);
                    fetchBalance(account, currentChainId);
                } else {
                    setProgress(curProgress);
                }
            }, 1000);

        } catch (err) {
            console.error("Bridge failed:", err);
            setTxState('failed');
            setLoading(false);
        }
    };

    // Execute Mock Bridge Demo
    const handleMockBridge = () => {
        setAddress('0x5a657611fa0c64faCc50260130fBC52Cd6FCd16D');
        setBalance('10000.00');
        setAmount('500');
        setTxState('sending');
        setProgress(10);
        setLoading(true);

        setTimeout(() => {
            setTxState('in_flight');
            setTxHash('0x62e49c71a364fb68d90473a216447c23171804f56e40dad2f188653ddffef71cf');
            setProgress(40);

            // Simulate LayerZero cross-chain routing
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        setTxState('success');
                        setDstTxHash('0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359f65e40dad2f188653ddffef7');
                        setBalance('9500.00');
                        setLoading(false);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 1500);
        }, 2000);
    };

    return (
        <div className="relative min-h-screen text-white overflow-x-hidden font-sans">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            
            <Header />

            {/* Glowing background light */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#00ff9d] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-6 py-[100px] border-l border-r border-[#2B2B2B] min-h-screen relative z-10 flex flex-col justify-between">
                
                {/* Title */}
                <div className="text-center max-w-[600px] mx-auto mb-12">
                    <h1 className="text-[36px] font-semibold tracking-tight mb-3 uppercase font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00ff9d]">
                        {t.title}
                    </h1>
                    <p className="text-[14px] text-[rgba(255,255,255,0.4)] leading-relaxed">
                        {t.subtitle}
                    </p>
                </div>

                {/* Main Bridge Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-[1100px] mx-auto w-full">
                    
                    {/* Left: Bridge Card */}
                    <div className="lg:col-span-7 bg-[#121212] border border-[#2B2B2B] p-6 rounded-none relative shadow-2xl shadow-black">
                        
                        {/* Source Chain */}
                        <div className="mb-5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[12px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">{t.from}</span>
                                {account && (
                                    <span className="text-[12px] text-[rgba(255,255,255,0.4)]">
                                        {t.balance}: <strong className="text-white font-mono">{parseFloat(balance).toLocaleString()} NPH</strong>
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#2B2B2B] p-3">
                                <select 
                                    value={fromChain.id} 
                                    onChange={(e) => setFromChain(CHAINS.find(c => c.id === e.target.value))}
                                    className="bg-transparent border-none text-white focus:outline-none w-full font-mono text-[15px] cursor-pointer"
                                >
                                    {CHAINS.map(c => (
                                        <option key={c.id} value={c.id} className="bg-[#121212]">{c.name}</option>
                                    ))}
                                </select>
                                <img src={fromChain.icon} alt={fromChain.name} className="w-6 h-6 rounded-full bg-black p-0.5" />
                            </div>
                        </div>

                        {/* Flip Button */}
                        <div className="flex justify-center -my-2 relative z-20">
                            <button 
                                onClick={() => {
                                    const temp = fromChain;
                                    setFromChain(toChain);
                                    setToChain(temp);
                                }}
                                className="w-8 h-8 bg-[#121212] border border-[#2B2B2B] hover:border-[#00ff9d] hover:text-[#00ff9d] flex items-center justify-center transition-all duration-200 cursor-pointer"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14M5 12l7 7 7-7"/>
                                </svg>
                            </button>
                        </div>

                        {/* Destination Chain */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[12px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">{t.to}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#2B2B2B] p-3">
                                <select 
                                    value={toChain.id} 
                                    onChange={(e) => setToChain(CHAINS.find(c => c.id === e.target.value))}
                                    className="bg-transparent border-none text-white focus:outline-none w-full font-mono text-[15px] cursor-pointer"
                                >
                                    {CHAINS.filter(c => c.id !== fromChain.id).map(c => (
                                        <option key={c.id} value={c.id} className="bg-[#121212]">{c.name}</option>
                                    ))}
                                </select>
                                <img src={toChain.icon} alt={toChain.name} className="w-6 h-6 rounded-full bg-black p-0.5" />
                            </div>
                        </div>

                        {/* Amount Input */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[12px] text-[rgba(255,255,255,0.4)] uppercase tracking-wider">{t.amount}</span>
                            </div>
                            <div className="flex items-center bg-[#1A1A1A] border border-[#2B2B2B] p-3">
                                <input 
                                    type="number" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.0"
                                    className="bg-transparent border-none text-white focus:outline-none w-full font-mono text-[18px]"
                                />
                                <button 
                                    onClick={() => setAmount(balance)}
                                    className="text-[11px] border border-[#2B2B2B] px-2 py-1 hover:border-[#00ff9d] hover:text-[#00ff9d] transition-all duration-200 font-mono ml-2 cursor-pointer"
                                >
                                    {t.max}
                                </button>
                            </div>
                        </div>

                        {/* Gas Fee Quote */}
                        {parseFloat(amount) > 0 && (
                            <div className="mb-6 bg-[#1A1A1A] border border-[#2B2B2B] p-4 font-mono text-[13px] flex justify-between items-center">
                                <span className="text-[rgba(255,255,255,0.4)]">{t.quote}</span>
                                {quoteLoading ? (
                                    <span className="text-[#00ff9d] animate-pulse">Estimating...</span>
                                ) : (
                                    <span className="text-white font-semibold">{parseFloat(quoteFee).toFixed(5)} {fromChain.symbol}</span>
                                )}
                            </div>
                        )}

                        {/* Main Action Button */}
                        {!account ? (
                            <button 
                                onClick={connectWallet}
                                className="w-full bg-white text-black py-3 text-[14px] font-mono uppercase tracking-wider hover:bg-[#00ff9d] transition-all duration-300 cursor-pointer"
                            >
                                {t.connect}
                            </button>
                        ) : currentChainId !== fromChain.id ? (
                            <button 
                                onClick={() => switchNetwork(fromChain)}
                                className="w-full bg-[#ff3b30] text-white py-3 text-[14px] font-mono uppercase tracking-wider hover:bg-red-600 transition-all duration-300 cursor-pointer"
                            >
                                {t.switchNetwork} {fromChain.name}
                            </button>
                        ) : parseFloat(amount) > parseFloat(balance) ? (
                            <button 
                                disabled
                                className="w-full bg-[#2B2B2B] text-[rgba(255,255,255,0.3)] py-3 text-[14px] font-mono uppercase tracking-wider cursor-not-allowed"
                            >
                                {t.insufficient}
                            </button>
                        ) : (
                            <button 
                                onClick={handleBridge}
                                disabled={loading || !amount || parseFloat(amount) <= 0}
                                className={`w-full py-3 text-[14px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${loading ? 'bg-[#2B2B2B] text-gray-500' : 'bg-[#00ff9d] text-black hover:shadow-[0_0_15px_rgba(0,255,157,0.5)]'}`}
                            >
                                {loading ? t.loading : t.bridgeBtn}
                            </button>
                        )}

                        {/* Mock Mode Button */}
                        <div className="mt-4 border-t border-[#2B2B2B] pt-4">
                            <button 
                                onClick={handleMockBridge}
                                className="w-full border border-dashed border-[#00ff9d]/30 text-[#00ff9d] py-2 text-[12px] font-mono hover:bg-[#00ff9d]/5 transition-all duration-300 cursor-pointer"
                            >
                                ⚡ {t.mockBtn}
                            </button>
                        </div>

                    </div>

                    {/* Right: Real-time Tx Tracker */}
                    <div className="lg:col-span-5 bg-[#121212] border border-[#2B2B2B] p-6 rounded-none min-h-[420px] flex flex-col justify-between shadow-2xl">
                        <div>
                            <h3 className="text-[14px] font-mono uppercase tracking-wider border-b border-[#2B2B2B] pb-3 mb-6 text-[#00ff9d]">
                                // Cross-Chain Status
                            </h3>

                            {txState === 'idle' ? (
                                <div className="text-center py-12">
                                    <div className="w-12 h-12 border border-dashed border-[#2B2B2B] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                                            <path d="M12 6v6l4 2"/>
                                        </svg>
                                    </div>
                                    <p className="text-[13px] text-[rgba(255,255,255,0.3)]">Awaiting transaction initiation...</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    
                                    {/* Step 1 */}
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-mono ${progress >= 40 ? 'border-[#00ff9d] bg-[#00ff9d] text-black' : 'border-[#2B2B2B] bg-[#121212]'}`}>
                                                {progress >= 40 ? '✓' : '1'}
                                            </div>
                                            <div className={`w-0.5 h-10 border-l border-dashed ${progress >= 70 ? 'border-[#00ff9d]' : 'border-[#2B2B2B]'}`} />
                                        </div>
                                        <div>
                                            <h4 className={`text-[13px] font-mono ${progress >= 40 ? 'text-white' : 'text-[rgba(255,255,255,0.4)]'}`}>{t.step1}</h4>
                                            {txHash && (
                                                <a 
                                                    href={`${fromChain.explorer}/tx/${txHash}`} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="text-[11px] text-[#00ff9d] hover:underline font-mono mt-1 block truncate max-w-[200px]"
                                                >
                                                    Tx: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-mono ${progress >= 100 ? 'border-[#00ff9d] bg-[#00ff9d] text-black' : progress >= 40 ? 'border-[#00ff9d] text-[#00ff9d] animate-pulse' : 'border-[#2B2B2B]'}`}>
                                                {progress >= 100 ? '✓' : '2'}
                                            </div>
                                            <div className="w-0.5 h-10 border-l border-dashed border-[#2B2B2B]" />
                                        </div>
                                        <div>
                                            <h4 className={`text-[13px] font-mono ${progress >= 40 ? 'text-white' : 'text-[rgba(255,255,255,0.4)]'}`}>{t.step2}</h4>
                                            {txState === 'in_flight' && (
                                                <div className="w-[150px] bg-[#1A1A1A] h-1.5 mt-2 rounded-full overflow-hidden">
                                                    <div className="bg-[#00ff9d] h-full animate-pulse" style={{ width: `${progress}%` }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full border border-[#2B2B2B] flex items-center justify-center text-[11px] font-mono bg-[#121212]">
                                            {progress >= 100 ? <span className="text-[#00ff9d]">✓</span> : '3'}
                                        </div>
                                        <div>
                                            <h4 className={`text-[13px] font-mono ${progress >= 100 ? 'text-[#00ff9d]' : 'text-[rgba(255,255,255,0.4)]'}`}>{t.step3}</h4>
                                            {dstTxHash && (
                                                <a 
                                                    href={`${toChain.explorer}/tx/${dstTxHash}`} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="text-[11px] text-[#00ff9d] hover:underline font-mono mt-1 block truncate max-w-[200px]"
                                                >
                                                    Tx: {dstTxHash.slice(0, 10)}...{dstTxHash.slice(-8)}
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>

                        {/* LayerZero Scan Link */}
                        {txHash && (
                            <div className="border-t border-[#2B2B2B] pt-4 mt-6">
                                <a 
                                    href={`https://layerzeroscan.com/tx/${txHash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between text-[12px] text-[#00ff9d] hover:underline font-mono"
                                >
                                    <span>{t.viewLz}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>

                </div>

                {/* Info Footer */}
                <div className="mt-12 text-center text-[11px] text-[rgba(255,255,255,0.3)] font-mono">
                    BNHP Contract: <span className="text-white select-all">{NPH_CONTRACT_ADDRESS}</span>
                </div>

            </div>

            <Footer />
        </div>
    );
}
