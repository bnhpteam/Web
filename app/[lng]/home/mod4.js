'use client';
import { useEffect } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

// // 使用动态导入并禁用 SSR，避免在服务端渲染时出错，Rive 组件依赖浏览器 API，必须在客户端渲染
import dynamic from "next/dynamic";
const RivsAnimat = dynamic(() => import("../components/rivePlayer"), {
    ssr: false,
});
// import RivsAnimat from '../components/rivePlayer';

const riveList = [
    {
        title: 'DEX (Exchange) - A full-scenario on-chain financial engine',
        rive: 'H2',
        desc: `The BNHP built-in DEX platform integrates liquidity from the entire network, catering to all trading needs, from novices to professional traders. It encompasses four modes:Meme mode、Minimalist Mode (Swap)、Professional trading mode and Cross-chain Bridge.`
    },
    {
        title: 'Exploration of AI-driven Web3',
        rive: 'H4',
        desc: `Innovation: A user-friendly entry for web2 users to seamlessly transition into the web3 world. AI scanning engine: AI-powered automatic narration, real-time detection of contract risks, transaction taxes, and whale dynamics. Built-in browser: Carefully selected mainstream Dapps, automatically blocking malicious DApps.`
    },
    {
        title: 'Social square for freedom of speech',
        rive: 'H1',
        desc: `Breaking the traditional social media monopoly, we facilitate the free flow of information based on recommendation algorithms, allowing users to truly grasp their own social influence. Innovation: Tweets holding at least one platform token enter the "All" information stream, ensuring authenticity, improving quality, and empowering tokens.`
    },
    {
        title: 'MPC keyless wallet and Asset warning',
        rive: 'H3',
        desc: `Utilizing MPC (Multi-Party Computation) technology, users can log in through their accounts without needing to back up their mnemonic phrases, ensuring greater security and self-custody. Innovation: Real-time monitoring of the overall asset distribution in the wallet assists users in precisely timing the sale of meme tokens, maximizing asset returns.`
    },
]

export default function Mod4() {

    // useEffect(() => {
    //     const rivsBoxs = document.querySelector('.rivsBox');
    //     if (!rivsBoxs) return;
    //     let setTime;
    //     rivsBoxs.addEventListener('touchstart', (e) => {
    //         rivsBoxs.style.pointerEvents = 'none';
    //         setTime && clearTimeout(setTime);
    //     });
    //     rivsBoxs.addEventListener('touchend', (e) => {
    //         setTime = setTimeout(() => (rivsBoxs.style.pointerEvents = 'all'), 500);
    //     });
    // }, []);

    return (
        <>
            <div className='relative w-full max-yt:px-[var(--padx)] rivsBox'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base text-white border border-b-0 border-[#2B2B2B] relative z-10 overflow-hidden bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none">
                    <Pagination page='03' title='FUNCTION' centerClassName='max-qw:left-[55%]' />

                    <div className='w-full h-full p-[40px] grid grid-cols-2 gap-4 max-qw:p-3 max-bw:flex max-bw:flex-col'>
                        {
                            riveList.map((item, idx) => (
                                <div key={idx + 'asdf'} className='bg-[#161616] p-[40px] max-qw:p-3 min-h-[592px] max-qw:min-h-fit'>
                                    <div className='flex items-center justify-between'>
                                        <div className='w-2 h-2 bg-white' />
                                        <div className='text-[#B2B2B2] text-[12px]'>/&nbsp;&nbsp;&nbsp;00{idx + 1}</div>
                                    </div>
                                    <div className='w-full h-[340px] mt-4 relative max-qw:h-[55vw]'>
                                        {/* <img className='w-full h-full object-cover absolute' src='/assets/imgs/rive-bg.png' /> */}
                                        <div className='text-white w-full h-full absolute z-10 flex items-center justify-center max-qw:pointer-events-none-'>
                                            <RivsAnimat code={item.rive} />
                                        </div>
                                    </div>
                                    <div className='mt-6 text-[20px] text-[#E3E3E3] font-normal max-qw:!mt-4'>
                                        <HyperText>{item.title}</HyperText>
                                    </div>
                                    <div className='mt-4 text-[14px] text-[rgba(255,255,255,0.40)] font-normal leading-[20px] tracking-[-0.28px]'>
                                        <HyperText>{item.desc}</HyperText>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
