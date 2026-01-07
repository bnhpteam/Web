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
                    <webby-nominee>
                        <div className="badge js-badge w-full h-full">
                            <a>
                                <img className="js-badge-img" src="/assets/imgs/mod1-logo.png" alt="" />
                                <span className="badge__vote max-qw:text-center max-qw:!text-[18px]">
                                    Coming soon
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
