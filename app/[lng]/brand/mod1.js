'use client';
import { motion } from 'framer-motion';
import Pagination from '../components/pagination';
import { useState } from 'react';

const LOGO_VARIANTS = [
    { id: '01', title: 'Primary Logo — Dark', desc: 'The primary logo on a black background with gold gradient. Use as the default in all digital and print contexts where a dark background is available.', bg: '#000000', img: '/assets/imgs/brand-logo-v1-black-gold.png', textColor: '#ffffff', border: '1px solid #2B2B2B' },
    { id: '02', title: 'Primary Logo — Gold Background', desc: 'Logo on the BNHP Golden Sand gradient background. Ideal for highlight banners, social media covers, and promotional materials.', bg: 'linear-gradient(135deg, #C6AC6F 0%, #F6EFC5 100%)', img: '/assets/imgs/brand-logo-v2-gold-bg.png', textColor: '#000000', border: 'none' },
    { id: '03', title: 'Secondary Logo — Solid Gold', desc: 'Logo on a solid Golden Sand (#C6AC6F) background. Use when the gradient version is not suitable, such as single-color print.', bg: '#C6AC6F', img: '/assets/imgs/brand-logo-v3-gold-solid.png', textColor: '#ffffff', border: 'none' },
    { id: '04', title: 'Secondary Logo — Cream', desc: 'Logo on Soft Cream (#F6EFC5) background. Suitable for light-mode interfaces, editorial layouts, and co-branding contexts.', bg: '#F6EFC5', img: '/assets/imgs/brand-logo-v4-cream-bg.png', textColor: '#000000', border: 'none' },
    { id: '05', title: 'Monochrome — Light', desc: 'Single-color black logo on a neutral grey/white background. Use when color reproduction is not available or when visual simplicity is required.', bg: '#F4F4F4', img: '/assets/imgs/brand-logo-v5-white-bg.png', textColor: '#000000', border: '1px solid #e0e0e0' },
    { id: '06', title: 'Monochrome — Dark', desc: 'Single-color white logo on a pure black background. Use for dark-mode UI, merchandise, and contexts where the gold gradient is unavailable.', bg: '#000000', img: '/assets/imgs/brand-logo-v6-black-white.png', textColor: '#ffffff', border: '1px solid #2B2B2B' },
];

