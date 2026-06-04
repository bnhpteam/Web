'use client';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";
import { useState } from 'react';

const BRAND_COLORS = [
    {
        name: 'Golden Sand',
        hex: '#C6AC6F',
        rgb: '(198, 172, 111)',
        cmyk: '(0, 13, 44, 22)',
        type: 'Primary',
        bg: 'bg-[#C6AC6F]',
        textColor: 'text-white',
    },
    {
        name: 'Soft Cream',
        hex: '#F6EFC5',
        rgb: '(246, 239, 197)',
        cmyk: '(0, 3, 20, 4)',
        type: 'Primary',
        bg: 'bg-[#F6EFC5]',
        textColor: 'text-black',
    },
    {
        name: 'Absolute Black',
        hex: '#000000',
        rgb: '(0, 0, 0)',
        cmyk: '(0, 0, 0, 100)',
        type: 'Neutral',
        bg: 'bg-black border border-[#2B2B2B]',
        textColor: 'text-white',
    },
    {
        name: 'Pure White',
        hex: '#FFFFFF',
        rgb: '(255, 255, 255)',
        cmyk: '(0, 0, 0, 0)',
        type: 'Neutral',
        bg: 'bg-white border border-[#E0E0E0]',
        textColor: 'text-black',
    },
];

const LOGO_VARIANTS = [
    {
        label: 'Primary — Dark Background',
        bg: 'bg-[#0B0B0B]',
        borderColor: 'border-[#2B2B2B]',
        desc: 'Use on dark backgrounds. The standard version for all primary applications.',
    },
    {
        label: 'Primary — Light Background',
        bg: 'bg-[#F6EFC5]',
        borderColor: 'border-[#C6AC6F]/30',
        desc: 'Use on light or cream backgrounds. Maintain clear space around the logo.',
    },
    {
        label: 'Icon Only — Dark',
        bg: 'bg-[#0B0B0B]',
        borderColor: 'border-[#2B2B2B]',
        iconOnly: true,
        desc: 'Use when space is limited, such as app icons, favicons, or social media avatars.',
    },
    {
        label: 'Icon Only — Gold',
        bg: 'bg-[#C6AC6F]',
        borderColor: 'border-[#C6AC6F]',
        iconOnly: true,
        iconInvert: true,
        desc: 'Use on golden backgrounds or as a highlight element in branded materials.',
    },
];

const TYPOGRAPHY_ITEMS = [
    { role: 'Logo Font', name: 'Orbitron', weights: ['Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold', 'Black'], note: 'Used exclusively for the BNHP wordmark and display headings.' },
    { role: 'Body Font', name: 'Poppins', weights: ['ExtraLight', 'Light', 'Regular', 'Medium', 'SemiBold', 'Bold', 'ExtraBold'], note: 'Used for all body copy, UI labels, and supporting text.' },
];

const USAGE_RULES = [
    { type: 'do', text: 'Always maintain minimum clear space equal to the height of the "B" letterform around the logo.' },
    { type: 'do', text: 'Use the approved color combinations: logo on black, white, or golden sand backgrounds.' },
    { type: 'do', text: 'Scale the logo proportionally. Never stretch or distort.' },
    { type: 'dont', text: 'Do not rotate, skew, or apply effects (shadows, gradients, outlines) to the logo.' },
    { type: 'dont', text: 'Do not place the logo on busy backgrounds that reduce legibility.' },
    { type: 'dont', text: 'Do not alter the logo colors or use unapproved color combinations.' },
];

function CopyBtn({ text }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <button onClick={handleCopy} className='text-[11px] font-mono text-[rgba(255,255,255,0.4)] hover:text-[#C6AC6F] transition-colors duration-200 flex items-center gap-1'>
            {copied ? '✓ Copied' : text}
        </button>
    );
}

// Logo images extracted from official BNHP Brand Book
function BnhpLogoImage({ variant = 'dark', className = '' }) {
    const srcs = {
        dark: '/assets/imgs/brand-logo-dark.png',      // Black bg, golden wordmark
        primary: '/assets/imgs/brand-logo-primary.png', // White bg, golden wordmark
        mono: '/assets/imgs/brand-logo-mono.png',       // Black bg, white wordmark
        secondary: '/assets/imgs/brand-logo-secondary.png', // Wordmark only
    };
    return (
        <img src={srcs[variant] || srcs.dark} alt={`BNHP Logo - ${variant}`} className={`object-contain ${className}`} />
    );
}

