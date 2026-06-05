'use client';
import { useState, useEffect } from 'react';

const COOKIE_KEY = 'bnhp_cookie_consent';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        try {
            const consent = localStorage.getItem(COOKIE_KEY);
            if (!consent) setVisible(true);
        } catch {
            setVisible(true);
        }
    }, []);

    const accept = () => {
        try { localStorage.setItem(COOKIE_KEY, 'accepted'); } catch {}
        setVisible(false);
    };

    const decline = () => {
        try { localStorage.setItem(COOKIE_KEY, 'declined'); } catch {}
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            className='fixed bottom-0 left-0 right-0 z-[9999] flex justify-center px-4 pb-4'
            style={{ pointerEvents: 'none' }}
        >
            <div
                className='w-full max-w-[900px] border border-[#2B2B2B] bg-[#0D0D0D] flex items-center justify-between gap-6 px-6 py-4 max-qw:flex-col max-qw:items-start max-qw:gap-3'
                style={{
                    pointerEvents: 'all',
                    boxShadow: '0 0 40px rgba(198,172,111,0.08), 0 -1px 0 #2B2B2B',
                }}
            >
                {/* Left: icon + text */}
                <div className='flex items-start gap-4 flex-1 min-w-0'>
                    {/* Cookie icon */}
                    <div className='flex-shrink-0 mt-0.5'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="8.5" stroke="#C6AC6F" strokeWidth="1.2" />
                            <circle cx="7" cy="8" r="1.2" fill="#C6AC6F" />
                            <circle cx="12" cy="7" r="0.9" fill="rgba(198,172,111,0.6)" />
                            <circle cx="13" cy="12" r="1.1" fill="#C6AC6F" />
                            <circle cx="8" cy="13" r="0.8" fill="rgba(198,172,111,0.5)" />
                            <circle cx="10.5" cy="10.5" r="0.7" fill="rgba(198,172,111,0.4)" />
                        </svg>
                    </div>
                    <div>
                        <div className='text-[11px] text-[#C6AC6F] tracking-[3px] uppercase mb-1' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            Cookie Notice
                        </div>
                        <p className='text-[12px] text-[rgba(255,255,255,0.45)] leading-relaxed'>
                            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                            By clicking <span className='text-[rgba(255,255,255,0.7)]'>Accept</span>, you consent to our use of cookies.
                            {' '}
                            <a href='/privacy' className='text-[#C6AC6F] hover:text-white underline underline-offset-2 transition-colors duration-200'>
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right: buttons */}
                <div className='flex items-center gap-3 flex-shrink-0 max-qw:w-full'>
                    <button
                        onClick={decline}
                        className='px-4 py-2 text-[11px] tracking-widest border border-[#2B2B2B] text-[rgba(255,255,255,0.35)] hover:text-white hover:border-[#444] transition-all duration-200 max-qw:flex-1'
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                        DECLINE
                    </button>
                    <button
                        onClick={accept}
                        className='px-5 py-2 text-[11px] tracking-widest bg-[#C6AC6F] text-[#000] font-semibold hover:bg-[#D4BC7F] transition-all duration-200 max-qw:flex-1'
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                        ACCEPT
                    </button>
                </div>
            </div>
        </div>
    );
}
