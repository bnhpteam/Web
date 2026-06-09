'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

// NPH Token Distribution: 200,000,000 total supply
// Black-gold color palette only — no blue/pink/green
const TOKEN_ALLOCATIONS = [
    {
        label: 'Public Sale',
        percent: 20,
        amount: '40,000,000',
        color: '#F6EFC5',
        gradFrom: '#FFFFFF',
        gradTo: '#C6AC6F',
        sideColor: '#8B7840',
        desc: 'Two-round public offering. Round 1 at $0.15, Round 2 at $0.35. Total raise target $10M USDT/USDC.',
        vesting: '20% TGE + 6-month linear vesting (both rounds)'
    },
    {
        label: 'Ecosystem & Rewards',
        percent: 20,
        amount: '40,000,000',
        color: '#C6AC6F',
        gradFrom: '#E8D898',
        gradTo: '#A08840',
        sideColor: '#6B5C2A',
        desc: 'User incentives, staking rewards, and in-app activity mining across the BNHP platform.',
        vesting: 'Released based on protocol milestones'
    },
    {
        label: 'Team & Advisors',
        percent: 15,
        amount: '30,000,000',
        color: '#8B7A4F',
        gradFrom: '#B09A6A',
        gradTo: '#5C4E2E',
        sideColor: '#3A3020',
        desc: '12-month cliff, 48-month linear vesting. Aligns long-term team incentives.',
        vesting: '12-month cliff, 48-month linear vesting'
    },
    {
        label: 'Reserve & Treasury',
        percent: 15,
        amount: '30,000,000',
        color: '#6B6050',
        gradFrom: '#8A7A68',
        gradTo: '#3A3028',
        sideColor: '#252018',
        desc: 'Protocol reserve for future development, partnerships, and emergency fund.',
        vesting: '24-month lock, then quarterly release'
    },
    {
        label: 'Seed Round',
        percent: 10,
        amount: '20,000,000',
        color: '#A08C5B',
        gradFrom: '#C8B07A',
        gradTo: '#6A5C38',
        sideColor: '#453C25',
        desc: 'Early strategic investors with 6-month cliff and 18-month linear vesting.',
        vesting: '6-month cliff, 18-month linear vesting'
    },
    {
        label: 'Liquidity & Market',
        percent: 12,
        amount: '24,000,000',
        color: '#D4C08A',
        gradFrom: '#EAD8A8',
        gradTo: '#A89050',
        sideColor: '#706030',
        desc: 'DEX/CEX liquidity provision, market-making, and exchange listing reserves.',
        vesting: '30% TGE, remainder over 12 months'
    },
    {
        label: 'Community & Airdrop',
        percent: 8,
        amount: '16,000,000',
        color: '#4A4030',
        gradFrom: '#6A5A48',
        gradTo: '#2A2018',
        sideColor: '#1A1410',
        desc: 'Community campaigns, airdrops, early adopter rewards, and ambassador programs.',
        vesting: 'Distributed over 18 months via campaigns'
    },
];

// Public Sale — Final confirmed version
const PUBLIC_SALE_ROUNDS = [
    {
        round: 'Round 1',
        label: 'Public Sale',
        tokens: '20,000,000',
        percent: '10%',
        price: '$0.15',
        raise: '$3,000,000',
        softCap: null,
        hardCap: null,
        desc: 'First-round public sale at $0.15 per $NPH. 20% unlocked at TGE, remaining 80% released linearly over 6 months.',
        color: '#C6AC6F',
        vesting: '20% TGE + 6-month linear vesting',
    },
    {
        round: 'Round 2',
        label: 'Public Sale',
        tokens: '20,000,000',
        percent: '10%',
        price: '$0.35',
        raise: '$7,000,000',
        softCap: null,
        hardCap: null,
        desc: 'Second-round public sale at $0.35 per $NPH. 20% unlocked at TGE, remaining 80% released linearly over 6 months.',
        color: '#F6EFC5',
        vesting: '20% TGE + 6-month linear vesting',
    },
];

const TOKEN_STATS = [
    { label: 'Token Name', value: '$NPH' },
    { label: 'Total Supply', value: '200,000,000' },
    { label: 'Standard', value: 'OFT (LayerZero V2)' },
    { label: 'Networks', value: 'ETH · BNB · ARB · Base' },
    { label: 'R1 Price', value: '$0.15 / NPH' },
    { label: 'R2 Price', value: '$0.35 / NPH' },
    { label: 'CA (ETH)', value: '0xb000...1d0000' },
];

