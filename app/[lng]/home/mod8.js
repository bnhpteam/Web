'use client';
import { useState } from 'react';
import Pagination from '../components/pagination';
import { HyperText } from "@/components/ui/hyper-text";

const PROGRESS_LINKS = [
    {
        title: `Invest in BNHP.`,
        desc: `Background, objectives, and market potential of BNHP.`,
        url: 'https://forms.monday.com/forms/fa987bbb809f33aa3063ba361105c0f1?r=apse2'
    },
    {
        title: `BNHP White Paper.`,
        desc: `Vision, technology, tokenomics, and roadmap documentation.`,
        url: '/BNHP-APP-Whitepaper-V1.0.pdf'
    },
    {
        title: `BNHP Job Opportunities.`,
        desc: `Position requirements and the application process.`,
        url: 'https://forms.monday.com/forms/1619ca796a31fb5e966f5240999ab0ab?r=apse2'
    },
];

const COMMUNITY_LINKS = [
    {
        name: 'X (Twitter)',
        handle: '@bnhp_team',
        url: 'https://x.com/bnhp_team',
        desc: 'Follow for latest updates, announcements, and community highlights.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.20472 5.4039C3.6916 4.64737 4.23352 3.625 5.14764 3.625H8.7938C9.36514 3.625 9.89934 3.90816 10.2201 4.381L19.8841 18.6293C20.3972 19.3858 19.8553 20.4082 18.9412 20.4082H15.295C14.7237 20.4082 14.1895 20.125 13.8688 19.6522L4.20472 5.4039ZM5.82803 5.125L15.1102 18.8102C15.1517 18.8715 15.221 18.9082 15.295 18.9082H18.2608L8.97866 5.22299C8.93709 5.1617 8.86785 5.125 8.7938 5.125H5.82803Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10.9455 12.8706C11.2564 13.1443 11.2866 13.6182 11.0129 13.9291L5.23189 20.4958C4.95819 20.8067 4.48427 20.8368 4.17337 20.5631C3.86247 20.2894 3.83232 19.8155 4.10602 19.5046L9.887 12.938C10.1607 12.6271 10.6346 12.5969 10.9455 12.8706Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M19.2527 3.43707C19.5636 3.71078 19.5937 4.18469 19.32 4.49559L13.8833 10.6712C13.6096 10.9821 13.1356 11.0123 12.8247 10.7386C12.5138 10.4649 12.4837 9.99094 12.7574 9.68004L18.1941 3.50443C18.4678 3.19352 18.9418 3.16337 19.2527 3.43707Z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: 'Telegram',
        handle: 'bnhpai',
        url: 'https://t.me/bnhpai',
        desc: 'Join our community group for real-time discussions and support.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.2448 5.06481C20.2738 4.93793 20.148 4.83161 20.0278 4.88089L3.88242 11.4878C3.81492 11.5154 3.78772 11.5495 3.7733 11.5765C3.75546 11.6098 3.74488 11.6576 3.75209 11.7124C3.75929 11.7671 3.78188 11.8105 3.80768 11.838C3.82817 11.8598 3.86241 11.8853 3.93249 11.8949L8.72612 12.44C8.87486 12.457 9.01514 12.518 9.12889 12.6153L16.618 19.0215C16.6329 19.0342 16.6474 19.0476 16.6613 19.0615C16.7972 19.1978 17.0316 19.1312 17.0747 18.942L20.2448 5.06481ZM21.7071 5.39903C22.0068 4.08791 20.7044 2.98201 19.4585 3.49314L3.31438 10.0995C1.68591 10.7658 2.00002 13.1618 3.74724 13.3834L8.3284 13.9045L15.6234 20.1446C16.5977 21.0864 18.2345 20.6031 18.5372 19.2755L21.7071 5.39903Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.57498 12.4404C8.9876 12.4041 9.35151 12.7092 9.38779 13.1218L9.75767 17.3285L11.5835 15.7696C11.8985 15.5006 12.3719 15.538 12.6408 15.853C12.9098 16.168 12.8725 16.6414 12.5575 16.9103L10.6738 18.5186C9.82569 19.2429 8.51052 18.7902 8.28896 17.6963C8.28339 17.6688 8.27937 17.6411 8.27691 17.6131L7.89355 13.2532C7.85727 12.8406 8.16236 12.4766 8.57498 12.4404Z" fill="currentColor" />
            </svg>
        ),
    },
];

// Web3Forms access key — receives submissions to bnhpteam@gmail.com
const WEB3FORMS_KEY = 'fce482c9-b218-4d75-9edc-86a10334328a';

