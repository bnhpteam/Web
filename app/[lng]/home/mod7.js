'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';

const ROADMAP = [
    {
        phase: '01',
        period: '2025 Q3 — Q4',
        title: 'Foundation',
        status: 'completed',
        items: [
            'Core team formation and legal entity setup',
            'BNHP concept design and whitepaper V1.0',
            'Seed round fundraising initiation',
            'Brand identity and website launch',
        ],
    },
    {
        phase: '02',
        period: '2026 Q1 — Q2',
        title: 'Development',
        status: 'completed',
        items: [
            'Seed round fundraising completed',
            'MVP architecture development',
            'Public sale legal compliance finalization',
            '$NPH ecosystem token testnet testing',
        ],
    },
    {
        phase: '03',
        period: '2026 Q3 — Q4',
        title: 'Public Sale',
        status: 'active',
        items: [
            '$NPH Token Generation Event (TGE) on Ethereum',
            '$NPH public sale — target $10M USDT/USDC',
            'BNHP App internal beta testing',
            'KOL & community expansion program',
        ],
    },
    {
        phase: '04',
        period: '2026 Q4 — 2027 Q1',
        title: 'DEX Listing & Ecosystem',
        status: 'upcoming',
        items: [
            'DEX listing post public sale & CEX listing pre-negotiations',
            '$NPH claim distribution',
            'Ecosystem grants program launch',
        ],
    },
    {
        phase: '05',
        period: '2027+',
        title: 'Scale & Govern',
        status: 'upcoming',
        items: [
            'DAO governance framework deployment',
            'Cross-chain bridge integration',
            'B2B API & SDK for enterprise partners',
            'Complete all whitepaper features and global expansion',
        ],
    },
];

const CFG = {
    completed: {
        label: 'COMPLETED',
        nodeColor: '#C6AC6F',
        nodeBg: '#0D0B08',
        lineColor: '#C6AC6F',
        textColor: '#C6AC6F',
        dotColor: '#C6AC6F',
        titleOpacity: 1,
        itemOpacity: 0.65,
        glow: '0 0 24px rgba(198,172,111,0.25)',
    },
    active: {
        label: 'IN PROGRESS',
        nodeColor: '#FFFFFF',
        nodeBg: '#0D0D0D',
        lineColor: '#FFFFFF',
        textColor: '#FFFFFF',
        dotColor: '#FFFFFF',
        titleOpacity: 1,
        itemOpacity: 0.7,
        glow: '0 0 32px rgba(255,255,255,0.12)',
    },
    upcoming: {
        label: 'UPCOMING',
        nodeColor: 'rgba(255,255,255,0.18)',
        nodeBg: '#080808',
        lineColor: '#2B2B2B',
        textColor: 'rgba(255,255,255,0.2)',
        dotColor: 'rgba(255,255,255,0.15)',
        titleOpacity: 0.35,
        itemOpacity: 0.25,
        glow: 'none',
    },
};