export default function BrandMod1() {
    return (
        <>
            {/* Hero */}
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-[46px] left-0 -z-1 border-[#2B2B2B] cut-border max-qw:hidden' />
                <div className="w-base h-[480px] text-white border border-b-0 border-t-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat max-bw:bg-none relative overflow-hidden max-qw:h-[320px]">
                    <Pagination className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none' page='01' title='BRAND' desc='GUIDELINES' />
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                        <div className='text-[12px] text-[#C6AC6F] tracking-[4px] mb-6 uppercase'>Brand Identity</div>
                        <h1 className='text-[56px] font-bold text-center max-qw:text-[32px]'>BNHP Brand Kit</h1>
                        <p className='text-[16px] text-[rgba(255,255,255,0.4)] mt-4 text-center max-w-[480px] max-qw:text-[13px] max-qw:px-4'>
                            Official brand guidelines for logo usage, color palette, typography, and visual elements.
                        </p>
                    </div>
                </div>
            </div>

            {/* Logo Variants */}
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base text-white border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] relative overflow-hidden">
                    <Pagination page='02' title='LOGO' total='05' />
                    <div className='w-full p-[40px] max-qw:p-5'>
                        <div className='mb-8'>
                            <h2 className='text-[28px] font-semibold mb-2 max-qw:text-[20px]'>Logo Variants</h2>
                            <p className='text-[14px] text-[rgba(255,255,255,0.4)] max-w-[560px]'>
                                The BNHP logo consists of the swirl icon mark and the wordmark. Use the appropriate variant based on background and context.
                            </p>
                        </div>
                        <div className='grid grid-cols-2 gap-4 max-bw:grid-cols-1'>
                            {/* Dark background — golden logo (from Brand Book) */}
                            <div className='border border-[#2B2B2B] bg-[#0B0B0B] p-10 flex flex-col items-center justify-center min-h-[200px] relative'>
                                <div className='absolute top-3 left-3 text-[11px] font-mono opacity-40'>/ 01</div>
                                <BnhpLogoImage variant='dark' className='max-h-[80px] w-auto' />
                                <div className='mt-6 text-[12px] text-center max-w-[260px] text-white/40'>Use on dark backgrounds. The standard version for all primary applications.</div>
                                <div className='mt-3 text-[11px] font-semibold text-[rgba(255,255,255,0.6)]'>Primary — Dark Background</div>
                            </div>
                            {/* White/light background — golden logo (from Brand Book) */}
                            <div className='border border-[#C6AC6F]/30 bg-white p-10 flex flex-col items-center justify-center min-h-[200px] relative'>
                                <div className='absolute top-3 left-3 text-[11px] font-mono opacity-40 text-black'>/ 02</div>
                                <BnhpLogoImage variant='primary' className='max-h-[80px] w-auto' />
                                <div className='mt-6 text-[12px] text-center max-w-[260px] text-black/50'>Use on light or white backgrounds. Maintain clear space around the logo.</div>
                                <div className='mt-3 text-[11px] font-semibold text-black/70'>Primary — Light Background</div>
                            </div>
                            {/* Black bg, white monochrome logo (from Brand Book) */}
                            <div className='border border-[#2B2B2B] bg-black p-10 flex flex-col items-center justify-center min-h-[200px] relative'>
                                <div className='absolute top-3 left-3 text-[11px] font-mono opacity-40'>/ 03</div>
                                <BnhpLogoImage variant='mono' className='max-h-[80px] w-auto' />
                                <div className='mt-6 text-[12px] text-center max-w-[260px] text-white/40'>Monochrome white version for single-color print or embossing applications.</div>
                                <div className='mt-3 text-[11px] font-semibold text-[rgba(255,255,255,0.6)]'>Monochrome — White on Black</div>
                            </div>
                            {/* Wordmark only — secondary logo (from Brand Book) */}
                            <div className='border border-[#C6AC6F]/30 bg-white p-10 flex flex-col items-center justify-center min-h-[200px] relative'>
                                <div className='absolute top-3 left-3 text-[11px] font-mono opacity-40 text-black'>/ 04</div>
                                <BnhpLogoImage variant='secondary' className='max-h-[80px] w-auto' />
                                <div className='mt-6 text-[12px] text-center max-w-[260px] text-black/50'>Secondary wordmark-only logo for use in limited-space contexts.</div>
                                <div className='mt-3 text-[11px] font-semibold text-black/70'>Secondary — Wordmark Only</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brand Colors */}
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base text-white border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] relative overflow-hidden">
                    <Pagination page='03' title='COLORS' total='05' />
                    <div className='w-full p-[40px] max-qw:p-5'>
                        <div className='mb-8'>
                            <h2 className='text-[28px] font-semibold mb-2 max-qw:text-[20px]'>Brand Colors</h2>
                            <p className='text-[14px] text-[rgba(255,255,255,0.4)] max-w-[560px]'>
                                The BNHP color palette is built around warmth and authority. Golden Sand is the signature accent, used to convey trust, innovation, and premium quality.
                            </p>
                        </div>
                        <div className='grid grid-cols-4 gap-4 max-bw:grid-cols-2 max-qw:grid-cols-1'>
                            {BRAND_COLORS.map((color, idx) => (
                                <div key={idx} className='border border-[#2B2B2B] overflow-hidden'>
                                    <div className={`h-[160px] ${color.bg} flex items-end p-4`}>
                                        <span className={`text-[12px] font-semibold ${color.textColor} opacity-60 uppercase tracking-widest`}>{color.type}</span>
                                    </div>
                                    <div className='p-4 bg-[#111111]'>
                                        <div className='text-[16px] text-white font-medium mb-3'>{color.name}</div>
                                        <div className='space-y-2'>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-[11px] text-[rgba(255,255,255,0.3)]'>HEX</span>
                                                <CopyBtn text={color.hex} />
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-[11px] text-[rgba(255,255,255,0.3)]'>RGB</span>
                                                <span className='text-[11px] font-mono text-[rgba(255,255,255,0.4)]'>{color.rgb}</span>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-[11px] text-[rgba(255,255,255,0.3)]'>CMYK</span>
                                                <span className='text-[11px] font-mono text-[rgba(255,255,255,0.4)]'>{color.cmyk}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Typography */}
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base text-white border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] relative overflow-hidden">
                    <Pagination page='04' title='TYPOGRAPHY' total='05' />
                    <div className='w-full p-[40px] max-qw:p-5'>
                        <div className='mb-8'>
                            <h2 className='text-[28px] font-semibold mb-2 max-qw:text-[20px]'>Brand Typography</h2>
                            <p className='text-[14px] text-[rgba(255,255,255,0.4)] max-w-[560px]'>
                                Typography is a vital part of the brand's visual identity. Orbitron defines the logo and display headings; Poppins provides clarity for all body copy and UI elements.
                            </p>
                        </div>
                        <div className='grid grid-cols-2 gap-4 max-bw:grid-cols-1'>
                            {TYPOGRAPHY_ITEMS.map((item, idx) => (
                                <div key={idx} className='border border-[#2B2B2B] bg-[#111111] p-6'>
                                    <div className='flex items-center justify-between mb-4'>
                                        <div>
                                            <div className='text-[11px] text-[#C6AC6F] uppercase tracking-widest mb-1'>{item.role}</div>
                                            <div className='text-[24px] font-bold' style={{ fontFamily: item.name === 'Orbitron' ? 'Orbitron, sans-serif' : 'Poppins, sans-serif' }}>{item.name}</div>
                                        </div>
                                    </div>
                                    <div className='space-y-1 mb-4'>
                                        {item.weights.map((w, wi) => (
                                            <div key={wi} className='text-[14px] text-[rgba(255,255,255,0.5)]' style={{ fontFamily: item.name === 'Orbitron' ? 'Orbitron, sans-serif' : 'Poppins, sans-serif', fontWeight: w.toLowerCase().includes('extra') ? 800 : w.toLowerCase().includes('semi') ? 600 : w.toLowerCase().includes('bold') ? 700 : w.toLowerCase().includes('medium') ? 500 : w.toLowerCase().includes('light') ? 300 : 400 }}>
                                                {w}
                                            </div>
                                        ))}
                                    </div>
                                    <div className='text-[12px] text-[rgba(255,255,255,0.3)] border-t border-[#2B2B2B] pt-4'>{item.note}</div>
                                </div>
                            ))}
                        </div>

                        {/* Type Hierarchy */}
                        <div className='mt-6 border border-[#2B2B2B] bg-[#111111] p-6'>
                            <div className='text-[11px] text-[#C6AC6F] uppercase tracking-widest mb-6'>Type Hierarchy</div>
                            <div className='space-y-4'>
                                <div className='flex items-baseline gap-4 border-b border-[#2B2B2B] pb-4'>
                                    <div className='w-[180px] text-[11px] text-[rgba(255,255,255,0.3)] flex-shrink-0'>Main Heading — Orbitron Bold 50px</div>
                                    <div className='text-[40px] font-bold text-white' style={{ fontFamily: 'Orbitron, sans-serif' }}>BNHP</div>
                                </div>
                                <div className='flex items-baseline gap-4 border-b border-[#2B2B2B] pb-4'>
                                    <div className='w-[180px] text-[11px] text-[rgba(255,255,255,0.3)] flex-shrink-0'>Heading Two — Orbitron SemiBold 32px</div>
                                    <div className='text-[28px] font-semibold text-white' style={{ fontFamily: 'Orbitron, sans-serif' }}>Web3 Social</div>
                                </div>
                                <div className='flex items-baseline gap-4 border-b border-[#2B2B2B] pb-4'>
                                    <div className='w-[180px] text-[11px] text-[rgba(255,255,255,0.3)] flex-shrink-0'>Subheading — Poppins Medium 24px</div>
                                    <div className='text-[22px] font-medium text-[rgba(255,255,255,0.7)]'>Asset Sovereignty</div>
                                </div>
                                <div className='flex items-baseline gap-4'>
                                    <div className='w-[180px] text-[11px] text-[rgba(255,255,255,0.3)] flex-shrink-0'>Paragraph — Poppins Regular 16px</div>
                                    <div className='text-[15px] text-[rgba(255,255,255,0.4)] leading-relaxed max-w-[400px]'>BNHP integrates social media and self-custody wallet, breaking the barrier between Web2 and Web3.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Do's & Don'ts + Download */}
            <div className='w-full relative max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base text-white border border-b-0 border-[#2B2B2B] bg-[#0B0B0B] relative overflow-hidden">
                    <Pagination page='05' title="DO'S & DON'TS" total='05' />
                    <div className='w-full p-[40px] max-qw:p-5'>
                        <div className='mb-8'>
                            <h2 className='text-[28px] font-semibold mb-2 max-qw:text-[20px]'>Usage Guidelines</h2>
                            <p className='text-[14px] text-[rgba(255,255,255,0.4)] max-w-[560px]'>
                                Consistent application of the brand identity ensures recognition and trust across all touchpoints.
                            </p>
                        </div>
                        <div className='grid grid-cols-2 gap-4 max-bw:grid-cols-1'>
                            <div className='border border-[#2B2B2B] bg-[#111111] p-6'>
                                <div className='text-[12px] text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2'>
                                    <div className='w-4 h-[1px] bg-green-400' />
                                    Do
                                </div>
                                <div className='space-y-4'>
                                    {USAGE_RULES.filter(r => r.type === 'do').map((rule, idx) => (
                                        <div key={idx} className='flex gap-3'>
                                            <div className='w-4 h-4 border border-green-400 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                    <path d="M1 4L3 6L7 2" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <p className='text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed'>{rule.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='border border-[#2B2B2B] bg-[#111111] p-6'>
                                <div className='text-[12px] text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2'>
                                    <div className='w-4 h-[1px] bg-red-400' />
                                    Don't
                                </div>
                                <div className='space-y-4'>
                                    {USAGE_RULES.filter(r => r.type === 'dont').map((rule, idx) => (
                                        <div key={idx} className='flex gap-3'>
                                            <div className='w-4 h-4 border border-red-400 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                    <path d="M2 2L6 6M6 2L2 6" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <p className='text-[13px] text-[rgba(255,255,255,0.5)] leading-relaxed'>{rule.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Download CTA */}
                        <div className='mt-8 border border-[#C6AC6F]/30 bg-[#C6AC6F]/5 p-8 flex items-center justify-between max-qw:flex-col max-qw:gap-4'>
                            <div>
                                <div className='text-[11px] text-[#C6AC6F] uppercase tracking-widest mb-2'>Brand Assets</div>
                                <h3 className='text-[20px] text-white font-semibold'>Download the Full Brand Kit</h3>
                                <p className='text-[13px] text-[rgba(255,255,255,0.4)] mt-1'>Includes logo files (SVG, PNG, PDF), color swatches, and font files.</p>
                            </div>
                            <a
                                href="mailto:bnhpteam@gmail.com?subject=Brand%20Kit%20Request"
                                className='flex-shrink-0 px-8 py-3 border border-[#C6AC6F] text-[#C6AC6F] text-[14px] font-medium hover:bg-[#C6AC6F] hover:text-black transition-all duration-300 flex items-center gap-2'
                            >
                                Request Brand Kit
                                <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                                    <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
