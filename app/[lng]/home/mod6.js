'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

// NPH Token Distribution: 200,000,000 total supply
const TOKEN_ALLOCATIONS = [
    { label: 'Public Sale', percent: 25, amount: '50,000,000', color: '#C6AC6F', desc: 'Open to public via IDO/IEO. Target raise: $10M USDT/USDC.' },
    { label: 'Ecosystem & Rewards', percent: 20, amount: '40,000,000', color: '#F6EFC5', desc: 'User incentives, staking rewards, and in-app activity mining.' },
    { label: 'Team & Advisors', percent: 15, amount: '30,000,000', color: '#8B7A4F', desc: '4-year vesting, 12-month cliff. Aligns long-term team incentives.' },
    { label: 'Reserve & Treasury', percent: 15, amount: '30,000,000', color: '#5C5040', desc: 'Protocol reserve for future development and emergency fund.' },
    { label: 'Seed Round', percent: 10, amount: '20,000,000', color: '#A08C5B', desc: 'Early investors with 18-month vesting, 6-month cliff.' },
    { label: 'Liquidity & Market', percent: 10, amount: '20,000,000', color: '#3D3020', desc: 'DEX/CEX liquidity provision and market-making operations.' },
    { label: 'Community & Airdrop', percent: 5, amount: '10,000,000', color: '#D4C08A', desc: 'Community campaigns, airdrops, and early adopter rewards.' },
];

const TOKEN_STATS = [
    { label: 'Token Name', value: '$NPH' },
    { label: 'Total Supply', value: '200,000,000' },
    { label: 'Network', value: 'Ethereum (ETH)' },
    { label: 'Standard', value: 'ERC-20' },
    { label: 'Public Sale Target', value: '$10M USDT' },
    { label: 'TGE', value: '2026 Q4' },
];

// SVG Donut Chart
function DonutChart({ allocations, size = 280, activeIdx, onHover }) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;
    const innerR = size * 0.24;

    let cumulative = 0;
    const segments = allocations.map((alloc, idx) => {
        const startAngle = (cumulative / 100) * 360 - 90;
        cumulative += alloc.percent;
        const endAngle = (cumulative / 100) * 360 - 90;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
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
        return { ...alloc, path, idx };
    });

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {segments.map((seg, idx) => (
                <path
                    key={idx}
                    d={seg.path}
                    fill={seg.color}
                    opacity={activeIdx === null || activeIdx === idx ? 1 : 0.3}
                    stroke="#0B0B0B"
                    strokeWidth="2"
                    className="cursor-pointer transition-opacity duration-300"
                    onMouseEnter={() => onHover(idx)}
                    onMouseLeave={() => onHover(null)}
                />
            ))}
            {/* Center text */}
            <text x={cx} y={cy - 10} textAnchor="middle" fill="#C6AC6F" fontSize="20" fontWeight="700" fontFamily="Orbitron, sans-serif">NPH</text>
            <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Poppins, sans-serif">200M Total</text>
        </svg>
    );
}

export default function Mod6() {
    const [activeIdx, setActiveIdx] = useState(null);
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
                            {/* Donut Chart */}
                            <div className='flex-shrink-0 flex flex-col items-center'>
                                <DonutChart
                                    allocations={TOKEN_ALLOCATIONS}
                                    size={280}
                                    activeIdx={activeIdx}
                                    onHover={setActiveIdx}
                                />
                                {/* Active tooltip */}
                                <div className={`mt-4 border border-[#C6AC6F]/30 bg-[#C6AC6F]/5 p-4 w-[280px] transition-all duration-300 ${activeAlloc ? 'opacity-100' : 'opacity-0'}`}>
                                    {activeAlloc && (
                                        <>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <div className='w-3 h-3 rounded-full' style={{ backgroundColor: activeAlloc.color }} />
                                                <span className='text-[13px] text-white font-medium'>{activeAlloc.label}</span>
                                            </div>
                                            <div className='text-[11px] text-[rgba(255,255,255,0.4)] leading-relaxed'>{activeAlloc.desc}</div>
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
                                                    backgroundColor: alloc.color,
                                                    transitionDelay: `${idx * 80}ms`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vesting Schedule Note */}
                        <div className='mt-10 border border-[#2B2B2B] bg-[#111111] p-6'>
                            <div className='text-[11px] text-[#C6AC6F] uppercase tracking-widest mb-4'>Vesting Schedule</div>
                            <div className='grid grid-cols-4 gap-4 max-bw:grid-cols-2 max-qw:grid-cols-1 text-[13px] text-[rgba(255,255,255,0.5)]'>
                                <div><span className='text-white'>Public Sale:</span> 20% TGE unlock, 80% over 6 months</div>
                                <div><span className='text-white'>Seed Round:</span> 6-month cliff, 18-month linear vesting</div>
                                <div><span className='text-white'>Team:</span> 12-month cliff, 48-month linear vesting</div>
                                <div><span className='text-white'>Ecosystem:</span> Released based on protocol milestones</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
