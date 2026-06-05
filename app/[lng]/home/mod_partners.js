'use client';

// Partners marquee — uses official SVG logos via <img> with CSS filter to remove brand colors
// All logos rendered in white (opacity 0.35), hover → gold (#C6AC6F)

const PARTNERS = [
    { name: 'Ethereum',      logo: '/assets/imgs/partners/ethereum.svg' },
    { name: 'BNB Chain',     logo: '/assets/imgs/partners/bnbchain.svg' },
    { name: 'CoinMarketCap', logo: '/assets/imgs/partners/coinmarketcap.svg' },
    { name: 'CertiK',        logo: '/assets/imgs/partners/certik.svg' },
    { name: 'Uniswap',       logo: '/assets/imgs/partners/uniswap.svg' },
    { name: 'Chainlink',     logo: '/assets/imgs/partners/chainlink.svg' },
    { name: 'Messari',       logo: '/assets/imgs/partners/messari.svg' },
];

// Triple for seamless infinite loop
const ALL = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function ModPartners() {
    return (
        <div className='relative max-yt:px-[var(--padx)]'>
            <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
            <div className='w-base border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] overflow-hidden'>

                {/* Label row */}
                <div className='flex items-center justify-between px-[40px] pt-[28px] pb-[20px] max-qw:px-5'>
                    <div className='text-[10px] text-[rgba(255,255,255,0.25)] tracking-[4px] uppercase'
                        style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        Ecosystem &amp; Partners
                    </div>
                    <div className='text-[10px] text-[rgba(255,255,255,0.15)] tracking-[2px] uppercase'
                        style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        Infrastructure
                    </div>
                </div>

                {/* Marquee */}
                <div className='relative overflow-hidden pb-[28px]'>
                    {/* Fade edges */}
                    <div className='pointer-events-none absolute left-0 top-0 bottom-0 w-[80px] z-10'
                        style={{ background: 'linear-gradient(to right, #0B0B0B, transparent)' }} />
                    <div className='pointer-events-none absolute right-0 top-0 bottom-0 w-[80px] z-10'
                        style={{ background: 'linear-gradient(to left, #0B0B0B, transparent)' }} />

                    <div className='partners-track flex gap-0' style={{ width: 'max-content' }}>
                        {ALL.map((p, idx) => (
                            <div
                                key={idx}
                                className='partner-item flex items-center gap-3 px-8 py-3 border-r border-[#1E1E1E] cursor-default select-none'
                                style={{ minWidth: 180 }}
                            >
                                {/* Official logo — CSS filter removes brand color → white */}
                                <img
                                    src={p.logo}
                                    alt={p.name}
                                    width={22}
                                    height={22}
                                    className='partner-logo flex-shrink-0 object-contain'
                                    style={{
                                        width: 22,
                                        height: 22,
                                        filter: 'brightness(0) invert(1)',
                                        opacity: 0.35,
                                        transition: 'opacity 0.3s, filter 0.3s',
                                    }}
                                />
                                <span
                                    className='partner-name whitespace-nowrap uppercase'
                                    style={{
                                        fontFamily: 'Orbitron, sans-serif',
                                        fontSize: '11px',
                                        letterSpacing: '0.12em',
                                        color: 'rgba(255,255,255,0.35)',
                                        transition: 'color 0.3s',
                                    }}
                                >
                                    {p.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes partners-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 3)); }
                }
                .partners-track {
                    animation: partners-scroll 32s linear infinite;
                }
                .partners-track:hover {
                    animation-play-state: paused;
                }
                .partner-item:hover .partner-logo {
                    filter: brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.85) !important;
                    opacity: 1 !important;
                }
                .partner-item:hover .partner-name {
                    color: #C6AC6F !important;
                }
            `}</style>
        </div>
    );
}