export default function Mod8() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setStatus('error');
            setErrorMsg('Please enter a valid email address.');
            return;
        }
        setStatus('loading');
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: 'New BNHP Newsletter Subscription',
                    from_name: 'BNHP Website',
                    email: email,
                    message: `New subscriber: ${email}`,
                    botcheck: '',
                }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setEmail('');
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <div className='relative w-full max-yt:px-[var(--padx)]'>
                <div className='w-screen absolute top-0 left-0 -z-1 border-[#2B2B2B] cut-border' />
                <div className="w-base text-white border border-b-0 border-[#2B2B2B] relative overflow-hidden bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat">
                    <Pagination page='07' title='COMMUNITY' />

                    <div className='w-full p-[40px] max-qw:p-5'>
                        <div className='flex gap-10 max-bw:flex-col'>
                            {/* Left: Email Subscribe */}
                            <div className='flex-1'>
                                <div className='text-[11px] text-[#C6AC6F] tracking-[4px] mb-3 uppercase'>Stay Updated</div>
                                <h2 className='text-[36px] font-semibold mb-3 max-qw:text-[24px]'>
                                    <HyperText>Subscribe</HyperText>
                                </h2>
                                <p className='text-[14px] text-[rgba(255,255,255,0.4)] mb-8 leading-relaxed max-w-[400px]'>
                                    Get the latest BNHP updates, NPH token news, and early access opportunities delivered directly to your inbox.
                                </p>

                                {status === 'success' ? (
                                    <div className='border border-green-400/30 bg-green-400/5 p-6 flex items-center gap-4'>
                                        <div className='w-10 h-10 border border-green-400 flex items-center justify-center flex-shrink-0'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M3 8L6.5 11.5L13 5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className='text-[14px] text-white font-medium'>You're subscribed!</div>
                                            <div className='text-[12px] text-[rgba(255,255,255,0.4)] mt-1'>Thank you for joining the BNHP community. We'll be in touch soon.</div>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className='space-y-3'>
                                        <div className='flex gap-0 max-qw:flex-col max-qw:gap-3'>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                                                placeholder="Enter your email address"
                                                className='flex-1 h-[48px] bg-[#111111] border border-[#2B2B2B] border-r-0 px-4 text-[14px] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[#C6AC6F] transition-colors duration-200 max-qw:border-r max-qw:border-b-0'
                                            />
                                            <button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                className='h-[48px] px-6 bg-[#C6AC6F] text-black text-[14px] font-semibold hover:bg-[#F6EFC5] transition-all duration-300 disabled:opacity-50 flex items-center gap-2 flex-shrink-0'
                                            >
                                                {status === 'loading' ? (
                                                    <div className='w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin' />
                                                ) : (
                                                    <>
                                                        Subscribe
                                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        {status === 'error' && (
                                            <p className='text-[12px] text-red-400'>{errorMsg}</p>
                                        )}
                                        <p className='text-[11px] text-[rgba(255,255,255,0.2)]'>
                                            No spam. Unsubscribe at any time. By subscribing you agree to our privacy policy.
                                        </p>
                                    </form>
                                )}
                            </div>

                            {/* Divider */}
                            <div className='w-[1px] bg-[#2B2B2B] max-bw:w-full max-bw:h-[1px]' />

                            {/* Right: Progress Links */}
                            <div className='flex-1'>
                                <div className='text-[11px] text-[#C6AC6F] tracking-[4px] mb-3 uppercase'>Resources</div>
                                <h2 className='text-[36px] font-semibold mb-3 max-qw:text-[24px]'>
                                    <HyperText>Progress</HyperText>
                                </h2>
                                <p className='text-[14px] text-[rgba(255,255,255,0.4)] mb-8 leading-relaxed max-w-[400px]'>
                                    Explore BNHP's investment opportunities, documentation, and career openings.
                                </p>
                                <div className='space-y-0'>
                                    {PROGRESS_LINKS.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full flex border border-[#2B2B2B] max-qw:flex-col max-qw:h-fit max-qw:p-3 max-qw:border-l-0 max-qw:last:border-b-0 ${idx % 2 ? 'border-t-0 border-b-0' : ''} group hover:bg-[#111111] transition-all duration-300`}
                                        >
                                            <div className='flex-1 p-4 text-[#B2B2B2] text-[12px] flex items-start max-qw:flex-col max-qw:p-0'>
                                                <span>/&nbsp;&nbsp;&nbsp;00{idx + 1}</span>
                                                <span className='text-[16px] text-white ml-6 max-qw:ml-0 max-qw:mt-3 group-hover:text-[#C6AC6F] transition-colors duration-300'>
                                                    <HyperText>{link.title}</HyperText>
                                                </span>
                                            </div>
                                            <div className='flex-1 p-4 text-[14px] text-[rgba(255,255,255,0.40)] max-qw:p-0 max-qw:mt-3'>
                                                <HyperText>{link.desc}</HyperText>
                                            </div>
                                            <div className='flex-1 p-4 flex justify-end items-center max-qw:p-0 max-qw:mt-3'>
                                                <div className='w-[148px] h-[40px] border border-white cursor-pointer relative group-inner'>
                                                    <div className='w-full h-full flex items-center justify-between px-4 py-[10px] text-white group-hover:text-[#C6AC6F] transition-colors duration-300'>
                                                        <span>View</span>
                                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path d="M8.91667 7.08333V0.75M8.91667 0.75H2.58333M8.91667 0.75L0.75 8.91667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
