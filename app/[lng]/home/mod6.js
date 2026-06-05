'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

// NPH Token Distribution: 200,000,000 total supply
// Total: 20+20+15+15+10+12+8 = 100%
const TOKEN_ALLOCATIONS = [
    {
        label: 'Public Sale',
        percent: 20,
        amount: '40,000,000',
        color: '#C6AC6F',
        gradFrom: '#F6EFC5',
        gradTo: '#C6AC6F',
        desc: 'Two-round public offering. Soft cap $3M, hard cap $10M USDT/USDC.',
        vesting: '20% TGE unlock, 80% over 6 months'
    },
    {
        label: 'Ecosystem & Rewards',
        percent: 20,
        amount: '40,000,000',
        color: '#A8D8B0',
        gradFrom: '#C8EDD0',
        gradTo: '#5FAF72',
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
        desc: '12-month cliff, 48-month linear vesting. Aligns long-term team incentives.',
        vesting: '12-month cliff, 48-month linear vesting'
    },
    {
        label: 'Reserve & Treasury',
        percent: 15,
        amount: '30,000,000',
        color: '#7A8FA6',
        gradFrom: '#9AB5CC',
        gradTo: '#4A6880',
        desc: 'Protocol reserve for future development, partnerships, and emergency fund.',
        vesting: '24-month lock, then quarterly release'
    },
    {
        label: 'Seed Round',
        percent: 10,
        amount: '20,000,000',
        color: '#D4A0C0',
        gradFrom: '#ECC0DA',
        gradTo: '#A0608A',
        desc: 'Early strategic investors with 6-month cliff and 18-month linear vesting.',
        vesting: '6-month cliff, 18-month linear vesting'
    },
    {
        label: 'Liquidity & Market',
        percent: 12,
        amount: '24,000,000',
        color: '#A0C4D4',
        gradFrom: '#C0DCEA',
        gradTo: '#5090A8',
        desc: 'DEX/CEX liquidity provision, market-making, and exchange listing reserves.',
        vesting: '30% TGE, remainder over 12 months'
    },
    {
        label: 'Community & Airdrop',
        percent: 8,
        amount: '16,000,000',
        color: '#D4C08A',
        gradFrom: '#EAD8A8',
        gradTo: '#A89050',
        desc: 'Community campaigns, airdrops, early adopter rewards, and ambassador programs.',
        vesting: 'Distributed over 18 months via campaigns'
    },
];

// Public Sale two-round breakdown
const PUBLIC_SALE_ROUNDS = [
    {
        round: 'Round 1',
        label: 'Early Bird',
        tokens: '16,000,000',
        percent: '8%',
        price: '$0.375',
        raise: '$6,000,000',
        softCap: '$3,000,000',
        hardCap: '$6,000,000',
        bonus: '+15% bonus tokens',
        desc: 'Early access at a discounted price. Soft cap $3M, hard cap $6M.',
        color: '#C6AC6F',
    },
    {
        round: 'Round 2',
        label: 'Public',
        tokens: '24,000,000',
        percent: '12%',
        price: '$0.167',
        raise: '$4,000,000',
        softCap: null,
        hardCap: '$4,000,000',
        bonus: 'No lock-up',
        desc: 'Open public sale at listing price. No lock-up, immediate liquidity.',
        color: '#F6EFC5',
    },
];

const TOKEN_STATS = [
    { label: 'Token Name', value: '$NPH' },
    { label: 'Total Supply', value: '200,000,000' },
    { label: 'Network', value: 'Ethereum (ETH)' },
    { label: 'Standard', value: 'ERC-20' },
    { label: 'Hard Cap', value: '$10M USDT' },
    { label: 'Soft Cap', value: '$3M USDT' },
];

