'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

export default function Mod6() {
    return (
        <>
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base min-h-[800px] text-white border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none relative overflow-hidden max-qw:min-h-[600px]">
                    <Pagination className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none' page='06' title='TOKEN ECONOMICS & TEAM' />
                    <div className='w-full h-full flex items-center justify-center py-20 px-10 max-qw:py-10 max-qw:px-5'>
                        <div className='max-w-[900px] w-full'>
                            <div className='text-[rgba(255,255,255,0.40)] text-[18px] leading-[30px] max-qw:text-[14px] max-qw:leading-[24px] spanWhite'>
                                <div className='mb-12'>
                                    <h3 className='text-[28px] text-white mb-6 max-qw:text-[20px]'>Token Economics</h3>
                                    
                                    <div className='mb-6'>
                                        <h4 className='text-[20px] text-white mb-3 max-qw:text-[16px]'>Core Utility of Token</h4>
                                        <ul className='ml-6 space-y-2 list-disc'>
                                            <li><em>Governance Rights:</em> Token holders can participate in platform governance decisions.</li>
                                            <li><em>Transaction Fee Discounts:</em> Using NPH tokens for transaction fees provides discounts.</li>
                                            <li><em>Staking Rewards:</em> Users can stake tokens to earn rewards and platform revenue share.</li>
                                            <li><em>Premium Features:</em> Access to advanced trading tools and AI-powered analytics.</li>
                                            <li><em>Social Authentication:</em> Holding tokens enables posting to the "All" channel, ensuring content quality.</li>
                                        </ul>
                                    </div>

                                    <div className='mb-6'>
                                        <h4 className='text-[20px] text-white mb-3 max-qw:text-[16px]'>Deflation Model</h4>
                                        <p className='mb-3'>BNHP implements a sustainable deflation mechanism:</p>
                                        <ul className='ml-6 space-y-2 list-disc'>
                                            <li><em>Transaction Fee Burn:</em> A portion of all transaction fees is permanently burned.</li>
                                            <li><em>Buyback and Burn:</em> Platform revenue is used for periodic token buybacks and burns.</li>
                                            <li><em>Activity Rewards:</em> Tokens distributed as rewards come from a capped supply pool.</li>
                                        </ul>
                                    </div>

                                    <div className='mb-6'>
                                        <h4 className='text-[20px] text-white mb-3 max-qw:text-[16px]'>$NPH Token — Contract Address</h4>
                                        <p className='mb-3'>$NPH is deployed as an OFT (Omnichain Fungible Token) via LayerZero V2, enabling native cross-chain transfers across four networks:</p>
                                        <ul className='ml-6 space-y-2 list-disc'>
                                            <li><em>Ethereum (ETH):</em> <code className='text-[#C6AC6F] text-[12px]'>0xb000f8da0ed095554ac1e27d8e3ff9cecc1d0000</code></li>
                                            <li><em>BNB Chain:</em> OFT peer deployed via LayerZero V2 (EID 30102)</li>
                                            <li><em>Arbitrum:</em> OFT peer deployed via LayerZero V2 (EID 30110)</li>
                                            <li><em>Base:</em> OFT peer deployed via LayerZero V2 (EID 30184)</li>
                                        </ul>
                                    </div>

                                    <div className='mb-6'>
                                        <h4 className='text-[20px] text-white mb-3 max-qw:text-[16px]'>Public Sale</h4>
                                        <p className='mb-3'>$NPH Public Sale is now live. Two rounds are open to the public:</p>
                                        <ul className='ml-6 space-y-2 list-disc'>
                                            <li><em>Round 1:</em> $0.15 per NPH — 20,000,000 tokens (10% of supply). Target raise: $3,000,000.</li>
                                            <li><em>Round 2:</em> $0.35 per NPH — 20,000,000 tokens (10% of supply). Target raise: $7,000,000.</li>
                                            <li><em>Supported Assets:</em> USDT, USDC (ERC-20) on Ethereum Mainnet.</li>
                                            <li><em>Vesting:</em> 20% unlocked at TGE, remaining 80% released linearly over 6 months.</li>
                                            <li><em>Sale Period:</em> June 10, 2026 — December 31, 2026.</li>
                                            <li><em>Sale Contract (ETH):</em> <code className='text-[#C6AC6F] text-[12px]'>0xe704d6ed1a159e20afcc17421257818206413633</code></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='mb-12'>
                                    <h3 className='text-[28px] text-white mb-6 max-qw:text-[20px]'>Team</h3>
                                    
                                    <div className='mb-6'>
                                        <h4 className='text-[20px] text-white mb-3 max-qw:text-[16px]'>Founder: Niel</h4>
                                        <p className='mb-3'>
                                            Niel brings extensive experience in blockchain technology and Web3 innovation. With a vision to bridge Web2 and Web3, Niel leads the BNHP team in creating a revolutionary social-financial platform.
                                        </p>
                                    </div>

                                    <div className='mb-6'>
                                        <h4 className='text-[20px] text-white mb-3 max-qw:text-[16px]'>"BNHP 15" Team Plan</h4>
                                        <p className='mb-3'>
                                            The BNHP core team consists of 15 dedicated professionals spanning blockchain development, AI engineering, product design, and community management. Our team is committed to delivering a world-class Web3 application.
                                        </p>
                                    </div>
                                </div>

                                <div className='mb-8'>
                                    <h3 className='text-[28px] text-white mb-6 max-qw:text-[20px]'>Conclusion</h3>
                                    <p className='mb-4'>
                                        BNHP represents the future of <em>decentralized social finance</em>. By seamlessly integrating <em>Web2 user experience</em> with <em>Web3 asset sovereignty</em>, we are building a platform that empowers users to truly own their digital identity and assets.
                                    </p>
                                    <p className='mb-4'>
                                        Through innovative features like <em>MPC keyless wallets</em>, <em>AI-driven discovery</em>, and <em>integrated DEX trading</em>, BNHP eliminates the barriers that have prevented mainstream adoption of Web3 technologies.
                                    </p>
                                    <p>
                                        Join us in building the future of <em>decentralized social finance</em>. Together, we will create a world where users have true control over their digital lives.
                                    </p>
                                </div>

                                <div className='text-center mt-12'>
                                    <a 
                                        href="/BNHP-APP-Whitepaper-V1.0.pdf" 
                                        download
                                        className='inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-white'
                                    >
                                        Download Full White Paper (PDF)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
