'use client';
import { motion } from 'framer-motion';
import Pagination from '../components/pagination';
import CopyBtn from '../components/copyBtn';
import { HyperText } from "@/components/ui/hyper-text";
export default function Mod2() {
    const token = `0xe6878a8863219b8fa9d449bcb4245e77944f4444`;
    return (
        <>
            <motion.div
                className="relative max-yt:px-[var(--padx)]">
                <div className='w-screen h-full absolute top-0 left-0 -z-1 border-[#2B2B2B] bg-[url(/assets/imgs/grid-bg.png)] bg-cover bg-no-repeat' />
                <div className='w-base h-[542px] border border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat relative max-qw:h-fit'>
                    <Pagination className='!absolute top-0' page='01' title='TOKEN' />
                    <div className='w-full h-full flex flex-col items-center justify-center max-qw:px-5 max-qw:py-[48px] max-qw:mt-6'>
                        <div className='font-normal text-[36px] text-[#fff]'>
                            <HyperText>BNHPAI Token</HyperText>
                        </div>
                        {/* <div className='font-normal text-[36px] text-[#fff]'>BNHPAI Token</div> */}
                        <div className='mt-1 text-[14px] text-[#fff] opacity-[0.4] text-center'>
                            <HyperText>Hold and support BNHPAI will be your best investment.</HyperText>
                        </div>
                        {/* <div className='mt-1 text-[14px] text-[#fff] opacity-[0.4]'>Hold&nbsp;&nbsp;$BNHP， Snipe&nbsp;&nbsp;the&nbsp;&nbsp;Moon ! "</div> */}
                        <div className='my-6 max-w-[540px] w-full px-2 h-[80px] flex items-center justify-center relative max-qw:h-[64px] max-qw:px-3'>
                            <svg className='absolute left-[0] top-[0]' width="5" height="5" viewBox="0 0 5 5" fill="none">
                                <path d="M4.5 0.5H0.5V4.5" stroke="white" />
                            </svg>
                            <svg className='absolute left-[0] bottom-[0]' width="5" height="5" viewBox="0 0 5 5" fill="none">
                                <path d="M4.5 4H0.5V0" stroke="white" />
                            </svg>
                            <svg className='absolute right-[0] top-[0]' width="5" height="5" viewBox="0 0 5 5" fill="none">
                                <path d="M0 0.5H4V4.5" stroke="white" />
                            </svg>
                            <svg className='absolute right-[0] bottom-[0]' width="5" height="5" viewBox="0 0 5 5" fill="none">
                                <path d="M0 4H4V0" stroke="white" />
                            </svg>
                            <div className='max-w-[516px] h-[64px] w-full flex justify-center'>
                                {/* <div className='flex-1 h-full border border-[#505050] border-r-0 bg-[rgba(17,17,17,0.01)] shadow-[inset_0_0_16px_0_rgba(255,255,255,0.25)] text-[16px] text-[#fff] px-6 flex items-center justify-center break-all max-qw:text-[14px]'>
                                    {token}
                                </div> */}
                                <div className='flex-1 h-full border border-[#505050] border-r-0 bg-[rgba(17,17,17,0.01)] shadow-[inset_0_0_16px_0_rgba(255,255,255,0.25)] text-[16px] text-[#fff] px-6- max-qw:px-3 flex items-center leading-normal justify-center  break-all max-qw:text-[14px]'>
                                    <HyperText>{token}</HyperText>
                                </div>
                                <CopyBtn textToCopy={token} />
                            </div>
                        </div>
                        <div className='text-[12px] text-white opacity-[0.4]'>
                            <div className='flex items-center'>
                                <svg className='max-qw:px-3' width="112" height="1" viewBox="0 0 112 1" fill="none">
                                    <path d="M0 0.5H112" stroke="#464646" />
                                </svg>
                                <span className='mx-[10px] whitespace-nowrap'>
                                    <HyperText>Token Allocation</HyperText>
                                </span>
                                <svg className='max-qw:px-3' width="112" height="1" viewBox="0 0 112 1" fill="none">
                                    <path d="M0 0.5H112" stroke="#464646" />
                                </svg>
                            </div>
                            <div className='mt-2 leading-[16px] overflow-hidden max-qw:px-[13px]'>
                                <HyperText>
                                    <section>BNHP team will repurchase and destroy on quarterly</section>
                                    <section>Ensure BNHP's deflation model and long-term growth</section>
                                </HyperText>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
