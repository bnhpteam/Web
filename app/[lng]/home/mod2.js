"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { linkUrl } from "@/config/index";
import Pagination from "../components/pagination";
import { HyperText } from "@/components/ui/hyper-text";
import CopyBtn from "../components/copyBtn";

export default function Mod2() {
  const address = `0xb000f8da0ed095554ac1e27d8e3ff9cecc1d0000`;

  return (
    <>
      <motion.div className="relative max-yt:px-[var(--padx)]">
        <div className="w-screen h-full absolute top-0 left-0 -z-1 border-[#2B2B2B] bg-[url(/assets/imgs/grid-bg.png)] bg-cover bg-no-repeat" />
        <div className="w-base border border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat relative max-qw:h-fit pb-10">
          <Pagination className="!absolute top-0" page="01" title="TOKEN" />
          <div className="w-full h-full flex flex-col items-center justify-center max-qw:px-5 max-qw:py-[48px] max-qw:mt-6 pt-[80px]">
            <div className="font-normal text-[36px] text-[#fff]">
              <HyperText>Public Sale</HyperText>
            </div>
            {/* <div className='font-normal text-[36px] text-[#fff]'>BNHPAI Token</div>  */}
            <div className="mt-1 text-[14px] text-[#fff] opacity-[0.4] text-center">
              <HyperText>
                $NPH OFT Token — Ethereum · BNB Chain · Arbitrum · Base
              </HyperText>
            </div>
            {/* <div className='mt-1 text-[14px] text-[#fff] opacity-[0.4]'>Hold&nbsp;&nbsp;$BNHP， Snipe&nbsp;&nbsp;the&nbsp;&nbsp;Moon ! "</div> */}
            <div className="my-6 max-w-[540px] w-full px-2 h-[80px] flex items-center justify-center relative max-qw:h-[64px] max-qw:px-3">
              <svg
                className="absolute left-[0] top-[0]"
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
              >
                <path d="M4.5 0.5H0.5V4.5" stroke="white" />
              </svg>
              <svg
                className="absolute left-[0] bottom-[0]"
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
              >
                <path d="M4.5 4H0.5V0" stroke="white" />
              </svg>
              <svg
                className="absolute right-[0] top-[0]"
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
              >
                <path d="M0 0.5H4V4.5" stroke="white" />
              </svg>
              <svg
                className="absolute right-[0] bottom-[0]"
                width="5"
                height="5"
                viewBox="0 0 5 5"
                fill="none"
              >
                <path d="M0 4H4V0" stroke="white" />
              </svg>
              <div className="max-w-[516px] h-[64px] w-full flex justify-center">
                {/* <div className='flex-1 h-full border border-[#505050] border-r-0 bg-[rgba(17,17,17,0.01)] shadow-[inset_0_0_16px_0_rgba(255,255,255,0.25)] text-[16px] text-[#fff] px-6 flex items-center justify-center break-all max-qw:text-[14px]'>
                                    {address}
                                </div> */}
                <div className="flex-1 h-full border border-[#505050] border-r-0 bg-[rgba(17,17,17,0.01)] shadow-[inset_0_0_16px_0_rgba(255,255,255,0.25)] text-[16px] text-[#fff] px-6- max-qw:px-3 flex items-center leading-normal justify-center  break-all max-qw:text-[14px]">
                  <HyperText>{address}</HyperText>
                </div>
                <CopyBtn textToCopy={address} />
              </div>
            </div>
            {/* 参加按钮 */}
            <a
              href="https://app.bnhp.ai/sale"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mb-4 px-8 py-3 border border-[#C6AC6F] text-[#C6AC6F] text-[14px] font-medium relative group overflow-hidden hover:text-black transition-colors duration-300 cursor-pointer"
            >
              <span className="absolute inset-0 bg-[#C6AC6F] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Participate
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <div className="text-[12px] text-white opacity-[0.4] text-center">
              <div className="mt-2 leading-[20px] overflow-hidden max-qw:px-[13px] space-y-1">
                <HyperText>
                  <section>
                    $NPH public sale supported assets: USDT, USDC (ERC-20)
                  </section>
                  <section>
                    Target: $10M &nbsp;|&nbsp; 2026.06.10 — 2026.12.31
                  </section>
                  <section>
                    Email for other fiat currency channels: bnhpteam@gmail.com
                  </section>
                </HyperText>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
