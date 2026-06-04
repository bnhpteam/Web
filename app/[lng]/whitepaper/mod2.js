'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

export default function Mod2() {
    return (
        <>
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base min-h-[600px] text-white border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none relative overflow-hidden max-qw:min-h-[400px]">
                    <Pagination className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none' page='02' title='INTRO' />
                    <div className='w-full h-full flex items-center justify-center py-20 px-10 max-qw:py-10 max-qw:px-5'>
                        <div className='max-w-[900px] w-full'>
                            <div className='text-[rgba(255,255,255,0.40)] text-[20px] leading-[32px] max-qw:text-[14px] max-qw:leading-[24px] spanWhite'>
                                <p className='mb-6'>
                                    <em>BNHP</em> as a <em>Web3 startup</em> team, is committed to driving the <em>next generation Web3 industry</em> through <em>innovation</em>.
                                </p>
                                <p className='mb-6'>
                                    BNHP is building a APP with <em>social media</em> and <em>self-custody wallet</em>. It breaks the barrier between Web2 social platforms and Web3 financial tools. Through five navigation architectures: <em>Social Square + Web3 Exploration + DEX (Decentralized Transactions) + Communication + Assets (self-custody wallet)</em>, we provide a <em>super application</em> for global users.
                                </p>
                                <p className='mb-6'>
                                    In the application, users can not only share anything like on their Moments/Weibo/Twitter, but also learn and experience the <em>Web3, DeFi, Exchange tokens</em>, engage in <em>professional trading</em>, and enjoy a <em>social communication experience</em> at the same time. The most crucial aspect is that a secure private key free wallet utilizes <em>MPC/AA technology</em> to ensure that personal assets truly belong to the user.
                                </p>
                                <p>
                                    With your help, BNHP will establish a <em>world-class Web3 native social + financial infrastructure</em> that serves as a super gateway for traditional users worldwide.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
