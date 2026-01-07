'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';

export default function Mod1() {
    return (
        <>
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-[46px] left-0 -z-1 border-[#2B2B2B] cut-border max-qw:hidden' />
                <div className="w-base h-[768px] text-white border border-b-0 border-t-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none relative overflow-hidden max-qw:h-[408px]">
                    <Pagination className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none' page='01 / 06' title='WHITE PAPER' desc='V 1.0' />
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                        <div className='text-[64px] font-bold max-qw:text-[32px]'>BNHP White Paper</div>
                        <div className='text-[24px] text-[rgba(255,255,255,0.6)] mt-4 max-qw:text-[16px]'>Version 1.0</div>
                        <a 
                            href="/BNHP-APP-Whitepaper-V1.0.pdf" 
                            download
                            className='mt-8 px-8 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'
                        >
                            Download PDF
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
