'use client';
import { motion } from 'framer-motion';
import { use, useEffect, useState } from 'react';
import { linkUrl } from '@/config/index';
import './webbyNominee.css';

export default function Mod1() {
    useEffect(() => {
        import('./webbyNominee.js');
    }, []);
    return (
        <>
            <div className='max-yt:px-[var(--padx)] w-full'>
                <motion.div
                    className="w-base h-[780px] border border-b-0 border-t-0 border-[#2B2B2B] relative overflow-hidden max-qw:h-[560px]">
                    {/* Tagline overlay - positioned at bottom of hero */}
                    <div className='absolute bottom-10 left-0 right-0 flex flex-col items-center z-10 pointer-events-none max-qw:bottom-6'>
                        <p className='text-[13px] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.45)] font-light' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            The Next Generation of Web3
                        </p>
                        <div className='mt-3 w-[40px] h-px bg-[#C6AC6F] opacity-60' />
                    </div>
                    <webby-nominee>
                        <div className="badge js-badge w-full h-full">
                            <a>
                                <img className="js-badge-img" src="/assets/imgs/mod1-logo.png" alt="" />
                                <span className="badge__vote max-qw:text-center max-qw:!text-[18px]">
                                    PUBLIC SALE
                                </span>
                            </a>
                        </div>
                        <div className="aura"></div>
                        <div className="overlay"></div>
                        <canvas className="js-canvas"></canvas>
                    </webby-nominee>
                </motion.div>
            </div>
        </>
    )
}
