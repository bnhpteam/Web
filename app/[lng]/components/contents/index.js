// 'use client';
// import { useInView } from "motion/react";
// import { useRef } from "react";

export default function Contents({ children }) {
    return <>
        <div className="w-screen h-screen relative">
            <div
                className={`w-full h-full fixed -z-1 left-0 bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat pointer-events-none fiexd-bg`}
            />
            <div className="max-yt:px-[10px]-- pt-[56px] overflow-x-hidden">
                {children}
            </div>
        </div>
    </>
}