// Coin-style 3D donut chart using SVG with perspective depth rings
function CoinDonutChart({ allocations, size = 320, activeIdx, onHover }) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.40;
    const innerR = size * 0.245;
    // Coin depth: draw a slightly offset copy below for 3D thickness
    const depth = 10; // px of coin thickness

    let cumulative = 0;
    const segments = allocations.map((alloc, idx) => {
        const startAngle = (cumulative / 100) * 360 - 90;
        cumulative += alloc.percent;
        const endAngle = (cumulative / 100) * 360 - 90;
        const midAngle = (startAngle + endAngle) / 2;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const midRad = (midAngle * Math.PI) / 180;

        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);
        const ix1 = cx + innerR * Math.cos(startRad);
        const iy1 = cy + innerR * Math.sin(startRad);
        const ix2 = cx + innerR * Math.cos(endRad);
        const iy2 = cy + innerR * Math.sin(endRad);
        const largeArc = alloc.percent > 50 ? 1 : 0;
        const path = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;

        // Offset path for coin side (bottom face)
        const ox1 = x1, oy1 = y1 + depth;
        const ox2 = x2, oy2 = y2 + depth;
        const oix1 = ix1, oiy1 = iy1 + depth;
        const oix2 = ix2, oiy2 = iy2 + depth;
        const pathBottom = `M ${ox1} ${oy1} A ${r} ${r} 0 ${largeArc} 1 ${ox2} ${oy2} L ${oix2} ${oiy2} A ${innerR} ${innerR} 0 ${largeArc} 0 ${oix1} ${oiy1} Z`;

        // Side face: connect top and bottom outer edges (only bottom half for visible side)
        // Only render side for segments in the bottom half (midAngle > 0 means below center)
        const showSide = Math.sin(midRad) > -0.3;
        const sidePath = showSide
            ? `M ${x1} ${y1} L ${ox1} ${oy1} A ${r} ${r} 0 ${largeArc} 1 ${ox2} ${oy2} L ${x2} ${y2} A ${r} ${r} 0 ${largeArc} 0 ${x1} ${y1} Z`
            : null;
        const innerSidePath = showSide
            ? `M ${ix1} ${iy1} L ${oix1} ${oiy1} A ${innerR} ${innerR} 0 ${largeArc} 1 ${oix2} ${oiy2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1} Z`
            : null;

        const midX = cx + (r + innerR) / 2 * Math.cos(midRad);
        const midY = cy + (r + innerR) / 2 * Math.sin(midRad);

        return { ...alloc, path, pathBottom, sidePath, innerSidePath, idx, midRad, midX, midY };
    });

    return (
        <svg width={size} height={size + depth + 10} viewBox={`0 0 ${size} ${size + depth + 10}`} style={{ overflow: 'visible' }}>
            <defs>
                {segments.map((seg, idx) => (
                    <linearGradient key={`topgrad-${idx}`} id={`topgrad-${idx}`} x1="20%" y1="10%" x2="80%" y2="90%">
                        <stop offset="0%" stopColor={seg.gradFrom} />
                        <stop offset="100%" stopColor={seg.gradTo} />
                    </linearGradient>
                ))}
                {/* Specular highlight for coin top */}
                <radialGradient id="coinHighlight" cx="38%" cy="28%" r="55%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
                    <stop offset="60%" stopColor="rgba(255,255,255,0.06)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                {/* Center hole gradient */}
                <radialGradient id="holeGrad" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#1C1C1C" />
                    <stop offset="100%" stopColor="#0B0B0B" />
                </radialGradient>
                {/* Outer rim gradient */}
                <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(198,172,111,0.5)" />
                    <stop offset="100%" stopColor="rgba(198,172,111,0.1)" />
                </linearGradient>
                <filter id="coinShadow">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.6" />
                </filter>
                <filter id="segGlow">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#C6AC6F" floodOpacity="0.4" />
                </filter>
            </defs>

            {/* Overall coin drop shadow */}
            <g filter="url(#coinShadow)">
                {/* Bottom face (coin underside) */}
                {segments.map((seg, idx) => (
                    <path key={`bot-${idx}`} d={seg.pathBottom} fill={seg.sideColor} opacity="0.9" stroke="#0B0B0B" strokeWidth="0.5" />
                ))}
                {/* Inner hole bottom */}
                <circle cx={cx} cy={cy + depth} r={innerR - 1} fill="#080808" />
            </g>

            {/* Side faces (coin thickness) */}
            {segments.map((seg, idx) => (
                seg.sidePath && (
                    <path key={`side-${idx}`} d={seg.sidePath}
                        fill={seg.sideColor}
                        opacity={activeIdx === null || activeIdx === idx ? 0.95 : 0.3}
                        stroke="#0B0B0B" strokeWidth="0.5"
                        style={{ transition: 'opacity 0.3s' }}
                    />
                )
            ))}
            {/* Inner side faces */}
            {segments.map((seg, idx) => (
                seg.innerSidePath && (
                    <path key={`innerside-${idx}`} d={seg.innerSidePath}
                        fill="#111"
                        opacity={activeIdx === null || activeIdx === idx ? 0.8 : 0.2}
                        stroke="#0B0B0B" strokeWidth="0.5"
                        style={{ transition: 'opacity 0.3s' }}
                    />
                )
            ))}

            {/* Top face segments */}
            {segments.map((seg, idx) => {
                const isHovered = activeIdx === idx;
                return (
                    <g key={`top-${idx}`}
                        style={{
                            transformOrigin: `${seg.midX}px ${seg.midY}px`,
                            transform: isHovered ? 'scale(1.045)' : 'scale(1)',
                            transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                            filter: isHovered ? 'url(#segGlow)' : 'none',
                        }}
                        className="cursor-pointer"
                        onMouseEnter={() => onHover(idx)}
                        onMouseLeave={() => onHover(null)}
                    >
                        <path
                            d={seg.path}
                            fill={`url(#topgrad-${idx})`}
                            opacity={activeIdx === null || isHovered ? 1 : 0.45}
                            stroke="#0B0B0B"
                            strokeWidth="1.5"
                            style={{ transition: 'opacity 0.3s' }}
                        />
                    </g>
                );
            })}

            {/* Specular highlight overlay (coin shine) */}
            {segments.map((seg, idx) => (
                <path key={`shine-${idx}`} d={seg.path} fill="url(#coinHighlight)" opacity="1" style={{ pointerEvents: 'none' }} />
            ))}

            {/* Outer rim ring */}
            <circle cx={cx} cy={cy} r={r + 2} fill="none" stroke="url(#rimGrad)" strokeWidth="2.5" style={{ pointerEvents: 'none' }} />
            <circle cx={cx} cy={cy} r={r + 5} fill="none" stroke="rgba(198,172,111,0.08)" strokeWidth="1" strokeDasharray="3 5" style={{ pointerEvents: 'none' }} />

            {/* Center hole top */}
            <circle cx={cx} cy={cy} r={innerR - 1} fill="url(#holeGrad)" stroke="rgba(198,172,111,0.15)" strokeWidth="1" style={{ pointerEvents: 'none' }} />

            {/* Center text */}
            {activeIdx !== null ? (
                <>
                    <text x={cx} y={cy - 12} textAnchor="middle" fill={segments[activeIdx].color} fontSize="20" fontWeight="800" fontFamily="Orbitron, sans-serif">
                        {segments[activeIdx].percent}%
                    </text>
                    <text x={cx} y={cy + 6} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="Poppins, sans-serif">
                        {segments[activeIdx].label.split(' ').map((word, i) => (
                            <tspan key={i} x={cx} dy={i === 0 ? 0 : 10}>{word}</tspan>
                        ))}
                    </text>
                </>
            ) : (
                <>
                    <text x={cx} y={cy - 8} textAnchor="middle" fill="#C6AC6F" fontSize="17" fontWeight="800" fontFamily="Orbitron, sans-serif">$NPH</text>
                    <text x={cx} y={cy + 9} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="Poppins, sans-serif">200M Supply</text>
                </>
            )}
        </svg>
    );
}

