'use client';
import { useState, useEffect } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

const CLAIM_STEPS = [
    { step: '01', label: 'Connect Wallet' },
    { step: '02', label: 'Verify Eligibility' },
    { step: '03', label: 'Claim $NPH' },
];

const ELIGIBLE_EVENTS = [
    { label: 'Seed Round Participant', desc: 'SAFT agreement holders receive NPH after App launch.' },
    { label: 'Early Community Member', desc: 'Whitelist participants from official campaigns.' },
    { label: 'Airdrop Recipient', desc: 'Qualified users from social tasks & testnet activities.' },
];

export default function ClaimMod1() {
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [eligibilityStatus, setEligibilityStatus] = useState(null); // null | 'eligible' | 'not_eligible'
    const [claimAmount, setClaimAmount] = useState(0);
    const [claimed, setClaimed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(0); // 0: connect, 1: verify, 2: claim
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate particle positions only on client side to avoid hydration mismatch
        const generated = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            delay: `${(i * 0.3) % 3}s`,
            duration: `${3 + (i % 4)}s`,
        }));
        setParticles(generated);
    }, []);

    const handleConnectWallet = async () => {
        setIsLoading(true);
        // Simulate wallet connection (MetaMask / WalletConnect)
        await new Promise(r => setTimeout(r, 1200));
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setWalletConnected(true);
                setStep(1);
            } catch (e) {
                // User rejected
            }
        } else {
            // Demo mode: simulate connection
            const demoAddr = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
            setWalletAddress(demoAddr);
            setWalletConnected(true);
            setStep(1);
        }
        setIsLoading(false);
    };

    const handleVerify = async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        // Demo: randomly assign eligibility for demonstration
        const isEligible = Math.random() > 0.3;
        if (isEligible) {
            setEligibilityStatus('eligible');
            setClaimAmount(Math.floor(Math.random() * 5000) + 500);
            setStep(2);
        } else {
            setEligibilityStatus('not_eligible');
        }
        setIsLoading(false);
    };

    const handleClaim = async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 2000));
        setClaimed(true);
        setIsLoading(false);
    };

    const formatAddress = (addr) => {
        if (!addr) return '';
        return addr.slice(0, 6) + '...' + addr.slice(-4);
    };

    return (
        <>
            {/* Hero Section */}
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-[46px] left-0 -z-1 border-[#2B2B2B] cut-border max-qw:hidden' />
                <div className="w-base min-h-[780px] text-white border border-b-0 border-t-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none relative overflow-hidden max-qw:min-h-[560px]">
                    <Pagination className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none' page='01' title='CLAIM' desc='$NPH' />

                    {/* Animated background particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {particles.map((p) => (
                            <div
                                key={p.id}
                                className="absolute w-1 h-1 bg-[#C6AC6F] opacity-20 rounded-full animate-pulse"
                                style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }}
                            />
                        ))}
                    </div>

                    <div className='w-full h-full flex flex-col items-center justify-center py-20 px-6 max-qw:py-12'>
                        {/* Title */}
                        <div className='text-center mb-12'>
                            <div className='text-[12px] text-[#C6AC6F] tracking-[4px] mb-4 uppercase'>Token Generation Event</div>
                            <h1 className='text-[56px] font-bold leading-tight max-qw:text-[32px]'>
                                <span className='text-[#C6AC6F]'>$NPH</span> CLAIM
                            </h1>
                            <div className='text-[18px] text-[rgba(255,255,255,0.5)] mt-4 max-qw:text-[14px]'>
                                Claim your NPH tokens. Connect your designated wallet to begin.
                            </div>
                        </div>

                        {/* Step Indicator */}
                        <div className='flex items-center gap-0 mb-12 max-qw:gap-0'>
                            {CLAIM_STEPS.map((s, idx) => (
                                <div key={idx} className='flex items-center'>
                                    <div className={`flex items-center gap-2 px-4 py-2 border transition-all duration-300 max-qw:px-2 max-qw:py-1 ${step >= idx ? 'border-[#C6AC6F] text-[#C6AC6F]' : 'border-[#2B2B2B] text-[rgba(255,255,255,0.3)]'}`}>
                                        <span className='text-[11px] font-mono'>{s.step}</span>
                                        <span className='text-[12px] max-qw:hidden'>{s.label}</span>
                                    </div>
                                    {idx < CLAIM_STEPS.length - 1 && (
                                        <div className={`w-8 h-[1px] max-qw:w-3 ${step > idx ? 'bg-[#C6AC6F]' : 'bg-[#2B2B2B]'}`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Main Claim Card */}
                        <div className='w-full max-w-[560px] border border-[#2B2B2B] bg-[#111111] relative'>
                            {/* Card top accent */}
                            <div className='w-full h-[2px] bg-gradient-to-r from-transparent via-[#C6AC6F] to-transparent' />

                            <div className='p-8 max-qw:p-5'>
                                {/* Step 0: Connect Wallet */}
                                {step === 0 && (
                                    <div className='text-center'>
                                        <div className='w-16 h-16 border border-[#C6AC6F] flex items-center justify-center mx-auto mb-6'>
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21Z" stroke="#C6AC6F" strokeWidth="1.5" />
                                                <path d="M21 8H12C11.45 8 11 8.45 11 9V15C11 15.55 11.45 16 12 16H21V8Z" stroke="#C6AC6F" strokeWidth="1.5" />
                                                <circle cx="16" cy="12" r="1.5" fill="#C6AC6F" />
                                            </svg>
                                        </div>
                                        <h3 className='text-[20px] text-white mb-2'>Connect Your Wallet</h3>
                                        <p className='text-[14px] text-[rgba(255,255,255,0.4)] mb-8 leading-relaxed'>
                                            Connect the wallet address you used during the seed round or whitelist campaign. Supports MetaMask, WalletConnect, and other EVM-compatible wallets.
                                        </p>
                                        <button
                                            onClick={handleConnectWallet}
                                            disabled={isLoading}
                                            className='w-full h-[48px] bg-[#C6AC6F] text-black font-semibold text-[14px] hover:bg-[#F6EFC5] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin' />
                                                    Connecting...
                                                </>
                                            ) : (
                                                <>
                                                    Connect Wallet
                                                    <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                        <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                        <p className='text-[11px] text-[rgba(255,255,255,0.25)] mt-4'>
                                            Supported: MetaMask · WalletConnect · Coinbase Wallet
                                        </p>
                                    </div>
                                )}

                                {/* Step 1: Verify Eligibility */}
                                {step === 1 && (
                                    <div className='text-center'>
                                        <div className='flex items-center justify-center gap-2 mb-6'>
                                            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
                                            <span className='text-[12px] text-green-400 font-mono'>{formatAddress(walletAddress)}</span>
                                        </div>
                                        <div className='w-16 h-16 border border-[#C6AC6F] flex items-center justify-center mx-auto mb-6'>
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#C6AC6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <h3 className='text-[20px] text-white mb-2'>Verify Eligibility</h3>
                                        <p className='text-[14px] text-[rgba(255,255,255,0.4)] mb-8 leading-relaxed'>
                                            We will check if your wallet address is on the NPH claim whitelist based on your participation in the seed round or community campaigns.
                                        </p>
                                        {eligibilityStatus === 'not_eligible' && (
                                            <div className='mb-6 p-4 border border-red-800 bg-red-900/20 text-red-400 text-[13px]'>
                                                This wallet address is not eligible for the current claim round. Please ensure you are using the correct wallet.
                                            </div>
                                        )}
                                        <button
                                            onClick={handleVerify}
                                            disabled={isLoading}
                                            className='w-full h-[48px] bg-[#C6AC6F] text-black font-semibold text-[14px] hover:bg-[#F6EFC5] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin' />
                                                    Checking...
                                                </>
                                            ) : (
                                                'Check Eligibility'
                                            )}
                                        </button>
                                    </div>
                                )}

                                {/* Step 2: Claim */}
                                {step === 2 && !claimed && (
                                    <div className='text-center'>
                                        <div className='flex items-center justify-center gap-2 mb-6'>
                                            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
                                            <span className='text-[12px] text-green-400 font-mono'>{formatAddress(walletAddress)}</span>
                                        </div>
                                        <div className='border border-[#C6AC6F]/30 bg-[#C6AC6F]/5 p-6 mb-6'>
                                            <div className='text-[12px] text-[rgba(255,255,255,0.4)] mb-2 uppercase tracking-widest'>Your Claimable Amount</div>
                                            <div className='text-[48px] font-bold text-[#C6AC6F] leading-none'>{claimAmount.toLocaleString()}</div>
                                            <div className='text-[16px] text-[rgba(255,255,255,0.6)] mt-2'>$NPH</div>
                                        </div>
                                        <div className='text-[12px] text-[rgba(255,255,255,0.3)] mb-6 leading-relaxed'>
                                            Tokens will be distributed to your connected wallet on BNB Chain after the TGE. Ensure your wallet supports BEP-20 tokens.
                                        </div>
                                        <button
                                            onClick={handleClaim}
                                            disabled={isLoading}
                                            className='w-full h-[48px] bg-[#C6AC6F] text-black font-semibold text-[14px] hover:bg-[#F6EFC5] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin' />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Claim $NPH
                                                    <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                                                        <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}

                                {/* Claimed Success */}
                                {claimed && (
                                    <div className='text-center py-4'>
                                        <div className='w-16 h-16 border border-green-400 flex items-center justify-center mx-auto mb-6'>
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 13L9 17L19 7" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <h3 className='text-[24px] text-white mb-2'>Claim Submitted!</h3>
                                        <p className='text-[14px] text-[rgba(255,255,255,0.4)] mb-4 leading-relaxed'>
                                            Your claim for <span className='text-[#C6AC6F] font-semibold'>{claimAmount.toLocaleString()} $NPH</span> has been submitted successfully. Tokens will be distributed after the TGE event on BNB Chain.
                                        </p>
                                        <div className='text-[11px] text-[rgba(255,255,255,0.25)] font-mono mt-4'>
                                            Wallet: {formatAddress(walletAddress)}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Card bottom accent */}
                            <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-[#2B2B2B] to-transparent' />
                        </div>

                        {/* Note */}
                        <div className='mt-6 text-[12px] text-[rgba(255,255,255,0.25)] text-center max-w-[480px]'>
                            $NPH claim is currently in pre-registration phase. Actual token distribution will occur after the TGE event. Contract: BNB Chain (BEP-20).
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
                                    <div className='absolute top-4 right-4 text-[11px] text-[rgba(255,255,255,0.2)] font-mono'>/ 0{idx + 1}</div>
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
                                    <div className='text-[20px] text-white font-semibold'>BNB Chain</div>
                                </div>
                                <div>
                                    <div className='text-[11px] text-[rgba(255,255,255,0.3)] uppercase tracking-widest mb-2'>TGE</div>
                                    <div className='text-[20px] text-white font-semibold'>2026 Q4</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
