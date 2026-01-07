'use client';
import { motion, useInView, useMotionValueEvent } from "motion/react";
import { useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { linkUrl } from '@/config/';
export const Footer = () => {
    const refFooter = useRef(null);
    const isInView = useInView(refFooter);

    const router = useRouter();

    return (
        <>
            <div className="pb-[54px] max-qw:pb-6 w-full">
                <footer ref={refFooter} className="flex relative max-yt:px-[var(--padx)]">
                    <div className="w-screen border-t border-b-0 border-[#2B2B2B] absolute top-0 left-0" />
                    <div className="w-[40px] h-full border-r border-[#2B2B2B] bg-[url(/assets/imgs/grid-bg.png)] bg-cover bg-no-repeat absolute left-0 -z-1" />
                    <div className="w-base border border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat text-white flex flex-col justify-between">
                        <div className="w-full h-[48px] flex">
                            <div className="flex-1 h-full border-b border-r border-[#2B2B2B] flex items-center justify-between py-4 px-6">
                                <div className='w-2 h-2 bg-white' />
                                <a className='text-white text-[14px] cursor-pointer' href='/'>/Home</a>
                            </div>
                            <div className="flex-1 h-full border-b border-[#2B2B2B] flex items-center justify-between py-4 px-6">
                                <div className='w-2 h-2 bg-white' />
                                <a className='text-white text-[14px] cursor-pointer' href='/palu'>/Events</a>
                            </div>
                        </div>
                        <div className="max-bw:py-2">
                            <img src="/assets/imgs/footer-logo.png" />
                        </div>
                        <div className="w-full h-[48px] flex max-yl:h-fit">
                            <div className="flex-1/2 h-full border-t border-r border-[#2B2B2B] text-[#444] flex items-center justify-between py-4 px-6 max-qw:hidden">
                                ©BNHP All rights reserved
                            </div>
                            <div className="flex-1/2 h-full border-t border-[#2B2B2B] flex max-yl:flex-col">
                                <a href={linkUrl.twitter} target="_blank" className="flex-1 border-r border-[#2B2B2B] py-4 px-6 flex items-center justify-between cursor-pointer max-bw:border-r-0">
                                    <div className="flex items-center text-[14px] text-white">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.20472 5.4039C3.6916 4.64737 4.23352 3.625 5.14764 3.625H8.7938C9.36514 3.625 9.89934 3.90816 10.2201 4.381L19.8841 18.6293C20.3972 19.3858 19.8553 20.4082 18.9412 20.4082H15.295C14.7237 20.4082 14.1895 20.125 13.8688 19.6522L4.20472 5.4039ZM5.82803 5.125L15.1102 18.8102C15.1517 18.8715 15.221 18.9082 15.295 18.9082H18.2608L8.97866 5.22299C8.93709 5.1617 8.86785 5.125 8.7938 5.125H5.82803Z" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.9455 12.8706C11.2564 13.1443 11.2866 13.6182 11.0129 13.9291L5.23189 20.4958C4.95819 20.8067 4.48427 20.8368 4.17337 20.5631C3.86247 20.2894 3.83232 19.8155 4.10602 19.5046L9.887 12.938C10.1607 12.6271 10.6346 12.5969 10.9455 12.8706Z" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.2527 3.43707C19.5636 3.71078 19.5937 4.18469 19.32 4.49559L13.8833 10.6712C13.6096 10.9821 13.1356 11.0123 12.8247 10.7386C12.5138 10.4649 12.4837 9.99094 12.7574 9.68004L18.1941 3.50443C18.4678 3.19352 18.9418 3.16337 19.2527 3.43707Z" fill="white" />
                                        </svg>
                                        <span className="ml-2">X(Twitter)</span>
                                    </div>
                                    <div>
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </a>
                                <a href={linkUrl.telegram} target="_blank" className="flex-1 py-4 px-6 flex items-center justify-between cursor-pointer max-yl:border-t max-yl:border-b max-yl:border-[#2B2B2B]">
                                    <div className="flex items-center text-[14px] text-white">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M20.2448 5.06481C20.2738 4.93793 20.148 4.83161 20.0278 4.88089L3.88242 11.4878C3.81492 11.5154 3.78772 11.5495 3.7733 11.5765C3.75546 11.6098 3.74488 11.6576 3.75209 11.7124C3.75929 11.7671 3.78188 11.8105 3.80768 11.838C3.82817 11.8598 3.86241 11.8853 3.93249 11.8949L8.72612 12.44C8.87486 12.457 9.01514 12.518 9.12889 12.6153L16.618 19.0215C16.6329 19.0342 16.6474 19.0476 16.6613 19.0615C16.7972 19.1978 17.0316 19.1312 17.0747 18.942L20.2448 5.06481ZM21.7071 5.39903C22.0068 4.08791 20.7044 2.98201 19.4585 3.49314L3.31438 10.0995C1.68591 10.7658 2.00002 13.1618 3.74724 13.3834L8.3284 13.9045L15.6234 20.1446C16.5977 21.0864 18.2345 20.6031 18.5372 19.2755L21.7071 5.39903Z" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.57498 12.4404C8.9876 12.4041 9.35151 12.7092 9.38779 13.1218L9.75767 17.3285L11.5835 15.7696C11.8985 15.5006 12.3719 15.538 12.6408 15.853C12.9098 16.168 12.8725 16.6414 12.5575 16.9103L10.6738 18.5186C9.82569 19.2429 8.51052 18.7902 8.28896 17.6963C8.28339 17.6688 8.27937 17.6411 8.27691 17.6131L7.89355 13.2532C7.85727 12.8406 8.16236 12.4766 8.57498 12.4404Z" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M21.2827 3.89171C21.5281 4.22543 21.4565 4.69487 21.1228 4.94024L9.0869 13.7896C8.75318 14.035 8.28374 13.9633 8.03838 13.6296C7.79301 13.2959 7.86463 12.8265 8.19835 12.5811L20.2342 3.73173C20.5679 3.48637 21.0374 3.55799 21.2827 3.89171Z" fill="white" />
                                        </svg>
                                        <span className="ml-2">Telegram</span>
                                    </div>
                                    <div>
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </a>
                                <a href={linkUrl.whitePaper} target="_blank" className="flex-1 py-4 px-6 flex border-l border-[#2B2B2B] items-center justify-between cursor-pointer max-bw:border-l-0">
                                    <div className="flex items-center text-[14px] text-white">
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.84875 16.8016C4.19484 16.6082 3.49031 16.4637 2.75625 16.409C1.23563 16.2938 0 15.0164 0 13.3817V3.03984C0 1.20977 1.53421 -0.176949 3.25922 0.0183612C5.52094 0.278131 7.4545 1.23516 8.60621 1.93047C8.85936 2.08281 9.14294 2.15313 9.42374 2.14141C9.6623 2.13164 9.89904 2.06133 10.1147 1.93047C11.2655 1.23516 13.199 0.278131 15.4608 0.0183612C17.1849 -0.176949 18.72 1.20977 18.72 3.03984V13.3817C18.72 15.0164 17.4844 16.2938 15.9637 16.409C14.4727 16.5203 13.1044 17.0008 12.0324 17.5125C11.5753 17.7313 11.1722 17.9559 10.8366 18.159C9.92064 18.7117 8.79936 18.7117 7.88342 18.159C7.1475 17.7137 6.0886 17.1688 4.84875 16.8016ZM8.64 3.54961C8.3784 3.48125 8.1239 3.37188 7.88342 3.22734C7.32192 2.8875 6.5714 2.49102 5.69484 2.15899C4.91579 1.86211 4.03688 1.61797 3.10265 1.51055C2.20875 1.40899 1.44 2.12578 1.44 3.03984V13.3817C1.44 13.8133 1.61579 14.2059 1.90547 14.4852C2.15297 14.7254 2.4839 14.8836 2.85984 14.9129C5.29453 15.0946 7.38893 16.1258 8.60534 16.8602C8.61706 16.868 8.62829 16.8738 8.64 16.8797V3.54961ZM10.08 16.8797C10.0917 16.8738 10.1029 16.868 10.1147 16.8602C10.8904 16.3914 12.0229 15.8016 13.3735 15.3914C14.1408 15.1571 14.978 14.9793 15.8611 14.9129C16.6743 14.8504 17.28 14.1824 17.28 13.3817V3.03984C17.28 2.12578 16.5103 1.40899 15.6174 1.51055C13.6322 1.73711 11.8974 2.58672 10.8366 3.2293C10.5961 3.37383 10.3416 3.48125 10.08 3.54961V16.8797Z" fill="white" />
                                        </svg>
                                        <span className="ml-2">White Paper</span>
                                    </div>
                                    <div>
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="w-full h-[48px] border-t border-[#2B2B2B] text-[#444] items-center justify-between py-4 px-6 hidden max-qw:block">
                            ©BNHP All rights reserved
                        </div>
                    </div>
                    <div className="w-screen border-t border-[#2B2B2B] absolute bottom-0 left-0" />
                    <div className="w-[40px] h-full border-l border-[#2B2B2B] bg-[url(/assets/imgs/grid-bg.png)] bg-cover bg-no-repeat absolute right-0 -z-1" />
                </footer>
            </div>
        </>
    );
};


// 'use client';
// import { motion, useInView, useMotionValueEvent } from "motion/react";
// import { useState, useRef } from "react";
// import { useRouter } from 'next/navigation'

// export const Footer = () => {
//     const refFooter = useRef(null);
//     const isInView = useInView(refFooter);

//     const router = useRouter();

//     return (
//         <>
//             <footer ref={refFooter} className="flex justify-between pb-[54px] max-qw:pb-6">
//                 <div className="flex-1 !min-w-[40px] border border-r-0 border-l-0 border-[#2B2B2B] flex justify-start">
//                     <div className="w-[40px] h-full border-r border-[#2B2B2B] bg-[url(/assets/imgs/grid-bg.png)] bg-cover bg-no-repeat">
//                     </div>
//                 </div>
//                 <div className="w-base !min-w-[1280px] border border-[#2B2B2B] text-white flex flex-col justify-between">
//                     <div className="w-full h-[48px] flex">
//                         <div className="flex-1 h-full border-b border-r border-[#2B2B2B] flex items-center justify-between py-4 px-6">
//                             <div className='w-2 h-2 bg-white' />
//                             <div className='text-white text-[14px] cursor-pointer'>/Home</div>
//                         </div>
//                         <div className="flex-1 h-full border-b border-[#2B2B2B] flex items-center justify-between py-4 px-6">
//                             <div className='w-2 h-2 bg-white' />
//                             <div className='text-white text-[14px] cursor-pointer'>/Events</div>
//                         </div>
//                     </div>
//                     <div className="">
//                         <img src="/assets/imgs/footer-logo.png" />
//                     </div>
//                     <div className="w-full h-[48px] flex">
//                         <div className="flex-1/2 h-full border-t border-r border-[#2B2B2B] text-[#444] flex items-center justify-between py-4 px-6 max-qw:hidden">
//                             ©BNHP All rights reserved
//                         </div>
//                         <div className="flex-1/2 h-full border-t border-[#2B2B2B] flex">
//                             <div className="flex-1/2 border-r border-[#2B2B2B] py-4 px-6 flex items-center justify-between cursor-pointer">
//                                 <div className="flex items-center text-[14px] text-white">
//                                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                                         <path fillRule="evenodd" clipRule="evenodd" d="M4.20472 5.4039C3.6916 4.64737 4.23352 3.625 5.14764 3.625H8.7938C9.36514 3.625 9.89934 3.90816 10.2201 4.381L19.8841 18.6293C20.3972 19.3858 19.8553 20.4082 18.9412 20.4082H15.295C14.7237 20.4082 14.1895 20.125 13.8688 19.6522L4.20472 5.4039ZM5.82803 5.125L15.1102 18.8102C15.1517 18.8715 15.221 18.9082 15.295 18.9082H18.2608L8.97866 5.22299C8.93709 5.1617 8.86785 5.125 8.7938 5.125H5.82803Z" fill="white" />
//                                         <path fillRule="evenodd" clipRule="evenodd" d="M10.9455 12.8706C11.2564 13.1443 11.2866 13.6182 11.0129 13.9291L5.23189 20.4958C4.95819 20.8067 4.48427 20.8368 4.17337 20.5631C3.86247 20.2894 3.83232 19.8155 4.10602 19.5046L9.887 12.938C10.1607 12.6271 10.6346 12.5969 10.9455 12.8706Z" fill="white" />
//                                         <path fillRule="evenodd" clipRule="evenodd" d="M19.2527 3.43707C19.5636 3.71078 19.5937 4.18469 19.32 4.49559L13.8833 10.6712C13.6096 10.9821 13.1356 11.0123 12.8247 10.7386C12.5138 10.4649 12.4837 9.99094 12.7574 9.68004L18.1941 3.50443C18.4678 3.19352 18.9418 3.16337 19.2527 3.43707Z" fill="white" />
//                                     </svg>
//                                     <span className="ml-2">X(Twitter)</span>
//                                 </div>
//                                 <div>
//                                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                                         <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                     </svg>
//                                 </div>
//                             </div>
//                             <div className="flex-1/2 py-4 px-6 flex items-center justify-between cursor-pointer">
//                                 <div className="flex items-center text-[14px] text-white">
//                                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                                         <path fillRule="evenodd" clipRule="evenodd" d="M20.2448 5.06481C20.2738 4.93793 20.148 4.83161 20.0278 4.88089L3.88242 11.4878C3.81492 11.5154 3.78772 11.5495 3.7733 11.5765C3.75546 11.6098 3.74488 11.6576 3.75209 11.7124C3.75929 11.7671 3.78188 11.8105 3.80768 11.838C3.82817 11.8598 3.86241 11.8853 3.93249 11.8949L8.72612 12.44C8.87486 12.457 9.01514 12.518 9.12889 12.6153L16.618 19.0215C16.6329 19.0342 16.6474 19.0476 16.6613 19.0615C16.7972 19.1978 17.0316 19.1312 17.0747 18.942L20.2448 5.06481ZM21.7071 5.39903C22.0068 4.08791 20.7044 2.98201 19.4585 3.49314L3.31438 10.0995C1.68591 10.7658 2.00002 13.1618 3.74724 13.3834L8.3284 13.9045L15.6234 20.1446C16.5977 21.0864 18.2345 20.6031 18.5372 19.2755L21.7071 5.39903Z" fill="white" />
//                                         <path fillRule="evenodd" clipRule="evenodd" d="M8.57498 12.4404C8.9876 12.4041 9.35151 12.7092 9.38779 13.1218L9.75767 17.3285L11.5835 15.7696C11.8985 15.5006 12.3719 15.538 12.6408 15.853C12.9098 16.168 12.8725 16.6414 12.5575 16.9103L10.6738 18.5186C9.82569 19.2429 8.51052 18.7902 8.28896 17.6963C8.28339 17.6688 8.27937 17.6411 8.27691 17.6131L7.89355 13.2532C7.85727 12.8406 8.16236 12.4766 8.57498 12.4404Z" fill="white" />
//                                         <path fillRule="evenodd" clipRule="evenodd" d="M21.2827 3.89171C21.5281 4.22543 21.4565 4.69487 21.1228 4.94024L9.0869 13.7896C8.75318 14.035 8.28374 13.9633 8.03838 13.6296C7.79301 13.2959 7.86463 12.8265 8.19835 12.5811L20.2342 3.73173C20.5679 3.48637 21.0374 3.55799 21.2827 3.89171Z" fill="white" />
//                                     </svg>
//                                     <span className="ml-2">Telegram</span>
//                                 </div>
//                                 <div>
//                                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                                         <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full h-[48px] border border-l-0 border-r-0 border-[#2B2B2B] text-[#444] items-center justify-between py-4 px-6 hidden max-qw:block">
//                         ©BNHP All rights reserved
//                     </div>
//                 </div>
//                 <div className="flex-1 !min-w-[40px] border border-l-0 border-r-0 border-[#2B2B2B] flex justify-end">
//                     <div className="w-[40px] h-full border-l border-[#2B2B2B] bg-[url(/assets/imgs/grid-bg.png)] bg-cover bg-no-repeat">
//                     </div>
//                 </div>
//             </footer>
//         </>
//     );
// };