function PhaseCard({ item, isLeft, visible }) {
    const cfg = CFG[item.status];
    return (
        <div
            className='transition-all duration-700 ease-out'
            style={{
                opacity: visible ? 1 : 0,
                transform: visible
                    ? 'translateX(0)'
                    : isLeft ? 'translateX(-32px)' : 'translateX(32px)',
            }}
        >
            <div
                className='relative border border-[#1E1E1E] bg-[#0A0A0A] p-7 max-qw:p-5'
                style={{ boxShadow: cfg.glow }}
            >
                {/* Corner marks */}
                {[['top-0 left-0','M7 1H1V7'],['top-0 right-0','M1 1H7V7'],['bottom-0 left-0','M7 7H1V1'],['bottom-0 right-0','M1 7H7V1']].map(([pos, d], i) => (
                    <svg key={i} className={`absolute ${pos}`} width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d={d} stroke={cfg.nodeColor} strokeWidth="1" strokeOpacity="0.6"/>
                    </svg>
                ))}

                {/* Status + period row */}
                <div className='flex items-center justify-between mb-5'>
                    <div className='flex items-center gap-2'>
                        <div
                            className='w-[6px] h-[6px] rounded-full flex-shrink-0'
                            style={{
                                backgroundColor: cfg.dotColor,
                                boxShadow: item.status === 'active' ? `0 0 10px ${cfg.dotColor}` : 'none',
                            }}
                        />
                        <span
                            className='text-[9px] tracking-[3.5px]'
                            style={{ color: cfg.textColor, fontFamily: 'Orbitron, sans-serif' }}
                        >
                            {cfg.label}
                        </span>
                    </div>
                    <span
                        className='text-[10px] tracking-[1.5px]'
                        style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Orbitron, sans-serif' }}
                    >
                        {item.period}
                    </span>
                </div>

                {/* Title */}
                <div
                    className='text-[26px] font-light leading-tight mb-6 max-qw:text-[20px]'
                    style={{
                        color: '#FFFFFF',
                        opacity: cfg.titleOpacity,
                        fontFamily: 'Orbitron, sans-serif',
                        letterSpacing: '-0.02em',
                    }}
                >
                    {item.title}
                </div>

                {/* Divider */}
                <div className='w-full h-px mb-5' style={{ background: `linear-gradient(to right, ${cfg.nodeColor}40, transparent)` }} />

                {/* Items */}
                <ul className='space-y-3'>
                    {item.items.map((it, i) => (
                        <li key={i} className='flex items-start gap-3'>
                            <span
                                className='mt-[7px] w-[3px] h-[3px] flex-shrink-0'
                                style={{ backgroundColor: cfg.dotColor }}
                            />
                            <span
                                className='text-[12px] leading-relaxed'
                                style={{ color: '#FFFFFF', opacity: cfg.itemOpacity }}
                            >
                                {it}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function Mod7() {
    const itemRefs = useRef([]);
    const [visible, setVisible] = useState({});

    useEffect(() => {
        const observers = [];
        ROADMAP.forEach((_, idx) => {
            const el = itemRefs.current[idx];
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisible(prev => ({ ...prev, [idx]: true }));
                        obs.disconnect();
                    }
                },
                { threshold: 0.12 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    const completedCount = ROADMAP.filter(r => r.status === 'completed').length;
    const activeCount = ROADMAP.filter(r => r.status === 'active').length;
    const progressPct = Math.round(((completedCount + activeCount * 0.5) / ROADMAP.length) * 100);

    return (
        <div className='relative max-yt:px-[var(--padx)]'>
            <div className='w-screen h-full absolute top-0 left-0 -z-1 bg-[url(/assets/imgs/grid-bg.png)] bg-cover bg-no-repeat opacity-30' />
            <div className='w-base border border-[#2B2B2B] bg-[#080808] relative overflow-hidden'>
                <Pagination className='!absolute top-0' page='06' title='ROADMAP' />

                {/* Section header */}
                <div className='pt-[80px] pb-[48px] px-[60px] max-qw:px-5 max-qw:pt-[64px] max-qw:pb-[32px]'>
                    <div
                        className='text-[10px] tracking-[5px] uppercase mb-3'
                        style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Orbitron, sans-serif' }}
                    >
                        Development Timeline
                    </div>
                    <div className='flex items-end justify-between gap-6 flex-wrap'>
                        <h2
                            className='text-[44px] font-light leading-none max-qw:text-[30px]'
                            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '-0.03em' }}
                        >
                            <span className='text-white'>Road</span>
                            <span style={{ color: '#C6AC6F' }}>map</span>
                        </h2>
                        {/* Progress indicator */}
                        <div className='flex items-center gap-4 pb-1'>
                            <span
                                className='text-[10px] tracking-[3px]'
                                style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Orbitron, sans-serif' }}
                            >
                                PROGRESS
                            </span>
                            <div className='relative w-[140px] h-[2px] bg-[#1A1A1A] overflow-hidden'>
                                <div
                                    className='absolute left-0 top-0 h-full'
                                    style={{
                                        width: `${progressPct}%`,
                                        background: 'linear-gradient(to right, #7A6030, #C6AC6F)',
                                        transition: 'width 1.5s ease',
                                    }}
                                />
                            </div>
                            <span
                                className='text-[14px] font-light'
                                style={{ color: '#C6AC6F', fontFamily: 'Orbitron, sans-serif' }}
                            >
                                {progressPct}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Timeline body */}
                <div className='relative px-[60px] pb-[80px] max-qw:px-5 max-qw:pb-[48px]'>
                    {/* Vertical center line — desktop only */}
                    <div
                        className='absolute top-0 bottom-0 max-qw:hidden'
                        style={{
                            left: '50%',
                            width: '1px',
                            transform: 'translateX(-50%)',
                            background: 'linear-gradient(to bottom, transparent, #2B2B2B 8%, #2B2B2B 92%, transparent)',
                        }}
                    />
                    {/* Vertical left line — mobile only */}
                    <div
                        className='absolute top-0 bottom-0 hidden max-qw:block'
                        style={{
                            left: '18px',
                            width: '1px',
                            background: 'linear-gradient(to bottom, transparent, #2B2B2B 8%, #2B2B2B 92%, transparent)',
                        }}
                    />

                    {ROADMAP.map((item, idx) => {
                        const cfg = CFG[item.status];
                        const isLeft = idx % 2 === 0;
                        return (
                            <div
                                key={idx}
                                ref={el => itemRefs.current[idx] = el}
                                className='relative flex items-center max-qw:flex-row max-qw:gap-5'
                                style={{ marginBottom: idx < ROADMAP.length - 1 ? 0 : 0 }}
                            >
                                {/* ── DESKTOP layout ── */}
                                {/* Left card slot */}
                                <div className='flex-1 py-8 pr-12 max-qw:hidden'>
                                    {isLeft && (
                                        <PhaseCard item={item} isLeft={true} visible={!!visible[idx]} />
                                    )}
                                </div>

                                {/* Center node */}
                                <div className='flex-shrink-0 flex flex-col items-center z-10 max-qw:hidden'>
                                    <div
                                        className='w-[60px] h-[60px] border-2 flex items-center justify-center relative'
                                        style={{
                                            borderColor: cfg.nodeColor,
                                            backgroundColor: cfg.nodeBg,
                                            boxShadow: cfg.glow,
                                            transition: 'box-shadow 0.3s',
                                        }}
                                    >
                                        {/* Inner corner marks */}
                                        <div className='absolute inset-[3px] border' style={{ borderColor: `${cfg.nodeColor}20` }} />
                                        <span
                                            className='text-[15px] font-bold relative z-10'
                                            style={{ color: cfg.nodeColor, fontFamily: 'Orbitron, sans-serif' }}
                                        >
                                            {item.phase}
                                        </span>
                                    </div>
                                </div>

                                {/* Right card slot */}
                                <div className='flex-1 py-8 pl-12 max-qw:hidden'>
                                    {!isLeft && (
                                        <PhaseCard item={item} isLeft={false} visible={!!visible[idx]} />
                                    )}
                                </div>

                                {/* ── MOBILE layout ── */}
                                {/* Mobile node */}
                                <div
                                    className='hidden max-qw:flex flex-shrink-0 w-[36px] h-[36px] border items-center justify-center z-10'
                                    style={{ borderColor: cfg.nodeColor, backgroundColor: cfg.nodeBg, boxShadow: cfg.glow }}
                                >
                                    <span
                                        className='text-[10px] font-bold'
                                        style={{ color: cfg.nodeColor, fontFamily: 'Orbitron, sans-serif' }}
                                    >
                                        {item.phase}
                                    </span>
                                </div>
                                {/* Mobile card */}
                                <div className='hidden max-qw:block flex-1 py-4'>
                                    <PhaseCard item={item} isLeft={false} visible={!!visible[idx]} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
