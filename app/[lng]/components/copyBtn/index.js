'use client';
import ShowTooltip from '../showTooltip';
import { useState } from 'react';
export default function CopyBtn({ textToCopy = '' }) {
    const [isCopy, setIsCopy] = useState(false);
    const handleCopy = () => {
        if (isCopy) return;
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.top = '-999px';
        textarea.style.left = '-999px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        try {
            textarea.select();
            textarea.setSelectionRange(0, textToCopy.length);
            const success = document.execCommand('copy');
            if (success) {
                setIsCopy(true);
                const timer = setTimeout(() => {
                    setIsCopy(false);
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
    return <>
        <ShowTooltip desc={isCopy ? 'Copied' : 'Copy'}>
            <button className='w-[64px] h-[64px] border border-[#505050] bg-[#0A0A0A] text-white hover:!border-white ease-out duration-200 cursor-pointer flex justify-center items-center' onClick={handleCopy}>
                {
                    isCopy ?
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8.29199 12.0966L11.863 15.6677C12.0464 15.851 12.343 15.851 12.5255 15.6677L19.9997 8.19434" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.3175 8.19434L12.1953 11.3165" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12.4873L7.18099 15.6683C7.36434 15.8516 7.66013 15.8516 7.84348 15.6683L9.85344 13.6583" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        :
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.16541 3.35845C4.83175 2.64262 5.77465 2.25 6.86577 2.25H12.0629C13.025 2.25 13.8731 2.5522 14.5195 3.11903C15.1637 3.6838 15.5606 4.46991 15.6984 5.35832C15.7618 5.76764 15.4815 6.15091 15.0721 6.21436C14.6628 6.27782 14.2795 5.99744 14.2161 5.58812C14.1249 5.00011 13.8759 4.54961 13.5306 4.24688C13.1877 3.9462 12.7031 3.75 12.0629 3.75H6.86577C6.14762 3.75 5.61759 3.99992 5.26333 4.38049C4.90357 4.76696 4.66992 5.34859 4.66992 6.10048V12.7954C4.66992 13.4804 4.86476 14.0248 5.17102 14.4061C5.47245 14.7814 5.91556 15.0423 6.50728 15.1157C6.91835 15.1667 7.21026 15.5413 7.15928 15.9523C7.1083 16.3634 6.73374 16.6553 6.32268 16.6043C5.3646 16.4855 4.56018 16.041 4.00153 15.3454C3.44772 14.6559 3.16992 13.7641 3.16992 12.7954V6.10048C3.16992 5.03698 3.50456 4.06837 4.16541 3.35845Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.2397 8.46944C9.90625 7.75453 10.8492 7.36328 11.94 7.36328H17.1354C18.2287 7.36328 19.1721 7.75418 19.8384 8.46985C20.499 9.17946 20.8312 10.1474 20.8312 11.2094V17.9043C20.8312 18.9663 20.499 19.9342 19.8382 20.6439C19.1718 21.3596 18.2282 21.7504 17.1345 21.7504H11.94C10.8466 21.7504 9.90328 21.3595 9.23702 20.6438C8.57641 19.9342 8.24414 18.9663 8.24414 17.9043V11.2094C8.24414 10.1463 8.57857 9.17854 9.2397 8.46944ZM10.3368 9.49234C9.97756 9.87767 9.74414 10.4579 9.74414 11.2094V17.9043C9.74414 18.6568 9.97666 19.2369 10.3349 19.6217C10.6875 20.0005 11.2171 20.2504 11.94 20.2504H17.1345C17.858 20.2504 18.3878 20.0004 18.7404 19.6217C19.0987 19.2369 19.3312 18.6568 19.3312 17.9043V11.2094C19.3312 10.4569 19.0987 9.87675 18.7405 9.49193C18.3879 9.11318 17.8583 8.86328 17.1354 8.86328H11.94C11.2207 8.86328 10.6907 9.11283 10.3368 9.49234Z" fill="white" />
                        </svg>
                }
            </button>
        </ShowTooltip>
    </>
}