const COLORS = [
    { name: 'Golden Sand', hex: '#C6AC6F', rgb: '198, 172, 111', cmyk: '0, 13, 44, 22', role: 'Primary', bg: '#C6AC6F', text: '#fff' },
    { name: 'Soft Cream', hex: '#F6EFC5', rgb: '246, 239, 197', cmyk: '0, 3, 20, 4', role: 'Primary', bg: '#F6EFC5', text: '#000' },
    { name: 'Absolute Black', hex: '#000000', rgb: '0, 0, 0', cmyk: '0, 0, 0, 100', role: 'Neutral', bg: '#000000', text: '#fff' },
    { name: 'Pure White', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0, 0, 0, 0', role: 'Neutral', bg: '#FFFFFF', text: '#000', border: '1px solid #e0e0e0' },
];

const FONTS = [
    { name: 'Orbitron', role: 'Logo Font', weights: ['Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold', 'Black'], usage: 'Headlines, logo text, section titles, token names.', sample: 'BNHP', bg: '#C6AC6F', text: '#fff', fontFamily: 'Orbitron, sans-serif' },
    { name: 'Poppins', role: 'Body Font', weights: ['ExtraLight', 'Light', 'Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold'], usage: 'Body copy, captions, UI labels, descriptions.', sample: 'AaBbCcDdEeFf', bg: '#F6EFC5', text: '#000', fontFamily: 'Poppins, sans-serif' },
];

const DO_DONTS = [
    { type: 'do', text: 'Use the logo on approved background colors only.' },
    { type: 'do', text: 'Maintain clear space equal to the height of the "B" glyph on all sides.' },
    { type: 'do', text: 'Scale the logo proportionally at all times.' },
    { type: 'do', text: 'Use the provided PNG/SVG files — never recreate the logo.' },
    { type: 'dont', text: 'Do not rotate, skew, or distort the logo.' },
    { type: 'dont', text: 'Do not apply drop shadows, outlines, or effects.' },
    { type: 'dont', text: 'Do not place the logo on busy or low-contrast backgrounds.' },
    { type: 'dont', text: 'Do not change the logo colors outside of approved variants.' },
];

function CopyBtn({ text }) {
    const [copied, setCopied] = useState(false);
    return (
        <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className='text-[11px] font-mono text-[rgba(255,255,255,0.45)] hover:text-[#C6AC6F] transition-colors duration-200'>
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
                    <div className='w-base py-[80px] max-qw:py-[48px]'>
                        <Pagination page='01' title='BRAND' desc='Guidelines' />
                        <div className='mt-12 max-qw:mt-8'>
                            <p className='text-[11px] tracking-[0.3em] uppercase text-[#C6AC6F] mb-4' style={{ fontFamily: 'Orbitron, sans-serif' }}>BNHP Brand Book</p>
                            <h1 className='text-[52px] max-qw:text-[30px] font-bold leading-tight' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                Brand<br /><span className='text-[#C6AC6F]'>Guidelines</span>
                            </h1>
                            <p className='mt-6 max-w-[560px] text-[14px] text-[rgba(255,255,255,0.5)] leading-relaxed'>
                                These guidelines define how the BNHP brand is expressed across all touchpoints — from digital interfaces to print materials. Consistent application ensures strong recognition and trust.
                            </p>
                        </div>
                        <div className='mt-12 max-qw:mt-8'>
                            <p className='text-[11px] text-[rgba(255,255,255,0.35)] tracking-widest uppercase mb-3'>App Icon — Light & Dark</p>
                            <img src='/assets/imgs/brand-app-icons.png' alt='BNHP App Icon variants' className='h-[100px] max-qw:h-[72px] object-contain' />
                        </div>
                    </div>
                </div>
                <div className='absolute inset-0 bg-[url(/assets/imgs/grid-bg.png)] bg-cover opacity-10 pointer-events-none' />
            </section>

            {/* LOGO VARIANTS */}
            <section className='w-full border-b border-[#2B2B2B] bg-[#0B0B0B]'>
                <div className='max-yt:px-[var(--padx)]'>
                    <div className='w-base py-[64px] max-qw:py-[40px]'>
                        <Pagination page='02' title='LOGO' desc='Variants' />
                        <div className='mt-10 mb-8'>
                            <h2 className='text-[28px] max-qw:text-[20px] font-semibold' style={{ fontFamily: 'Orbitron, sans-serif' }}>Logo Variants</h2>
                            <p className='mt-2 text-[13px] text-[rgba(255,255,255,0.45)] max-w-[480px]'>Six approved logo configurations. Each variant is optimised for a specific background and use case. Never use unapproved combinations.</p>
                        </div>
                        <div className='grid grid-cols-2 max-qw:grid-cols-1 gap-px bg-[#2B2B2B] border border-[#2B2B2B]'>
                            {LOGO_VARIANTS.map((v, i) => (
                                <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }} className='flex flex-col bg-[#0B0B0B]'>
                                    <div className='w-full flex items-center justify-center py-14 max-qw:py-10' style={{ background: v.bg, border: v.border || 'none', minHeight: '220px' }}>
                                        <img src={v.img} alt={v.title} className='max-h-[72px] max-qw:max-h-[52px] object-contain' />
                                    </div>
                                    <div className='p-6 max-qw:p-4 border-t border-[#2B2B2B]'>
                                        <span className='text-[11px] text-[#C6AC6F] tracking-widest uppercase font-mono'>{v.id}</span>
                                        <h3 className='mt-1 text-[15px] font-semibold text-white'>{v.title}</h3>
                                        <p className='mt-2 text-[12px] text-[rgba(255,255,255,0.45)] leading-relaxed max-w-[380px]'>{v.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* COLORS */}
            <section className='w-full border-b border-[#2B2B2B] bg-[#0B0B0B]'>
                <div className='max-yt:px-[var(--padx)]'>
                    <div className='w-base py-[64px] max-qw:py-[40px]'>
                        <Pagination page='03' title='COLORS' desc='Palette' />
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

            {/* TYPOGRAPHY */}
            <section className='w-full border-b border-[#2B2B2B] bg-[#0B0B0B]'>
                <div className='max-yt:px-[var(--padx)]'>
                    <div className='w-base py-[64px] max-qw:py-[40px]'>
                        <Pagination page='04' title='TYPE' desc='Fonts' />
                        <div className='mt-10 mb-8'>
                            <h2 className='text-[28px] max-qw:text-[20px] font-semibold' style={{ fontFamily: 'Orbitron, sans-serif' }}>Brand Fonts</h2>
                            <p className='mt-2 text-[13px] text-[rgba(255,255,255,0.45)] max-w-[480px]'>Typography is a vital part of the brand's visual identity. The chosen fonts must be used consistently across all brand communications.</p>
                        </div>
                        <div className='grid grid-cols-2 max-qw:grid-cols-1 gap-px bg-[#2B2B2B] border border-[#2B2B2B]'>
                            {FONTS.map((f) => (
                                <div key={f.name} className='bg-[#0B0B0B] flex flex-col'>
                                    <div className='p-6 max-qw:p-4 border-b border-[#2B2B2B] flex items-center justify-between'>
                                        <div>
                                            <h3 className='text-[22px] font-bold' style={{ fontFamily: f.fontFamily }}>{f.name}</h3>
                                            <p className='text-[11px] text-[rgba(255,255,255,0.45)] mt-1'>{f.usage}</p>
                                        </div>
                                        <span className='px-3 py-1 text-[11px] font-semibold tracking-widest uppercase border border-[#2B2B2B] text-[#C6AC6F]'>{f.role}</span>
                                    </div>
                                    <div className='p-6 max-qw:p-4 border-b border-[#2B2B2B]'>
                                        <p className='text-[11px] text-[rgba(255,255,255,0.35)] mb-3 tracking-widest uppercase'>Weights</p>
                                        <div className='space-y-1'>{f.weights.map((w) => <p key={w} className='text-[13px] text-[rgba(255,255,255,0.65)]' style={{ fontFamily: f.fontFamily }}>{w}</p>)}</div>
                                    </div>
                                    <div className='flex-1 flex items-center justify-center p-8 max-qw:p-6' style={{ background: f.bg }}>
                                        <span className='text-[48px] max-qw:text-[32px] font-bold leading-none' style={{ fontFamily: f.fontFamily, color: f.text }}>{f.sample}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* DO & DON'T */}
            <section className='w-full border-b border-[#2B2B2B] bg-[#0B0B0B]'>
                <div className='max-yt:px-[var(--padx)]'>
                    <div className='w-base py-[64px] max-qw:py-[40px]'>
                        <Pagination page='05' title='USAGE' desc='Rules' />
                        <div className='mt-10 mb-8'>
                            <h2 className='text-[28px] max-qw:text-[20px] font-semibold' style={{ fontFamily: 'Orbitron, sans-serif' }}>Logo Usage Rules</h2>
                            <p className='mt-2 text-[13px] text-[rgba(255,255,255,0.45)] max-w-[480px]'>To protect brand integrity, always follow these guidelines when using the BNHP logo.</p>
                        </div>
                        <div className='grid grid-cols-2 max-qw:grid-cols-1 gap-px bg-[#2B2B2B] border border-[#2B2B2B]'>
                            <div className='bg-[#0B0B0B] p-6 max-qw:p-4'>
                                <div className='flex items-center gap-2 mb-5'>
                                    <div className='w-5 h-5 rounded-full bg-[#C6AC6F] flex items-center justify-center'>
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                    <span className='text-[13px] font-semibold text-[#C6AC6F] tracking-widest uppercase'>Do</span>
                                </div>
                                <div className='space-y-3'>{DO_DONTS.filter(d => d.type === 'do').map((d, i) => (
                                    <div key={i} className='flex items-start gap-3'><div className='w-1 h-1 rounded-full bg-[#C6AC6F] mt-2 flex-shrink-0' /><p className='text-[13px] text-[rgba(255,255,255,0.65)] leading-relaxed'>{d.text}</p></div>
                                ))}</div>
                            </div>
                            <div className='bg-[#0B0B0B] p-6 max-qw:p-4'>
                                <div className='flex items-center gap-2 mb-5'>
                                    <div className='w-5 h-5 rounded-full border border-[#ff4444] flex items-center justify-center'>
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1L7 7M7 1L1 7" stroke="#ff4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                    </div>
                                    <span className='text-[13px] font-semibold text-[#ff6666] tracking-widest uppercase'>Don't</span>
                                </div>
                                <div className='space-y-3'>{DO_DONTS.filter(d => d.type === 'dont').map((d, i) => (
                                    <div key={i} className='flex items-start gap-3'><div className='w-1 h-1 rounded-full bg-[#ff4444] mt-2 flex-shrink-0' /><p className='text-[13px] text-[rgba(255,255,255,0.65)] leading-relaxed'>{d.text}</p></div>
                                ))}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DOWNLOAD */}
            <section className='w-full bg-[#0B0B0B]'>
                <div className='max-yt:px-[var(--padx)]'>
                    <div className='w-base py-[64px] max-qw:py-[40px]'>
                        <Pagination page='06' title='ASSETS' desc='Download' />
                        <div className='mt-10 flex flex-col items-start gap-6'>
                            <div>
                                <h2 className='text-[28px] max-qw:text-[20px] font-semibold' style={{ fontFamily: 'Orbitron, sans-serif' }}>Brand Assets</h2>
                                <p className='mt-2 text-[13px] text-[rgba(255,255,255,0.45)] max-w-[480px]'>For media inquiries, partnership materials, or press kits, contact the BNHP team. Do not redistribute brand assets without written permission.</p>
                            </div>
                            <div className='flex flex-wrap gap-4'>
                                <a href='mailto:bnhpteam@gmail.com?subject=Brand Assets Request' className='inline-flex items-center gap-2 px-6 py-3 border border-[#C6AC6F] text-[#C6AC6F] text-[13px] font-semibold tracking-widest uppercase hover:bg-[#C6AC6F] hover:text-black transition-all duration-300' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3.5L7 8L13 3.5M1 3.5H13V11.5H1V3.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                                    Request Assets
                                </a>
                                <a href='/BNHP-APP-Whitepaper-V1.0.pdf' target='_blank' className='inline-flex items-center gap-2 px-6 py-3 border border-[#2B2B2B] text-[rgba(255,255,255,0.6)] text-[13px] font-semibold tracking-widest uppercase hover:border-white hover:text-white transition-all duration-300' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1V9M7 9L4 6M7 9L10 6M2 11H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    White Paper
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
