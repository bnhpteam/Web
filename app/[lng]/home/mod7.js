'use client';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

const ROADMAP = [
    {
        phase: 'Phase 01',
        period: '2024 Q3 — Q4',
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
        phase: 'Phase 02',
        period: '2025 Q1 — Q2',
        title: 'Development',
        status: 'completed',
        items: [
            'MPC keyless wallet architecture development',
            'Social Square (Home feed) MVP build',
            'Web3 Explore module prototype',
            'Internal alpha testing with 500+ users',
        ],
    },
    {
        phase: 'Phase 03',
        period: '2025 Q3 — Q4',
        title: 'Beta Launch',
        status: 'active',
        items: [
            'Closed beta launch on iOS & Android',
            'DEX integration with multi-chain support',
            'NPH token smart contract audit',
            'Community whitelist campaign launch',
        ],
    },
    {
        phase: 'Phase 04',
        period: '2026 Q1 — Q2',
        title: 'Public Sale',
        status: 'upcoming',
        items: [
            'NPH public sale — target $10M USDT/USDC',
            'CEX listing negotiations',
            'BNHP App open beta (global)',
            'KOL & community expansion program',
        ],
    },
    {
        phase: 'Phase 05',
        period: '2026 Q3 — Q4',
        title: 'TGE & Ecosystem',
        status: 'upcoming',
        items: [
            'Token Generation Event (TGE) on BNB Chain',
            'NPH staking and governance launch',
            'DEX liquidity pool deployment',
            'Full mainnet launch with 1M+ user target',
        ],
    },
    {
        phase: 'Phase 06',
        period: '2027+',
        title: 'Expansion',
        status: 'upcoming',
        items: [
            'Cross-chain bridge to ETH / Solana / TON',
            'BNHP DAO governance activation',
            'B2B API and enterprise SDK release',
            'Global marketing and exchange partnerships',
        ],
    },
];

const STATUS_CONFIG = {
    completed: { label: 'Completed', color: 'text-green-400', border: 'border-green-400/30', bg: 'bg-green-400/5', dot: 'bg-green-400' },
    active: { label: 'In Progress', color: 'text-[#C6AC6F]', border: 'border-[#C6AC6F]/40', bg: 'bg-[#C6AC6F]/5', dot: 'bg-[#C6AC6F] animate-pulse' },
    upcoming: { label: 'Upcoming', color: 'text-[rgba(255,255,255,0.3)]', border: 'border-[#2B2B2B]', bg: 'bg-[#111111]', dot: 'bg-[#2B2B2B]' },
};

export default function Mod7() {
    const [visibleItems, setVisibleItems] = useState([]);
    const itemRefs = useRef([]);

    useEffect(() => {
        const observers = itemRefs.current.map((ref, idx) => {
            if (!ref) return null;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => [...new Set([...prev, idx])]);
                    }
                },
                { threshold: 0.15 }
            );
            observer.observe(ref);
            return observer;
        });
        return () => observers.forEach(obs => obs && obs.disconnect());
    }, []);

    return (
        <>
            <div className='relative w-full max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base text-white border border-b-0 border-[#2B2B2B] relative overflow-hidden bg-[#0B0B0B]">
                    <Pagination page='06' title='ROADMAP' desc='2024—2027+' />

                    <div className='w-full p-[40px] max-qw:p-5'>
                        {/* Section Header */}
                        <div className='mb-10'>
                            <div className='text-[11px] text-[#C6AC6F] tracking-[4px] mb-3 uppercase'>Development Timeline</div>
                            <h2 className='text-[36px] font-semibold max-qw:text-[24px]'>
                                <HyperText>Roadmap</HyperText>
                            </h2>
                            <p className='text-[14px] text-[rgba(255,255,255,0.4)] mt-2 max-w-[480px] leading-relaxed'>
                                From concept to global ecosystem — BNHP's phased development plan from 2024 through 2027 and beyond.
                            </p>
                        </div>

                        {/* Timeline Grid */}
                        <div className='grid grid-cols-3 gap-4 max-bw:grid-cols-2 max-qw:grid-cols-1'>
                            {ROADMAP.map((phase, idx) => {
                                const config = STATUS_CONFIG[phase.status];
                                const isVisible = visibleItems.includes(idx);
                                return (
                                    <div
                                        key={idx}
                                        ref={el => itemRefs.current[idx] = el}
                                        className={`border ${config.border} ${config.bg} p-6 relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                        style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
                                    >
                                        {/* Status indicator */}
                                        <div className='flex items-center justify-between mb-4'>
                                            <div className='flex items-center gap-2'>
                                                <div className={`w-2 h-2 rounded-full ${config.dot}`} />
                                                <span className={`text-[11px] uppercase tracking-widest ${config.color}`}>{config.label}</span>
                                            </div>
                                            <span className='text-[11px] font-mono text-[rgba(255,255,255,0.2)]'>{phase.phase}</span>
                                        </div>

                                        {/* Period */}
                                        <div className='text-[12px] text-[rgba(255,255,255,0.3)] mb-2 font-mono'>{phase.period}</div>

                                        {/* Title */}
                                        <h3 className='text-[20px] text-white font-semibold mb-4'>
                                            <HyperText>{phase.title}</HyperText>
                                        </h3>

                                        {/* Items */}
                                        <ul className='space-y-2'>
                                            {phase.items.map((item, iIdx) => (
                                                <li key={iIdx} className='flex gap-2 text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed'>
                                                    <span className={`flex-shrink-0 mt-1.5 w-1 h-1 rounded-full ${phase.status === 'completed' ? 'bg-green-400' : phase.status === 'active' ? 'bg-[#C6AC6F]' : 'bg-[#2B2B2B]'}`} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Phase number watermark */}
                                        <div className='absolute bottom-4 right-4 text-[48px] font-bold text-[rgba(255,255,255,0.03)] leading-none select-none' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Progress Bar */}
                        <div className='mt-8 border border-[#2B2B2B] bg-[#111111] p-6'>
                            <div className='flex items-center justify-between mb-3'>
                                <span className='text-[12px] text-[rgba(255,255,255,0.4)]'>Overall Progress</span>
                                <span className='text-[12px] text-[#C6AC6F]'>Phase 3 of 6 — In Progress</span>
                            </div>
                            <div className='w-full h-[6px] bg-[#1A1A1A] rounded-full overflow-hidden'>
                                <div className='h-full bg-gradient-to-r from-[#C6AC6F] to-[#F6EFC5] rounded-full' style={{ width: '42%' }} />
                            </div>
                            <div className='flex justify-between mt-2'>
                                {ROADMAP.map((p, idx) => (
                                    <div key={idx} className={`text-[10px] font-mono ${p.status === 'completed' ? 'text-green-400' : p.status === 'active' ? 'text-[#C6AC6F]' : 'text-[rgba(255,255,255,0.2)]'}`}>
                                        P{idx + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
