'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

export default function Mod4() {
    return (
        <>
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base min-h-[900px] text-white border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none relative overflow-hidden max-qw:min-h-[700px]">
                    <Pagination className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none' page='04' title='THE BNHP SOLUTIONS' />
                    <div className='w-full h-full flex items-center justify-center py-20 px-10 max-qw:py-10 max-qw:px-5'>
                        <div className='max-w-[1000px] w-full'>
                            <div className='text-[rgba(255,255,255,0.40)] text-[18px] leading-[30px] max-qw:text-[14px] max-qw:leading-[24px] spanWhite'>
                                <p className='mb-8 text-[rgba(255,255,255,0.6)]'>
                                    Addressing the aforementioned pain points, BNHP promotes user asset sovereignty and, through its five major navigation sections, achieves a seamless integration of <em>Web2 experience</em> with <em>Web3's sovereign core</em>.
                                </p>

                                <div className='overflow-x-auto mb-8'>
                                    <table className='w-full border-collapse border border-[#2B2B2B]'>
                                        <thead>
                                            <tr className='bg-[rgba(255,255,255,0.05)]'>
                                                <th className='border border-[#2B2B2B] p-4 text-left text-white'>Dimensional Solution</th>
                                                <th className='border border-[#2B2B2B] p-4 text-left text-white'>Minimalism and Empowerment</th>
                                                <th className='border border-[#2B2B2B] p-4 text-left text-white'>Safety, efficiency, and professionalism</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='border border-[#2B2B2B] p-4 text-white'>Account System</td>
                                                <td className='border border-[#2B2B2B] p-4'>Social login: No mnemonic phrase required, log in via account and password/Google/Apple.</td>
                                                <td className='border border-[#2B2B2B] p-4'>Self-custody + MPC (multi-party computation) technology: along with distributed key management, completely eliminate single point failure.</td>
                                            </tr>
                                            <tr>
                                                <td className='border border-[#2B2B2B] p-4 text-white'>Interaction Logic</td>
                                                <td className='border border-[#2B2B2B] p-4'>Social transfer: Transfer money through your contact list, just like sending messages.</td>
                                                <td className='border border-[#2B2B2B] p-4'>Smart account: Supports Gas fee payment on behalf, with pre-deposited platform tokens/stable coins used to pay the fee.</td>
                                            </tr>
                                            <tr>
                                                <td className='border border-[#2B2B2B] p-4 text-white'>Safety Protection</td>
                                                <td className='border border-[#2B2B2B] p-4'>Built-in browser: Strictly select mainstream Dapps and automatically block malicious DApps.</td>
                                                <td className='border border-[#2B2B2B] p-4'>AI scanning engine: AI-powered automatic narration, real-time detection of contract risks, transaction taxes, and whale dynamics.</td>
                                            </tr>
                                            <tr>
                                                <td className='border border-[#2B2B2B] p-4 text-white'>Social Value</td>
                                                <td className='border border-[#2B2B2B] p-4'>Square: Data recommendation algorithm, breaking social isolation, connecting with global users.</td>
                                                <td className='border border-[#2B2B2B] p-4'>Financial social exchange: The posts on the square contain the corresponding Token directly linked by CA, which can be viewed with one click.</td>
                                            </tr>
                                            <tr>
                                                <td className='border border-[#2B2B2B] p-4 text-white'>Trading Depth</td>
                                                <td className='border border-[#2B2B2B] p-4'>Minimalist Exchange: Hide complex parameters and complete asset swaps with one click.</td>
                                                <td className='border border-[#2B2B2B] p-4'>Professional DEX aggregator: Optimal routing across the entire network, professional K-line and full-chain tracking.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