export default function Mod6() {
    const [activeIdx, setActiveIdx] = useState(null);
    const [activeRound, setActiveRound] = useState(null);
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const activeAlloc = activeIdx !== null ? TOKEN_ALLOCATIONS[activeIdx] : null;

    return (
        <>
            <div ref={sectionRef} className='relative w-full max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base text-white border border-b-0 border-[#2B2B2B] relative overflow-hidden bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat">
                    <Pagination page='04' title='TOKENOMICS' desc='$NPH' />

                    <div className='w-full p-[40px] max-qw:p-5'>
                        {/* Section Header */}
                        <div className='flex items-start justify-between mb-10 max-bw:flex-col max-bw:gap-4'>
                            <div>
                                <div className='text-[11px] text-[#C6AC6F] tracking-[4px] mb-3 uppercase'>Token Distribution</div>
                                <h2 className='text-[36px] font-semibold max-qw:text-[24px]'>
                                    <HyperText>$NPH Token</HyperText>
                                </h2>
                                <p className='text-[14px] text-[rgba(255,255,255,0.4)] mt-2 max-w-[400px] leading-relaxed'>
                                    NPH is the native utility token of the BNHP ecosystem, powering governance, staking, and in-app rewards across the platform.
                                </p>
                            </div>
                            <div className='grid grid-cols-3 gap-3 max-qw:grid-cols-2'>
                                {TOKEN_STATS.map((stat, idx) => (
                                    <div key={idx} className='border border-[#2B2B2B] bg-[#111111] px-4 py-3 min-w-[120px]'>
                                        <div className='text-[10px] text-[rgba(255,255,255,0.3)] uppercase tracking-widest mb-1'>{stat.label}</div>
                                        <div className='text-[14px] text-[#C6AC6F] font-semibold'>{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chart + Legend */}
                        <div className='flex gap-10 items-center max-bw:flex-col'>
                            {/* Coin 3D Donut Chart */}
                            <div className='flex-shrink-0 flex flex-col items-center'>
                                <CoinDonutChart
                                    allocations={TOKEN_ALLOCATIONS}
                                    size={300}
                                    activeIdx={activeIdx}
                                    onHover={setActiveIdx}
                                />
                                {/* Active tooltip */}
                                <div className={`mt-2 border border-[#C6AC6F]/30 bg-[#C6AC6F]/5 p-4 w-[300px] transition-all duration-300 ${activeAlloc ? 'opacity-100' : 'opacity-0'}`}>
                                    {activeAlloc && (
                                        <>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <div className='w-3 h-3 rounded-full flex-shrink-0' style={{ backgroundColor: activeAlloc.color }} />
                                                <span className='text-[13px] text-white font-medium'>{activeAlloc.label}</span>
                                                <span className='ml-auto text-[13px] text-[#C6AC6F] font-bold'>{activeAlloc.percent}%</span>
                                            </div>
                                            <div className='text-[11px] text-[rgba(255,255,255,0.4)] leading-relaxed mb-2'>{activeAlloc.desc}</div>
                                            <div className='text-[10px] text-[#C6AC6F]/60 border-t border-[#2B2B2B] pt-2 mt-2'>
                                                <span className='text-[rgba(255,255,255,0.3)]'>Vesting: </span>{activeAlloc.vesting}
                                            </div>
                                        </>
                                    )}
                                    {!activeAlloc && <div className='text-[11px] text-[rgba(255,255,255,0.3)] text-center'>Hover a segment for details</div>}
                                </div>
                            </div>

                            {/* Allocation Bars */}
                            <div className='flex-1 w-full space-y-3'>
                                {TOKEN_ALLOCATIONS.map((alloc, idx) => (
                                    <div
                                        key={idx}
                                        className={`cursor-pointer transition-all duration-200 ${activeIdx === idx ? 'opacity-100' : activeIdx !== null ? 'opacity-40' : 'opacity-100'}`}
                                        onMouseEnter={() => setActiveIdx(idx)}
                                        onMouseLeave={() => setActiveIdx(null)}
                                    >
                                        <div className='flex items-center justify-between mb-1'>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-2 h-2 rounded-full flex-shrink-0' style={{ backgroundColor: alloc.color }} />
                                                <span className='text-[13px] text-[rgba(255,255,255,0.7)]'>{alloc.label}</span>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='text-[12px] text-[rgba(255,255,255,0.4)] font-mono'>{alloc.amount}</span>
                                                <span className='text-[13px] text-[#C6AC6F] font-semibold w-[36px] text-right'>{alloc.percent}%</span>
                                            </div>
                                        </div>
                                        <div className='w-full h-[4px] bg-[#1A1A1A] rounded-full overflow-hidden'>
                                            <div
                                                className='h-full rounded-full transition-all duration-700'
                                                style={{
                                                    width: visible ? `${alloc.percent}%` : '0%',
                                                    background: `linear-gradient(90deg, ${alloc.gradFrom}, ${alloc.gradTo})`,
                                                    transitionDelay: `${idx * 80}ms`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Public Sale Rounds */}
                        <div className='mt-10'>
                            <div className='text-[11px] text-[#C6AC6F] uppercase tracking-widest mb-5'>Public Sale — Two Rounds</div>
                            <div className='grid grid-cols-2 max-qw:grid-cols-1 gap-4'>
                                {PUBLIC_SALE_ROUNDS.map((round, idx) => (
                                    <div
                                        key={idx}
                                        className={`border p-5 cursor-pointer transition-all duration-300 ${activeRound === idx ? 'border-[#C6AC6F] bg-[#C6AC6F]/8' : 'border-[#2B2B2B] bg-[#111111] hover:border-[#C6AC6F]/40'}`}
                                        onMouseEnter={() => setActiveRound(idx)}
                                        onMouseLeave={() => setActiveRound(null)}
                                    >
                                        <div className='flex items-center justify-between mb-3'>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-2 h-2 rounded-full' style={{ backgroundColor: round.color }} />
                                                <span className='text-[11px] tracking-widest uppercase text-[rgba(255,255,255,0.4)]'>{round.round}</span>
                                            </div>
                                            <span className='text-[10px] px-2 py-0.5 border border-[#C6AC6F]/20 text-[#C6AC6F]/50'>{round.round}</span>
                                        </div>
                                        <div className='text-[26px] font-bold mb-1' style={{ color: round.color, fontFamily: 'Orbitron, sans-serif' }}>{round.price}</div>
                                        <div className='text-[12px] text-[rgba(255,255,255,0.4)] mb-4'>per $NPH token</div>
                                        <div className='grid grid-cols-2 gap-3 text-[12px]'>
                                            <div>
                                                <div className='text-[rgba(255,255,255,0.3)] mb-0.5'>Tokens</div>
                                                <div className='text-white font-mono'>{round.tokens}</div>
                                            </div>
                                            <div>
                                                <div className='text-[rgba(255,255,255,0.3)] mb-0.5'>Allocation</div>
                                                <div className='text-white font-mono'>{round.percent}</div>
                                            </div>
                                            <div>
                                                <div className='text-[rgba(255,255,255,0.3)] mb-0.5'>Target Raise</div>
                                                <div className='text-[#C6AC6F] font-semibold'>{round.raise}</div>
                                            </div>
                                            {round.softCap && (
                                                <div>
                                                    <div className='text-[rgba(255,255,255,0.3)] mb-0.5'>Soft Cap</div>
                                                    <div className='text-white font-mono'>{round.softCap}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className='mt-4 pt-3 border-t border-[#2B2B2B]'>
                                            <div className='text-[10px] text-[rgba(255,255,255,0.3)] mb-1'>Vesting</div>
                                            <div className='text-[11px] text-[rgba(255,255,255,0.5)]'>{round.vesting}</div>
                                        </div>
                                        <div className='mt-3 text-[11px] text-[rgba(255,255,255,0.3)]'>{round.desc}</div>
                                    </div>
                                ))}
                            </div>
                            {/* Total raise */}
                            <div className='mt-4 border border-[#2B2B2B] bg-[#111111] p-4 flex items-center justify-between max-qw:flex-col max-qw:gap-2 max-qw:items-start'>
                                <div className='text-[12px] text-[rgba(255,255,255,0.4)]'>Total Public Sale Target</div>
                                <div className='text-[18px] font-bold text-[#C6AC6F]' style={{ fontFamily: 'Orbitron, sans-serif' }}>$10,000,000 USDT / USDC</div>
                            </div>
                        </div>

                        {/* Vesting Schedule */}
                        <div className='mt-6 border border-[#2B2B2B] bg-[#111111] p-6'>
                            <div className='text-[11px] text-[#C6AC6F] uppercase tracking-widest mb-4'>Vesting Schedule</div>
                            <div className='grid grid-cols-4 gap-4 max-bw:grid-cols-2 max-qw:grid-cols-1 text-[12px] text-[rgba(255,255,255,0.5)]'>
                                <div><span className='text-white block mb-1'>Public Sale R1</span>20% TGE + 6-month linear vesting</div>
                                <div><span className='text-white block mb-1'>Public Sale R2</span>20% TGE + 6-month linear vesting</div>
                                <div><span className='text-white block mb-1'>Seed Round</span>6-month cliff, 18-month linear</div>
                                <div><span className='text-white block mb-1'>Team & Advisors</span>12-month cliff, 48-month linear</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
