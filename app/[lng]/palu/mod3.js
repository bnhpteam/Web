'use client';
import { motion } from 'framer-motion';
import Pagination from '../components/pagination';
import BorderStrokeAnm from '../components/borderStorkeAnm';
import ShowTooltip from '../components/showTooltip';
import { useState } from 'react';
import { HyperText } from "@/components/ui/hyper-text";
import { linkUrl } from '@/config/';

const navList = [
    {
        title: 'TASK 1',
        desc: 'Follow an X account',
        url: linkUrl.followAccount,
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <circle cx="12.0049" cy="9.87916" r="2.37599" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5069 11.0046L17.0071 11.2934" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5069 8.00338L17.0071 7.71457" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.00303 7.71457L7.50324 8.00338" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.50324 11.0046L7.00303 11.2934" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M8.00342 16.9599V16.7952C8.00911 15.5333 9.03069 14.5117 10.2926 14.506H13.7175C14.9795 14.5117 16.0011 15.5333 16.0068 16.7952V16.9599C16.0062 17.2619 15.7615 17.5067 15.4594 17.5072H8.55075C8.2487 17.5067 8.00399 17.2619 8.00342 16.9599Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="12.0052" cy="12.005" r="9.00375" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    },
    {
        title: 'TASK 2',
        desc: 'Repost an X post',
        url: linkUrl.repostTweet,
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.20472 5.4039C3.6916 4.64737 4.23352 3.625 5.14764 3.625H8.7938C9.36514 3.625 9.89934 3.90816 10.2201 4.381L19.8841 18.6293C20.3972 19.3858 19.8553 20.4082 18.9412 20.4082H15.295C14.7237 20.4082 14.1895 20.125 13.8688 19.6522L4.20472 5.4039ZM5.82803 5.125L15.1102 18.8102C15.1517 18.8715 15.221 18.9082 15.295 18.9082H18.2608L8.97866 5.22299C8.93709 5.1617 8.86785 5.125 8.7938 5.125H5.82803Z"
                fill="white"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9455 12.8704C11.2564 13.1441 11.2866 13.618 11.0129 13.9289L5.23189 20.4956C4.95819 20.8065 4.48427 20.8366 4.17337 20.5629C3.86247 20.2892 3.83232 19.8153 4.10602 19.5044L9.887 12.9378C10.1607 12.6269 10.6346 12.5967 10.9455 12.8704Z"
                fill="white"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.2527 3.43707C19.5636 3.71078 19.5937 4.18469 19.32 4.49559L13.8833 10.6712C13.6096 10.9821 13.1356 11.0123 12.8247 10.7386C12.5138 10.4649 12.4837 9.99094 12.7574 9.68004L18.1941 3.50443C18.4678 3.19352 18.9418 3.16337 19.2527 3.43707Z"
                fill="white"
            />
        </svg>


    },
    {
        title: 'TASK 3',
        desc: 'Buy and hold 20,000 BNHPAI Token',
        svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M14.6936 9.33942C14.7026 9.18201 14.7115 9.02361 14.7115 8.85724C14.7115 5.63838 12.1064 3.0332 8.88749 3.0332C5.6776 3.0332 3.06445 5.63838 3.06445 8.85724C3.06445 12.0671 5.6776 14.6803 8.88749 14.6803C9.05486 14.6803 9.21227 14.6713 9.36967 14.6633"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.9996 15.1443C20.9996 11.9284 18.3934 9.32227 15.1775 9.32227C11.9626 9.32227 9.35547 11.9284 9.35547 15.1443C9.35547 18.3602 11.9626 20.9664 15.1775 20.9664C18.3934 20.9664 20.9996 18.3602 20.9996 15.1443Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M3 16.3633C3.41543 18.3548 4.85799 20.0115 6.80366 20.68" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.7802 7.46906C20.3648 5.47758 18.9222 3.82082 16.9766 3.15234" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    },
]

export default function Mod3() {
    const [isCopyEvent3, setIsCopyEvent3] = useState(false);
    const token = `0xe6878a8863219b8fa9d449bcb4245e77944f4444`;
    const handleCopy = () => {
        if (isCopyEvent3) return;
        const textarea = document.createElement('textarea');
        textarea.value = token;
        textarea.style.position = 'fixed';
        textarea.style.top = '-999px';
        textarea.style.left = '-999px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        try {
            textarea.select();
            textarea.setSelectionRange(0, token.length);
            const success = document.execCommand('copy');
            if (success) {
                setIsCopyEvent3(true);
                const timer = setTimeout(() => {
                    setIsCopyEvent3(false);
                    clearTimeout(timer);
                }, 1500);
            } else {
                console.error('复制失败，请手动复制');
            }
        } catch (err) {
            console.error('复制操作出错:', err);
        } finally {
            document.body.removeChild(textarea);
        }
    };
    return (
        <>
            <motion.div
                className="relative pb-[120px] w-full max-yt:px-[var(--padx)] max-qw:!pb-0">
                <div className='w-base border border-t-0 border-[#2B2B2B] relative pt-[48px] max-qw:border-b-0'>
                    <Pagination className='!absolute top-0' page='02' title='TASK' total='02' />
                    <div className='w-full flex flex-col items-center text-white pt-[96px] pb-[40px] max-qw:pt-[48px]'>
                        <div className='text-[36px]'>
                            <HyperText>Task</HyperText>
                        </div>
                        <div className='w-full h-[426px] mt-[36px] flex max-qw:flex-col max-qw:h-fit'>
                            {
                                navList.map((x, i) => (
                                    <div key={i + 'lkjasdf'} className={`flex-1 h-full border border-[#2B2B2B] cursor-pointer first:border-l-0 last:border-r-0 relative group max-qw:h-fit max-qw:last:border-l-0 max-qw:last:border-t-0 max-qw:first:border-b-0 max-qw:first:border-r-0 ${i == 1 && 'border-l-0 border-r-0'}`}>
                                        <BorderStrokeAnm>
                                            <div className='w-full h-full max-qw:px-6 max-qw:py-4'>
                                                <div className='w-full h-full px-6 py-4 absolute top-1/2 left-1/2 -translate-1/2 -z-1 max-qw:hidden'>
                                                    <svg className='w-full h-full' width="360" height="360" viewBox="0 0 360 360" fill="none">
                                                        <path d="M337.571 126.765C309.201 98.628 279.859 69.5185 278.811 68.6205C252.837 48.416 218.554 46.9943 191.157 64.9538C190.259 65.5525 189.286 66.1512 188.313 66.8246C188.238 66.6001 188.088 66.4504 187.938 66.3008C202.759 51.4841 232.476 21.776 232.476 21.776C217.88 7.25869 198.792 0 179.78 0C160.767 0 141.455 7.33355 126.933 21.9257C98.6385 50.3617 69.3707 79.8453 68.3227 81.2671C50.4327 105.587 47.738 131.629 59.9392 159.167C61.8105 163.357 64.4306 167.249 66.6762 171.215C66.4516 171.364 66.5261 171.364 66.3015 171.514L21.9134 127.064H21.8385C-7.27951 156.248 -7.27951 203.467 21.8385 232.576C21.8385 232.576 81.4222 291.244 85.2397 293.864C110.016 310.925 142.128 311.299 167.429 294.986C168.776 294.163 170.049 293.34 171.321 292.591C171.471 292.741 171.546 292.891 171.695 293.04C156.874 307.857 127.232 337.565 127.232 337.565C156.35 366.749 203.508 366.675 232.626 337.64L291.087 278.373C311.222 252.332 312.42 217.685 294.081 190.371C293.632 189.698 293.182 188.95 292.659 188.276C292.808 188.127 292.958 187.977 293.108 187.902C307.854 202.644 337.571 232.352 337.571 232.352H337.646C366.764 203.168 366.689 155.874 337.496 126.765H337.571ZM220.649 171.888C226.039 174.133 231.054 177.725 235.022 182.589C245.576 195.161 246.1 214.393 236.294 227.787C234.872 229.733 233.15 231.529 231.354 233.25C217.656 247.019 203.958 260.788 190.184 274.482C189.361 275.305 188.463 276.054 187.639 276.802C202.236 255.774 203.957 233.774 199.84 216.039C196.098 218.134 192.056 219.631 187.714 220.454C185.394 225.842 181.801 230.855 176.935 234.896C164.285 245.373 145.272 245.971 131.723 236.094C130.152 234.971 128.73 233.624 127.307 232.277L85.2397 190.222C84.4912 189.473 83.7423 188.575 83.0686 187.528C101.033 199.725 120.571 204.215 141.829 200.1C142.353 200.025 142.877 199.875 143.401 199.725C141.38 196.059 139.883 191.943 138.984 187.678C130.9 184.385 124.538 178.398 120.196 169.643C113.684 156.548 115.181 143.677 123.34 131.629C124.388 130.057 125.735 128.636 127.157 127.289C141.305 113.071 155.527 98.8525 169.674 84.6345C170.423 83.961 171.246 83.2875 172.145 82.6889C168.701 88.0019 165.557 93.3899 163.237 99.2267C160.842 105.288 159.27 111.499 158.446 117.86C157.698 124.445 157.698 130.955 158.671 137.54C158.97 139.486 159.27 141.432 159.719 143.303C163.462 141.282 167.579 139.71 171.92 138.887C174.54 132.676 178.807 127.139 184.57 123.173C197.969 113.894 214.961 113.894 227.985 123.248C229.782 124.595 231.504 126.241 233.15 127.812L274.694 169.344C275.442 170.167 276.191 171.065 276.865 172.113C263.241 162.609 248.196 157.595 231.578 157.82C226.264 157.895 221.174 158.493 216.233 159.616C218.329 163.357 219.826 167.548 220.649 171.888Z" fill="#161616" />
                                                    </svg>
                                                </div>

                                                <div className='text-[12px] text-[#E3E3E3] opacity-[0.3] absolute top-5 left-1/2 -translate-1/2 max-qw:static max-qw:translate-0'>{x.title}</div>
                                                <div className='px-6 py-4 w-full h-full flex flex-col items-center justify-center'>
                                                    <div className='w-[48px] h-[48px] rounded-[4px] border border-[#444] bg-[#0A0A0A] shadow-[inset_0_0_16px_rgba(255,255,255,0.25)] flex justify-center items-center'>
                                                        {x.svg}
                                                    </div>
                                                    <div className='my-6 text-[20px] text-white text-center'>
                                                        {/* {x.desc} */}
                                                        <HyperText>{x.desc}</HyperText>
                                                    </div>
                                                    {i != 2 && x.url && (
                                                        <a href={x.url} target="_blank" className={`text-[14px] text-[#717171] ease-out duration-200 group-hover:text-white flex items-center ${i != 2 ? 'block' : 'hidden'}`}>
                                                            [&nbsp;&nbsp;GO&nbsp;&nbsp;COMPLETE&nbsp;&nbsp;<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path className='group-hover:stroke-white' d="M12.1667 10.1667V3.83337M12.1667 3.83337H5.83333M12.1667 3.83337L4 12" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>&nbsp;&nbsp;]
                                                        </a>
                                                    )}
                                                    <div className={`text-[14px] text-[#717171] ease-out duration-200 group-hover:text-white flex items-center cursor-pointer ${i == 2 ? 'block' : 'hidden'}`}>
                                                        <ShowTooltip desc={isCopyEvent3 ? 'Copied' : 'Copy'} className='!-top-9'>
                                                            <span onClick={handleCopy}>[&nbsp;&nbsp;COPY&nbsp;&nbsp;TOKEN&nbsp;&nbsp;]</span>
                                                        </ShowTooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </BorderStrokeAnm>
                                    </div>
                                ))
                            }
                        </div>
                        <a href={linkUrl.receive} target="_blank" className='border border-white text-[14px] cursor-pointer max-w-[320px] w-full h-[40px] flex items-center justify-center mt-[40px] group relative'>
                            <div className='w-0 h-full bg-white absolute top-0 left-0 ease-out duration-500 group-hover:!w-full -z-1' />
                            <span className='group-hover:!text-black ease-out duration-200 delay-100'>
                                <HyperText>Receive</HyperText>
                            </span>
                        </a>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

{/* <div className='w-full h-full absolute bottom-0 left-0 border-b border-l origin-bottom-left scale-0 border-white group-hover:!scale-100 ease-linear duration-400' />
                                <div className='w-full h-full absolute top-0 right-0 border-t border-r origin-top-right scale-0 border-white group-hover:!scale-100 ease-linear duration-400' />*/}