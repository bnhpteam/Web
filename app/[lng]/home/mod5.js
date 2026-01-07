'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";
import { linkUrl } from '@/config/';

const navList = [
    {
        title: `Invest in BNHP.`,
        desc: `This is a brief introduction to BNHP, covering its background, objectives, and market potential.`,
        url: linkUrl.InvestInBNHP
    },
    {
        title: `BNHP Palu Figurine.`,
        desc: `This is a publicity blind box activity, so that BNHP can get more attention and support.`,
        url: `https://bnhp.ai/palu`
    },
    {
        title: `BNHP Joab Opportunities.`,
        desc: `This is the job information for BNHP, detailing position requirements and the application process.`,
        url: linkUrl.bNHPJoab
    },
]

export default function Mod5() {
    return (
        <>

            <div className='relative w-full max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base text-white border border-b-0 border-[#2B2B2B] relative overflow-hidden bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat">
                    <Pagination page='04' />
                    <div className='w-full h-full flex items-center justify-center py-[80px] max-qw:pt-5 max-qw:pb-3'>
                        <div className='flex w-full items-center justify-between max-qw:flex-col'>
                            <div className='w-[320px] flex justify-center items-center text-[36px] font-normal text-[#fff] max-jw:hidden max-qw:block max-qw:w-full max-qw:text-center'>
                                <HyperText>Progress</HyperText>
                            </div>
                            <div className='flex-1 max-qw:mt-5'>
                                {
                                    navList.map((item, idx) => (
                                        <nav key={idx + 'lkj'} className={`w-full h-[162px] flex border border-[#2B2B2B] border-r-0 max-qw:flex-col max-qw:h-fit max-qw:p-3 max-qw:border-l-0 max-qw:last:border-b-0 ${idx % 2 && 'border-t-0 border-b-0'}`}>
                                            <div className='flex-1 h-full p-4 text-[#B2B2B2] text-[12px] flex items-start max-qw:flex-col max-qw:p-0'>
                                                <span>/&nbsp;&nbsp;&nbsp;00{idx + 1}</span>
                                                <span className='text-[16px] text-white ml-6 max-qw:ml-0 max-qw:mt-3'>
                                                    <HyperText>{item.title}</HyperText>
                                                </span>
                                            </div>
                                            <div className='flex-1 h-full p-4 text-[14px] text-[rgba(255,255,255,0.40)] max-qw:p-0 max-qw:mt-3'>
                                                {/* {item.desc} */}
                                                <HyperText>{item.desc}</HyperText>
                                            </div>
                                            <a href={item.url} target="_blank" className='flex-1 h-full p-4 flex justify-end max-qw:p-0 max-qw:mt-3'>
                                                <div className='w-[148px] h-[40px] border border-white cursor-pointer relative group'>
                                                    <div className='w-0 h-full bg-white absolute top-0 left-0 ease-out duration-500 group-hover:w-full' />
                                                    <div className='w-full h-full absolute z-10 flex items-center justify-between  px-4 py-[10px] group-hover:text-black ease-out duration-200 delay-100'>
                                                        <span>View</span>
                                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" className='group-hover:stroke-black' stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                        </nav>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
