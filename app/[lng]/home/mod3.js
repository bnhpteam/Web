'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";
export default function Mod3() {
    return (
        <>
            <div className='w-full relative max-yt:px-[var(--padx)]'>
            <div className='w-screen absolute top-[46px] left-0 -z-1 border-[#2B2B2B] cut-border max-qw:hidden' />
                <div className="w-base h-[768px] text-white border border-b-0 border-t-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none relative overflow-hidden max-qw:h-[408px]">
                {/* <div className='w-screen absolute top-[49px] left-0 z-1 border-[#2B2B2B] border-t max-qw:hidden' /> */}
                    <Pagination className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none' page='02' title='ABOUT' desc={
                        <div className='flex items-center'>
                            <span>SCROLL TO EXPLORE</span>
                            <svg className='ml-1' width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M9.25 7L6 10.25M6 10.25L2.75 7M6 10.25V1.75" stroke="#D9D9D9" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    } />
                    <div className='w-full h-full flex items-center justify-between'>
                        <img src='/assets/imgs/mod3-left.png' className='w-[160px] h-[490px] object-cover max-bw:!hidden' />

                        <div className='text-[rgba(255,255,255,0.40)] relative max-w-[640px] w-full min-h-[396px] px-[40px] text-[27.3px] leading-[36px] max-qw:min-h-[264px] max-qw:text-[16px] max-qw:leading-[24px] max-qw:px-[32px] max-bw:max-w-full max-bw:flex max-bw:items-center hidden max-bw:block'>
                            <img className='h-full w-[8px] absolute left-0 top-0 max-bw:left-[12px]' src='/assets/imgs/mod3-text-bg-left.png' />
                            <img className='h-full w-[8px] absolute right-0 top-0 -scale-x-[1] max-bw:right-[12px]' src='/assets/imgs/mod3-text-bg-left.png' />
                            <div className='spanWhite'>
                                <em>BNHP</em> is a decentralized, innovative crypto trading platform built for the <em>Binance Smart Chain (BSC)</em>. With <em>AI at its core</em>, it helps users quickly <em>discover, snipe, and trade MEME</em> tokens across the <em>BSC ecosystem</em>, delivering a <em>fast, localized</em> experience. From <em>intelligent wallet tracking to automated trading</em>, BNHP offers an <em>all‑in‑one solution for BSC users</em>—so you can <em>capture high‑potential MEME opportunities</em> without juggling multiple chains.
                            </div>
                        </div>

                        <div className='relative max-w-[640px] w-full h-[396px] max-qw:min-h-[264px] max-bw:h-fit max-bw:max-w-full max-bw:flex max-bw:items-center block max-bw:!hidden'>
                            <img className='h-full w-[8px] absolute left-0 top-0 max-bw:left-[12px]' src='/assets/imgs/mod3-text-bg-left.png' />
                            <img className='h-full w-[8px] absolute right-0 top-0 -scale-x-[1] max-bw:right-[12px]' src='/assets/imgs/mod3-text-bg-left.png' />
                            <HyperText className='text-[rgba(255,255,255,0.40)] w-full px-[40px] text-[27.3px] leading-[36px] max-qw:text-[16px] max-qw:!leading-[24px] max-qw:px-[32px] spanWhite font--'>
                                <em>BNHP</em> is a decentralized, innovative crypto trading platform built for the <em>Binance Smart Chain (BSC)</em>. With <em>AI at its core</em>, it helps users quickly <em>discover, snipe, and trade MEME</em> tokens across the <em>BSC ecosystem</em>, delivering a <em>fast, localized</em> experience. From <em>intelligent wallet tracking to automated trading</em>, BNHP offers an <em>all‑in‑one solution for BSC users</em>—so you can <em>capture high‑potential MEME opportunities</em> without juggling multiple chains.
                            </HyperText>
                        </div>

                        <img src='/assets/imgs/mod3-right.png' className='w-[160px] h-[490px] object-cover max-bw:!hidden' />
                    </div>
                </div>
            </div>
        </>
    );
}
