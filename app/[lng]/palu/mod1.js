'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HyperText } from "@/components/ui/hyper-text";

export default function Mod1() {
    return (
        <>
            <div className='w-full max-yt:px-[var(--padx)]'>
                <motion.div
                    className="w-base border border-b-0 border-t-0 border-[#2B2B2B]">
                    <div className='w-full flex flex-col items-center justify-center pt-[56px] pb-6 max-qw:pt-[28px] max-qw:pb-3'>
                        <div className='font-normal text-[36px] text-[#fff]'>
                            <HyperText>
                                BNHP x PALU
                            </HyperText>
                        </div>
                        <div className='mt-1 text-[14px] text-[#fff] opacity-[0.4] text-center max-qw:px-3'>
                            <HyperText>
                                Complete the following tasks to receive a blind box figurine.
                            </HyperText>
                        </div>
                    </div>
                    <div className='w-full border-t border-[#2B2B2B]'>
                        <img className='w-full h-full' src='/assets/imgs/event-mod1.png' />
                    </div>
                </motion.div>
            </div>
        </>
    )
}
