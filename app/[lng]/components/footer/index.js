'use client';
import { useRef } from "react";
import { linkUrl } from '@/config/';

export const Footer = () => {
    const refFooter = useRef(null);

    const footerLinks = [
        {
            group: 'Website',
            links: [
                { label: 'Homepage', href: '/' },
                { label: 'White Paper', href: '/whitepaper' },
                { label: 'Terms of Use', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
            ],
        },
        {
            group: 'Products',
            links: [
                { label: 'Claim $NPH', href: '/claim' },
                { label: 'Brand Kit', href: '/brand' },
                { label: 'Whitepaper PDF', href: linkUrl.whitePaper, external: true },
            ],
        },
        {
            group: 'Community',
            links: [
                { label: 'X (Twitter)', href: linkUrl.twitter, external: true },
                { label: 'Telegram', href: linkUrl.telegram, external: true },
                { label: 'Contact Us', href: 'mailto:bnhpteam@gmail.com', external: true },
            ],
        },
        {
            group: 'Developers',
            links: [
                { label: 'GitHub', href: 'https://github.com/bnhpteam', external: true },
                { label: 'Docs', href: 'https://docs.bnhp.ai', external: true },
            ],
        },
    ];

    return (
        <>
            <div className="w-full">
                <footer ref={refFooter} className="flex relative max-yt:px-[var(--padx)]">
                    <div className="w-screen border-t border-b-0 border-[#2B2B2B] absolute top-0 left-0" />
                    <div className="w-[40px] h-full border-r border-[#2B2B2B] bg-[url(/assets/imgs/grid-bg.png)] bg-cover bg-no-repeat absolute left-0 -z-1" />
                    <div className="w-base border border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat text-white flex flex-col">

                        {/* Large footer logo */}
                        <div className="max-bw:py-2">
                            <img src="/assets/imgs/footer-logo.png" alt="BNHP" />
                        </div>

                        {/* Web3-standard link columns + copyright row */}
                        <div className="border-t border-[#2B2B2B] px-10 py-10 max-qw:px-5 max-qw:py-6">
                            <div className="flex flex-wrap gap-x-16 gap-y-8 max-qw:gap-x-8">
                                {footerLinks.map((section) => (
                                    <div key={section.group} className="flex flex-col gap-y-3 min-w-[120px]">
                                        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[rgba(255,255,255,0.35)] mb-1">
                                            {section.group}
                                        </div>
                                        {section.links.map((link) => (
                                            <a
                                                key={link.label}
                                                href={link.href}
                                                target={link.external ? '_blank' : undefined}
                                                rel={link.external ? 'noopener noreferrer' : undefined}
                                                className="text-[13px] text-[rgba(255,255,255,0.55)] hover:text-white transition-colors duration-200 w-fit"
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Copyright bar */}
                            <div className="mt-10 pt-6 border-t border-[#2B2B2B] flex flex-wrap items-center justify-between gap-4">
                                <span className="text-[12px] text-[rgba(255,255,255,0.25)]">
                                    ©{new Date().getFullYear()} BNHP. All rights reserved.
                                </span>
                                <div className="flex items-center gap-5">
                                    <a href={linkUrl.twitter} target="_blank" rel="noopener noreferrer" aria-label="X Twitter"
                                        className="text-[rgba(255,255,255,0.35)] hover:text-white transition-colors duration-200">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.20472 5.4039C3.6916 4.64737 4.23352 3.625 5.14764 3.625H8.7938C9.36514 3.625 9.89934 3.90816 10.2201 4.381L19.8841 18.6293C20.3972 19.3858 19.8553 20.4082 18.9412 20.4082H15.295C14.7237 20.4082 14.1895 20.125 13.8688 19.6522L4.20472 5.4039ZM5.82803 5.125L15.1102 18.8102C15.1517 18.8715 15.221 18.9082 15.295 18.9082H18.2608L8.97866 5.22299C8.93709 5.1617 8.86785 5.125 8.7938 5.125H5.82803Z" fill="currentColor" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.9455 12.8706C11.2564 13.1443 11.2866 13.6182 11.0129 13.9291L5.23189 20.4958C4.95819 20.8067 4.48427 20.8368 4.17337 20.5631C3.86247 20.2894 3.83232 19.8155 4.10602 19.5046L9.887 12.938C10.1607 12.6271 10.6346 12.5969 10.9455 12.8706Z" fill="currentColor" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.2527 3.43707C19.5636 3.71078 19.5937 4.18469 19.32 4.49559L13.8833 10.6712C13.6096 10.9821 13.1356 11.0123 12.8247 10.7386C12.5138 10.4649 12.4837 9.99094 12.7574 9.68004L18.1941 3.50443C18.4678 3.19352 18.9418 3.16337 19.2527 3.43707Z" fill="currentColor" />
                                        </svg>
                                    </a>
                                    <a href={linkUrl.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                                        className="text-[rgba(255,255,255,0.35)] hover:text-white transition-colors duration-200">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M20.2448 5.06481C20.2738 4.93793 20.148 4.83161 20.0278 4.88089L3.88242 11.4878C3.81492 11.5154 3.78772 11.5495 3.7733 11.5765C3.75546 11.6098 3.74488 11.6576 3.75209 11.7124C3.75929 11.7671 3.78188 11.8105 3.80768 11.838C3.82817 11.8598 3.86241 11.8853 3.93249 11.8949L8.72612 12.44C8.87486 12.457 9.01514 12.518 9.12889 12.6153L16.618 19.0215C16.6329 19.0342 16.6474 19.0476 16.6613 19.0615C16.7972 19.1978 17.0316 19.1312 17.0747 18.942L20.2448 5.06481ZM21.7071 5.39903C22.0068 4.08791 20.7044 2.98201 19.4585 3.49314L3.31438 10.0995C1.68591 10.7658 2.00002 13.1618 3.74724 13.3834L8.3284 13.9045L15.6234 20.1446C16.5977 21.0864 18.2345 20.6031 18.5372 19.2755L21.7071 5.39903Z" fill="currentColor" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.57498 12.4404C8.9876 12.4041 9.35151 12.7092 9.38779 13.1218L9.75767 17.3285L11.5835 15.7696C11.8985 15.5006 12.3719 15.538 12.6408 15.853C12.9098 16.168 12.8725 16.6414 12.5575 16.9103L10.6738 18.5186C9.82569 19.2429 8.51052 18.7902 8.28896 17.6963C8.28339 17.6688 8.27937 17.6411 8.27691 17.6131L7.89355 13.2532C7.85727 12.8406 8.16236 12.4766 8.57498 12.4404Z" fill="currentColor" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="w-screen border-t border-[#2B2B2B] absolute bottom-0 left-0" />
                    <div className="w-[40px] h-full border-l border-[#2B2B2B] bg-[url(/assets/imgs/grid-bg.png)] bg-cover bg-no-repeat absolute right-0 -z-1" />
                </footer>
            </div>
        </>
    );
};
