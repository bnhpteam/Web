'use client';
import { motion } from 'framer-motion';
import Pagination from '../components/pagination';
import { useState } from 'react';

const COLORS = [
    { name: 'Golden Sand', hex: '#C6AC6F', rgb: '198, 172, 111', cmyk: '0, 13, 44, 22', role: 'Primary', bg: '#C6AC6F', text: '#fff' },
    { name: 'Soft Cream', hex: '#F6EFC5', rgb: '246, 239, 197', cmyk: '0, 3, 20, 4', role: 'Primary', bg: '#F6EFC5', text: '#000' },
    { name: 'Absolute Black', hex: '#000000', rgb: '0, 0, 0', cmyk: '0, 0, 0, 100', role: 'Neutral', bg: '#000000', text: '#fff' },
    { name: 'Pure White', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0, 0, 0, 0', role: 'Neutral', bg: '#FFFFFF', text: '#000', border: '1px solid #e0e0e0' },
];

const LOGOS = [
    {
        id: '01',
        title: 'Logo — Dark Gold',
        desc: 'Primary logo on black background with gold gradient. Use as the default in all digital contexts.',
        bg: '#000000',
        img: '/assets/imgs/brand-logo-v1-black-gold.png',
        downloadSvg: '/brand/BNHP-Logo-Gold-Dark.svg',
        downloadWebp: '/brand/BNHP-Logo-Gold-Dark.webp',
        border: '1px solid #2B2B2B',
    },
    {
        id: '02',
        title: 'Logo — Monochrome',
        desc: 'Single-color black logo on white background. Use when color reproduction is unavailable.',
        bg: '#F4F4F4',
        img: '/assets/imgs/brand-logo-v5-white-bg.png',
        downloadSvg: '/brand/BNHP-Logo-Black-Light.svg',
        downloadWebp: '/brand/BNHP-Logo-Black-Light.webp',
        border: '1px solid #e0e0e0',
    },
];

const ICONS = [
    {
        id: '01',
        title: 'Icon — Gold',
        desc: 'Gold gradient icon on black background. Use for app icons and premium contexts.',
        bg: '#000000',
        img: '/brand/BNHP-Icon-Gold.webp',
        download: '/brand/BNHP-Icon-Gold.webp',
        border: '1px solid #2B2B2B',
    },
    {
        id: '02',
        title: 'Icon — White',
        desc: 'White icon on black background. Use for dark-mode UI and merchandise.',
        bg: '#000000',
        img: '/brand/BNHP-Icon-White.webp',
        download: '/brand/BNHP-Icon-White.webp',
        border: '1px solid #2B2B2B',
    },
];

function CopyBtn({ text }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className='text-[11px] font-mono text-[rgba(255,255,255,0.45)] hover:text-[#C6AC6F] transition-colors duration-200'
        >
            {copied ? '✓ Copied' : text}
        </button>
    );
}

