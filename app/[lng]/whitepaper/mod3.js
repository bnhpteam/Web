'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

export default function Mod3() {
    return (
        <>
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base min-h-[800px] text-white border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none relative overflow-hidden max-qw:min-h-[600px]">
                    <Pagination className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none' page='03 / 06' title='PROBLEMS & SOLUTIONS' />
                    <div className='w-full h-full flex items-center justify-center py-20 px-10 max-qw:py-10 max-qw:px-5'>
                        <div className='max-w-[900px] w-full'>
                            <div className='text-[rgba(255,255,255,0.40)] text-[18px] leading-[30px] max-qw:text-[14px] max-qw:leading-[24px] spanWhite'>
                                <p className='mb-8 text-[rgba(255,255,255,0.6)]'>
                                    BNHP believes that there is a massive "gap" between current internet social platforms and blockchain finance. To advance user asset sovereignty, we categorize these challenges into two dimensions: <em>Web2 onboarding pain points</em> for the masses, and <em>Web3 experience pain points</em> for advanced users.
                                </p>

                                <div className='mb-8'>
                                    <h3 className='text-[24px] text-white mb-4 max-qw:text-[18px]'>Mass Adoption: Web2 Users - Cognition</h3>
                                    <p className='mb-4'>For the vast majority of users who have not yet been exposed to blockchain, Web3 is like a wilderness filled with technical jargon, with the following core pain points:</p>
                                    
                                    <div className='ml-4 space-y-4'>
                                        <div>
                                            <p className='text-white mb-2'><em>Ownership Illusion:</em></p>
                                            <p>Users are accustomed to the balances in "centralized institutional platforms". Users lack true "sovereignty", and their assets are constantly threatened with being frozen, capped, or reset to zero due to platform risks.</p>
                                        </div>
                                        
                                        <div>
                                            <p className='text-white mb-2'><em>Social Stagnation:</em></p>
                                            <p>Traditional communication software operates within a closed and saturated market. Social data is monopolized by platforms, and users face risks of being monitored, having no privacy, being censored, and having their accounts suspended.</p>
                                        </div>
                                        
                                        <div>
                                            <p className='text-white mb-2'><em>The Onboarding Barrier:</em></p>
                                            <p>"Not your key, not your coins". Traditional wallets require users to back up 12/24 illogical words, and once lost, copied incorrectly, or leaked, the assets are permanently lost.</p>
                                        </div>
                                        
                                        <div>
                                            <p className='text-white mb-2'><em>The Gas Fee Wall:</em></p>
                                            <p>The logic of "transferring requires purchasing gas first" in blockchain is extremely counterintuitive. Users often find themselves unable to perform any operations due to the absence of gas fee.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-8'>
                                    <h3 className='text-[24px] text-white mb-4 max-qw:text-[18px]'>Pro-Level: Efficiency and Security</h3>
                                    <p className='mb-4'>For users who are already involved, although they possess asset sovereignty, the interaction experience is complex and fragmented:</p>
                                    
                                    <div className='ml-4 space-y-4'>
                                        <div>
                                            <p className='text-white mb-2'><em>Switching between socializing and trading:</em></p>
                                            <p>Discovering signals on X/Twitter → discussing on Telegram → checking market conditions → switching to wallet for trading. Frequent app switching is inefficient.</p>
                                        </div>
                                        
                                        <div>
                                            <p className='text-white mb-2'><em>Information Overload:</em></p>
                                            <p>Users need to manually detect contract vulnerabilities, track whale movements, and analyze token transaction taxes. There is a lack of an integrated, AI-driven real-time analysis engine.</p>
                                        </div>
                                        
                                        <div>
                                            <p className='text-white mb-2'><em>Security Vulnerability:</em></p>
                                            <p>Even experienced users face the risk of having their mnemonic phrase stolen or their assets instantly reduced to zero due to clicking on malicious approval prompts.</p>
                                        </div>
                                        
                                        <div>
                                            <p className='text-white mb-2'><em>Liquidity Fragmentation:</em></p>
                                            <p>There are significant price differences between different protocols. Users need to manually compare which DEX offers the best price.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
