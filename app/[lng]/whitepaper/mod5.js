'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

export default function Mod5() {
    return (
        <>
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base min-h-[1000px] text-white border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none relative overflow-hidden max-qw:min-h-[800px]">
                    <Pagination className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none' page='05' title='CORE FEATURES' />
                    <div className='w-full h-full flex items-center justify-center py-20 px-10 max-qw:py-10 max-qw:px-5'>
                        <div className='max-w-[900px] w-full'>
                            <div className='text-[rgba(255,255,255,0.40)] text-[18px] leading-[30px] max-qw:text-[14px] max-qw:leading-[24px] spanWhite'>
                                <p className='mb-8 text-[rgba(255,255,255,0.6)]'>
                                    BNHP has constructed a complete <em>decentralized social and trading ecosystem</em> through five core navigation modules.
                                </p>

                                <div className='mb-8'>
                                    <h3 className='text-[24px] text-white mb-4 max-qw:text-[18px]'>Home - Social Square</h3>
                                    <p className='mb-4'>The Social Square serves as the traffic engine for BNHP, breaking the closed nature of Web2 social networking and enabling the free flow of information and value.</p>
                                    <ul className='ml-6 space-y-2 list-disc'>
                                        <li><em>Recommended:</em> Based on personalized big data and AI recommendation algorithms, it pushes preferred tweets, popular tweets, and potentially high-quality projects.</li>
                                        <li><em>Following:</em> Synchronize the latest updates of the followed content in real-time, ensuring users do not miss any valuable information.</li>
                                        <li><em>All:</em> An open global information flow where users can observe ongoing discussions across the entire network in real time.</li>
                                        <li><em>Search:</em> Powerful comprehensive search function, supporting quick location of tweets, users, or trending topics.</li>
                                    </ul>
                                </div>

                                <div className='mb-8'>
                                    <h3 className='text-[24px] text-white mb-4 max-qw:text-[18px]'>Web3 - Exploration/Discover</h3>
                                    <ul className='ml-6 space-y-2 list-disc'>
                                        <li><em>Comprehensive Search:</em> Supports one-click retrieval of Token contracts, wallet addresses, and DApp protocols.</li>
                                        <li><em>Signals:</em> By monitoring smart money, liquidity changes, KOL buzz, and whale movements, provides real-time updates on popular trading trends.</li>
                                        <li><em>Address tracking:</em> Monitor on-chain addresses with second-level push notifications.</li>
                                        <li><em>Scanning:</em> Automated contract auditing tool with real-time detection and analysis of token swaps, transaction taxes, pool lock-up status, and contract analysis.</li>
                                        <li><em>DApp selection and browser:</em> Select mainstream DeFi/Dapps rigorously with automatic malicious DApp blocking.</li>
                                    </ul>
                                </div>

                                <div className='mb-8'>
                                    <h3 className='text-[24px] text-white mb-4 max-qw:text-[18px]'>DEX (Exchange) - Full-scenario On-chain Financial Engine</h3>
                                    <p className='mb-4'>The DEX platform integrates liquidity from across the entire network, meeting all trading needs from beginners to professional traders.</p>
                                    <ul className='ml-6 space-y-2 list-disc'>
                                        <li><em>Meme mode:</em> Designed specifically for Meme Coin players with minimalist interface, extremely high refresh rate, and automatic anti-MEV protection.</li>
                                        <li><em>Minimalist Mode (Swap):</em> Targeted at Web2 migration users, hides complex parameters and automatically matches optimal routing.</li>
                                        <li><em>Professional trading mode:</em> Provides complete real-time candlestick charts, depth charts, limit orders, and order book functions.</li>
                                        <li><em>Cross-chain Bridge:</em> Integrates with mainstream cross-chain paths natively, enabling seamless cross-chain transfers.</li>
                                    </ul>
                                </div>

                                <div className='mb-8'>
                                    <h3 className='text-[24px] text-white mb-4 max-qw:text-[18px]'>Message</h3>
                                    <ul className='ml-6 space-y-2 list-disc'>
                                        <li><em>Standard instant messaging:</em> Supports text, images, voice, and emojis with end-to-end encrypted communication.</li>
                                        <li><em>Address Book:</em> Dual-track system - users can directly click on the list to view profiles and initiate chats or transfers.</li>
                                        <li><em>Notice:</em> All social notifications allow users to keep track of their personal social account activity in real time.</li>
                                    </ul>
                                </div>

                                <div className='mb-8'>
                                    <h3 className='text-[24px] text-white mb-4 max-qw:text-[18px]'>Assets - MPC Keyless Wallet</h3>
                                    <p className='mb-4'>The wallet serves as the fundamental cornerstone for all functionalities, thoroughly addressing the challenges of private key management.</p>
                                    <ul className='ml-6 space-y-2 list-disc'>
                                        <li><em>MPC Technology:</em> Multi-Party Computation eliminates single point of failure in private key management.</li>
                                        <li><em>Social Recovery:</em> Users can recover their wallet through trusted contacts without mnemonic phrases.</li>
                                        <li><em>Asset Warning:</em> Real-time monitoring of overall asset distribution assists users in timing sales to maximize returns.</li>
                                        <li><em>Multi-chain Support:</em> Seamlessly manage assets across multiple blockchain networks.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