export default function BrandMod1() {
    return (
        <div className='relative w-full text-white'>

            {/* HERO */}
            <section className='w-full border-b border-[#2B2B2B] bg-[#0B0B0B] relative overflow-hidden'>
                <div className='max-yt:px-[var(--padx)]'>
                    <div className='w-base py-[100px] max-qw:py-[60px] flex flex-col items-center text-center'>
                        <p className='text-[11px] tracking-[0.4em] uppercase text-[#C6AC6F] mb-5' style={{ fontFamily: 'Orbitron, sans-serif' }}>BNHP Official</p>
                        <h1 className='text-[64px] max-qw:text-[36px] font-bold leading-tight' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            Brand <span className='text-[#C6AC6F]'>Kit</span>
                        </h1>
                        <p className='mt-6 max-w-[520px] text-[14px] text-[rgba(255,255,255,0.45)] leading-relaxed'>
                            Official BNHP brand assets — logos, icons, and color palette for use across all digital and print touchpoints.
                        </p>
                    </div>
                </div>
                <div className='absolute inset-0 bg-[url(/assets/imgs/grid-bg.png)] bg-cover opacity-10 pointer-events-none' />
            </section>

            {/* LOGO */}
            <section className='w-full border-b border-[#2B2B2B] bg-[#0B0B0B]'>
                <div className='max-yt:px-[var(--padx)]'>
                    <div className='w-base py-[64px] max-qw:py-[40px]'>
                        <Pagination page='02' title='LOGO' desc='Variants' />
                        <div className='mt-10 mb-8'>
                            <h2 className='text-[28px] max-qw:text-[20px] font-semibold' style={{ fontFamily: 'Orbitron, sans-serif' }}>Logo</h2>
                            <p className='mt-2 text-[13px] text-[rgba(255,255,255,0.45)] max-w-[480px]'>Two primary logo configurations for use across all brand touchpoints.</p>
                        </div>
                        <div className='grid grid-cols-2 max-qw:grid-cols-1 gap-6'>
                            {LOGOS.map((v, i) => (
                                <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className='flex flex-col border border-[#2B2B2B]'>
                                    {/* Large logo display */}
                                    <div
                                        className='w-full flex items-center justify-center'
                                        style={{ background: v.bg, border: v.border || 'none', minHeight: '320px' }}
                                    >
                                        <img
                                            src={v.img}
                                            alt={v.title}
                                            className='w-[70%] max-w-[380px] object-contain'
                                        />
                                    </div>
                                    {/* Info + Download */}
                                    <div className='p-6 max-qw:p-4 bg-[#111] border-t border-[#2B2B2B]'>
                                        <div className='flex items-start justify-between gap-4'>
                                            <div>
                                                <span className='text-[11px] text-[#C6AC6F] tracking-widest uppercase font-mono'>{v.id}</span>
                                                <h3 className='mt-1 text-[15px] font-semibold text-white'>{v.title}</h3>
                                                <p className='mt-1 text-[12px] text-[rgba(255,255,255,0.4)] leading-relaxed max-w-[300px]'>{v.desc}</p>
                                            </div>
                                            <div className='flex flex-col gap-2 flex-shrink-0'>
                                                <a
                                                    href={v.downloadSvg}
                                                    download
                                                    className='inline-flex items-center gap-2 px-4 py-2 border border-[#C6AC6F] text-[#C6AC6F] text-[11px] font-semibold tracking-widest uppercase hover:bg-[#C6AC6F] hover:text-black transition-all duration-300'
                                                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1V8M6 8L3.5 5.5M6 8L8.5 5.5M1.5 10.5H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                    SVG
                                                </a>
                                                <a
                                                    href={v.downloadWebp}
                                                    download
                                                    className='inline-flex items-center gap-2 px-4 py-2 border border-[#2B2B2B] text-[rgba(255,255,255,0.5)] text-[11px] font-semibold tracking-widest uppercase hover:border-white hover:text-white transition-all duration-300'
                                                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1V8M6 8L3.5 5.5M6 8L8.5 5.5M1.5 10.5H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                    WEBP
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ICON */}
            <section className='w-full border-b border-[#2B2B2B] bg-[#0B0B0B]'>
                <div className='max-yt:px-[var(--padx)]'>
                    <div className='w-base py-[64px] max-qw:py-[40px]'>
                        <Pagination page='03' title='ICON' desc='App Icon' />
                        <div className='mt-10 mb-8'>
                            <h2 className='text-[28px] max-qw:text-[20px] font-semibold' style={{ fontFamily: 'Orbitron, sans-serif' }}>Icon</h2>
                            <p className='mt-2 text-[13px] text-[rgba(255,255,255,0.45)] max-w-[480px]'>The BNHP icon is used for app icons, favicons, and contexts where the full logo is too large.</p>
                        </div>
                        <div className='grid grid-cols-2 max-qw:grid-cols-1 gap-6'>
                            {ICONS.map((v, i) => (
                                <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className='flex flex-col border border-[#2B2B2B]'>
                                    {/* Large icon display */}
                                    <div
                                        className='w-full flex items-center justify-center'
                                        style={{ background: v.bg, border: v.border || 'none', minHeight: '320px' }}
                                    >
                                        <img
                                            src={v.img}
                                            alt={v.title}
                                            className='w-[45%] max-w-[220px] object-contain'
                                        />
                                    </div>
                                    {/* Info + Download */}
                                    <div className='p-6 max-qw:p-4 bg-[#111] border-t border-[#2B2B2B]'>
                                        <div className='flex items-start justify-between gap-4'>
                                            <div>
                                                <span className='text-[11px] text-[#C6AC6F] tracking-widest uppercase font-mono'>{v.id}</span>
                                                <h3 className='mt-1 text-[15px] font-semibold text-white'>{v.title}</h3>
                                                <p className='mt-1 text-[12px] text-[rgba(255,255,255,0.4)] leading-relaxed max-w-[300px]'>{v.desc}</p>
                                            </div>
                                            <div className='flex-shrink-0'>
                                                <a
                                                    href={v.download}
                                                    download
                                                    className='inline-flex items-center gap-2 px-4 py-2 border border-[#C6AC6F] text-[#C6AC6F] text-[11px] font-semibold tracking-widest uppercase hover:bg-[#C6AC6F] hover:text-black transition-all duration-300'
                                                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1V8M6 8L3.5 5.5M6 8L8.5 5.5M1.5 10.5H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* COLORS */}
            <section className='w-full bg-[#0B0B0B]'>
                <div className='max-yt:px-[var(--padx)]'>
                    <div className='w-base py-[64px] max-qw:py-[40px]'>
                        <Pagination page='04' title='COLORS' desc='Palette' />
                        <div className='mt-10 mb-8'>
                            <h2 className='text-[28px] max-qw:text-[20px] font-semibold' style={{ fontFamily: 'Orbitron, sans-serif' }}>Brand Colors</h2>
                            <p className='mt-2 text-[13px] text-[rgba(255,255,255,0.45)] max-w-[480px]'>Primary colors form the foundation of the brand identity. Neutral colors provide balance and versatility across all applications.</p>
                        </div>
                        <div className='grid grid-cols-4 max-qw:grid-cols-2 gap-4'>
                            {COLORS.map((c) => (
                                <motion.div key={c.hex} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className='flex flex-col overflow-hidden border border-[#2B2B2B]'>
                                    <div className='w-full h-[160px] max-qw:h-[110px] flex flex-col justify-end p-4' style={{ background: c.bg, border: c.border || 'none', color: c.text }}>
                                        <span className='text-[11px] opacity-60 font-mono'>{c.role}</span>
                                        <span className='text-[15px] font-semibold'>{c.name}</span>
                                    </div>
                                    <div className='p-4 bg-[#111] flex-1 space-y-2'>
                                        <div className='flex justify-between text-[11px]'><span className='text-[rgba(255,255,255,0.4)]'>HEX</span><CopyBtn text={c.hex} /></div>
                                        <div className='flex justify-between text-[11px]'><span className='text-[rgba(255,255,255,0.4)]'>RGB</span><span className='text-white font-mono text-right'>{c.rgb}</span></div>
                                        <div className='flex justify-between text-[11px]'><span className='text-[rgba(255,255,255,0.4)]'>CMYK</span><span className='text-white font-mono text-right'>{c.cmyk}</span></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