// 3D-style Donut Chart with SVG gradients and depth effects
function DonutChart3D({ allocations, size = 300, activeIdx, onHover }) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.40;
    const innerR = size * 0.25;
    const shadowOffset = 6;

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

        // Label position (midpoint of arc, outside)
        const labelR = r * 1.18;
        const lx = cx + labelR * Math.cos(midRad);
        const ly = cy + labelR * Math.sin(midRad);

        return { ...alloc, path, idx, midRad, lx, ly };
    });

    const isActive = activeIdx !== null;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
            <defs>
                {/* Radial gradient for each segment */}
                {segments.map((seg, idx) => (
                    <radialGradient key={`grad-${idx}`} id={`grad-${idx}`} cx="40%" cy="35%" r="65%">
                        <stop offset="0%" stopColor={seg.gradFrom} stopOpacity="1" />
                        <stop offset="100%" stopColor={seg.gradTo} stopOpacity="1" />
                    </radialGradient>
                ))}
                {/* Drop shadow filter */}
                <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
                </filter>
                {/* Inner glow */}
                <filter id="innerGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                {/* Highlight gradient for 3D top-light effect */}
                <radialGradient id="topLight" cx="40%" cy="25%" r="60%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                {/* Center gradient */}
                <radialGradient id="centerGrad" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#1A1A1A" />
                    <stop offset="100%" stopColor="#0B0B0B" />
                </radialGradient>
                {/* Outer ring gradient */}
                <radialGradient id="outerRing" cx="50%" cy="50%" r="50%">
                    <stop offset="85%" stopColor="transparent" />
                    <stop offset="100%" stopColor="rgba(198,172,111,0.15)" />
                </radialGradient>
            </defs>

            {/* Outer decorative ring */}
            <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="rgba(198,172,111,0.12)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx={cx} cy={cy} r={r + 14} fill="none" stroke="rgba(198,172,111,0.06)" strokeWidth="1" />

            {/* Shadow layer (offset segments for 3D depth) */}
            <g transform={`translate(${shadowOffset * 0.5}, ${shadowOffset})`} opacity="0.35">
                {segments.map((seg, idx) => (
                    <path key={`shadow-${idx}`} d={seg.path} fill="#000" />
                ))}
            </g>

            {/* Main segments */}
            {segments.map((seg, idx) => {
                const isHovered = activeIdx === idx;
                const scale = isHovered ? 1.04 : 1;
                const midX = cx + (r + innerR) / 2 * Math.cos(seg.midRad);
                const midY = cy + (r + innerR) / 2 * Math.sin(seg.midRad);
                return (
                    <g key={idx}
                        style={{
                            transformOrigin: `${midX}px ${midY}px`,
                            transform: `scale(${scale})`,
                            transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                            filter: isHovered ? 'url(#shadow3d)' : 'none',
                        }}
                        className="cursor-pointer"
                        onMouseEnter={() => onHover(idx)}
                        onMouseLeave={() => onHover(null)}
                    >
                        <path
                            d={seg.path}
                            fill={`url(#grad-${idx})`}
                            opacity={isActive && !isHovered ? 0.45 : 1}
                            stroke="#0B0B0B"
                            strokeWidth="1.5"
                            style={{ transition: 'opacity 0.3s' }}
                        />
                        {/* Top-light highlight overlay */}
                        <path
                            d={seg.path}
                            fill="url(#topLight)"
                            opacity={0.6}
                            style={{ pointerEvents: 'none' }}
                        />
                    </g>
                );
            })}

            {/* Center circle with gradient */}
            <circle cx={cx} cy={cy} r={innerR - 2} fill="url(#centerGrad)" stroke="rgba(198,172,111,0.2)" strokeWidth="1" />

            {/* Center content */}
            {activeIdx !== null ? (
                <>
                    <text x={cx} y={cy - 14} textAnchor="middle" fill={segments[activeIdx].color} fontSize="18" fontWeight="800" fontFamily="Orbitron, sans-serif">
                        {segments[activeIdx].percent}%
                    </text>
                    <text x={cx} y={cy + 4} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8.5" fontFamily="Poppins, sans-serif" fontWeight="500">
                        {segments[activeIdx].label.split(' ').map((word, i) => (
                            <tspan key={i} x={cx} dy={i === 0 ? 0 : 11}>{word}</tspan>
                        ))}
                    </text>
                </>
            ) : (
                <>
                    <text x={cx} y={cy - 10} textAnchor="middle" fill="#C6AC6F" fontSize="18" fontWeight="800" fontFamily="Orbitron, sans-serif">$NPH</text>
                    <text x={cx} y={cy + 8} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="Poppins, sans-serif">200M Supply</text>
                </>
            )}

            {/* Outer ring highlight */}
            <circle cx={cx} cy={cy} r={r + 1} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
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
                    <Pagination page='05' title='TOKENOMICS' desc='$NPH' />

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
                            {/* 3D Donut Chart */}
                            <div className='flex-shrink-0 flex flex-col items-center'>
                                <DonutChart3D
                                    allocations={TOKEN_ALLOCATIONS}
                                    size={300}
                                    activeIdx={activeIdx}
                                    onHover={setActiveIdx}
                                />
                                {/* Active tooltip */}
                                <div className={`mt-4 border border-[#C6AC6F]/30 bg-[#C6AC6F]/5 p-4 w-[300px] transition-all duration-300 ${activeAlloc ? 'opacity-100' : 'opacity-0'}`}>
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
                                            <span className='text-[11px] px-2 py-0.5 border border-[#C6AC6F]/30 text-[#C6AC6F]'>{round.bonus}</span>
                                        </div>
                                        <div className='text-[22px] font-bold mb-1' style={{ color: round.color, fontFamily: 'Orbitron, sans-serif' }}>{round.price}</div>
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
                                        <div className='mt-4 pt-3 border-t border-[#2B2B2B] text-[11px] text-[rgba(255,255,255,0.35)]'>{round.desc}</div>
                                    </div>
                                ))}
                            </div>
                            {/* Total raise bar */}
                            <div className='mt-4 border border-[#2B2B2B] bg-[#111111] p-4 flex items-center justify-between'>
                                <div className='text-[12px] text-[rgba(255,255,255,0.4)]'>Total Public Sale Target</div>
                                <div className='text-[18px] font-bold text-[#C6AC6F]' style={{ fontFamily: 'Orbitron, sans-serif' }}>$10,000,000 USDT/USDC</div>
                            </div>
                        </div>

                        {/* Vesting Schedule */}
                        <div className='mt-6 border border-[#2B2B2B] bg-[#111111] p-6'>
                            <div className='text-[11px] text-[#C6AC6F] uppercase tracking-widest mb-4'>Vesting Schedule</div>
                            <div className='grid grid-cols-4 gap-4 max-bw:grid-cols-2 max-qw:grid-cols-1 text-[12px] text-[rgba(255,255,255,0.5)]'>
                                <div><span className='text-white block mb-1'>Public Sale R1</span>20% TGE, 80% over 6 months</div>
                                <div><span className='text-white block mb-1'>Public Sale R2</span>100% TGE unlock, no lock-up</div>
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
