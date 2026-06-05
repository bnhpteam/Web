'use client';

// Partners / Ecosystem marquee strip
// Logos are rendered as inline SVG in white/gold — no brand colors used

const PARTNERS = [
    {
        name: 'Ethereum',
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L5 12.5L12 16L19 12.5L12 2Z" fill="currentColor" fillOpacity="0.9" />
                <path d="M5 12.5L12 16V22L5 12.5Z" fill="currentColor" fillOpacity="0.5" />
                <path d="M19 12.5L12 16V22L19 12.5Z" fill="currentColor" fillOpacity="0.7" />
                <path d="M12 2L5 12.5L12 10.5L19 12.5L12 2Z" fill="currentColor" fillOpacity="0.4" />
            </svg>
        ),
    },
    {
        name: 'BNB Chain',
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L14.5 5.5L12 8L9.5 5.5L12 3Z" fill="currentColor" />
                <path d="M7 8L9.5 10.5L7 13L4.5 10.5L7 8Z" fill="currentColor" />
                <path d="M17 8L19.5 10.5L17 13L14.5 10.5L17 8Z" fill="currentColor" />
                <path d="M12 13L14.5 10.5L17 13L14.5 15.5L12 13Z" fill="currentColor" />
                <path d="M12 13L9.5 10.5L7 13L9.5 15.5L12 13Z" fill="currentColor" />
                <path d="M12 16L14.5 18.5L12 21L9.5 18.5L12 16Z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: 'CoinMarketCap',
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.5 15V9.5L10.5 13L12 11L13.5 13L16.5 9.5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        name: 'CertiK',
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L20 7V12C20 16.4 16.4 20.4 12 21C7.6 20.4 4 16.4 4 12V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        name: 'Uniswap',
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 5C9.5 5 8 7 8 9C8 11 9.5 12 11 12C12.5 12 13 11 13 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M13 11C13 11 15 12 16 14C17 16 16 18.5 14 19.5C12 20.5 9.5 19.5 8.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="16" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13 11L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Chainlink',
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L14.5 4.5V7.5L12 9L9.5 7.5V4.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M12 15L14.5 16.5V19.5L12 21L9.5 19.5V16.5L12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M5 8L7.5 9.5V12.5L5 14L2.5 12.5V9.5L5 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M19 8L21.5 9.5V12.5L19 14L16.5 12.5V9.5L19 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M9.5 7.5L7.5 9.5M9.5 16.5L7.5 14.5M14.5 7.5L16.5 9.5M14.5 16.5L16.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Messari',
        svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 16V10L12 14L16 10V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

// Duplicate for seamless infinite scroll
const ALL = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function ModPartners() {
    return (
        <div className='relative max-yt:px-[var(--padx)]'>
            <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
            <div className='w-base border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] overflow-hidden'>
                {/* Top label row */}
                <div className='flex items-center justify-between px-[40px] pt-[28px] pb-[20px] max-qw:px-5'>
                    <div className='text-[10px] text-[rgba(255,255,255,0.25)] tracking-[4px] uppercase'>Ecosystem &amp; Partners</div>
                    <div className='text-[10px] text-[rgba(255,255,255,0.15)] tracking-[2px] uppercase'>Infrastructure</div>
                </div>

                {/* Marquee track */}
                <div className='relative overflow-hidden pb-[28px]'>
                    {/* Fade edges */}
                    <div className='pointer-events-none absolute left-0 top-0 bottom-0 w-[80px] z-10'
                        style={{ background: 'linear-gradient(to right, #0B0B0B, transparent)' }} />
                    <div className='pointer-events-none absolute right-0 top-0 bottom-0 w-[80px] z-10'
                        style={{ background: 'linear-gradient(to left, #0B0B0B, transparent)' }} />

                    <div className='flex gap-0 animate-marquee' style={{ width: 'max-content' }}>
                        {ALL.map((p, idx) => (
                            <div
                                key={idx}
                                className='flex items-center gap-3 px-8 py-3 border-r border-[#1E1E1E] group cursor-default select-none'
                                style={{ minWidth: 180 }}
                            >
                                <span
                                    className='text-[rgba(255,255,255,0.3)] group-hover:text-[#C6AC6F] transition-colors duration-300'
                                    style={{ flexShrink: 0 }}
                                >
                                    {p.svg}
                                </span>
                                <span className='text-[13px] font-medium tracking-wider text-[rgba(255,255,255,0.35)] group-hover:text-[rgba(255,255,255,0.75)] transition-colors duration-300 whitespace-nowrap uppercase' style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11px' }}>
                                    {p.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 3)); }
                }
                .animate-marquee {
                    animation: marquee 28s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
