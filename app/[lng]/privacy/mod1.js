'use client';
import Pagination from '../components/pagination';

const sections = [
    {
        title: '1. Information We Collect',
        content: `We may collect the following types of information when you use the Services: (a) Wallet addresses and on-chain transaction data when you connect a Web3 wallet; (b) Email addresses submitted voluntarily through subscription or contact forms; (c) Usage data including pages visited, features used, and interaction patterns collected via analytics tools; (d) Device and browser information such as IP address, browser type, and operating system for security and performance purposes.`,
    },
    {
        title: '2. How We Use Your Information',
        content: `BNHP uses collected information to: (a) Operate, maintain, and improve the Services; (b) Process NPH token claims and verify eligibility; (c) Send relevant updates, announcements, and community communications to subscribers; (d) Detect, prevent, and address technical issues, fraud, or abuse; (e) Comply with applicable legal obligations. We do not sell, rent, or trade your personal information to third parties for their marketing purposes.`,
    },
    {
        title: '3. Blockchain Data',
        content: `Please be aware that blockchain transactions are inherently public and immutable. Any wallet address, transaction hash, or on-chain activity associated with your use of the Services may be visible to anyone with access to the relevant blockchain network. BNHP does not control and cannot delete information recorded on public blockchains.`,
    },
    {
        title: '4. Cookies and Tracking',
        content: `We may use cookies and similar tracking technologies to enhance your experience on the Services. These may include session cookies (deleted when you close your browser) and persistent cookies (stored for a set period). You may disable cookies through your browser settings, though this may affect the functionality of certain features.`,
    },
    {
        title: '5. Third-Party Services',
        content: `The Services may integrate with or link to third-party platforms including but not limited to blockchain networks, analytics providers, and social media platforms. These third parties have their own privacy policies, and BNHP is not responsible for their data practices. We encourage you to review the privacy policies of any third-party services you access through the BNHP platform.`,
    },
    {
        title: '6. Data Security',
        content: `We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data and encourage you to take appropriate precautions to protect your wallet credentials and private keys.`,
    },
    {
        title: '7. Data Retention',
        content: `We retain personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by applicable law. Email addresses collected for subscription purposes will be retained until you unsubscribe or request deletion. On-chain data cannot be deleted due to the immutable nature of blockchain technology.`,
    },
    {
        title: '8. Your Rights',
        content: `Depending on your jurisdiction, you may have the right to: access, correct, or delete your personal data; withdraw consent for data processing; object to or restrict certain processing activities; request data portability. To exercise these rights, please contact us at bnhpteam@gmail.com. We will respond to verified requests within a reasonable timeframe in accordance with applicable law.`,
    },
    {
        title: '9. Children\'s Privacy',
        content: `The Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal information, please contact us immediately and we will take steps to delete such information.`,
    },
    {
        title: '10. Changes to This Policy',
        content: `BNHP reserves the right to update this Privacy Policy at any time. We will notify users of material changes by posting the updated policy on this page with a revised effective date. Your continued use of the Services after any changes constitutes acceptance of the updated Privacy Policy.`,
    },
    {
        title: '11. Contact Us',
        content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at: bnhpteam@gmail.com`,
    },
];

export default function PrivacyMod() {
    return (
        <div className='max-yt:px-[var(--padx)] w-full'>
            <div className="w-base min-h-screen border border-b-0 border-t-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat text-white relative">
                <Pagination
                    className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none'
                    page='01'
                    title='PRIVACY POLICY'
                    desc='LEGAL'
                />
                <div className='pt-[64px] pb-20 px-10 max-qw:px-5'>
                    <div className='max-w-[800px] mx-auto'>
                        {/* Header */}
                        <div className='mb-12 pt-8'>
                            <div className='text-[11px] tracking-[0.2em] text-[#C6AC6F] uppercase mb-3'>Legal Document</div>
                            <h1 className='text-[40px] font-bold leading-tight max-qw:text-[28px]' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                Privacy Policy
                            </h1>
                            <p className='text-[rgba(255,255,255,0.4)] text-[14px] mt-3'>
                                Last updated: June 2026 &nbsp;·&nbsp; Effective immediately upon publication
                            </p>
                            <div className='w-full h-px bg-[#2B2B2B] mt-8' />
                        </div>

                        {/* Intro */}
                        <p className='text-[rgba(255,255,255,0.6)] text-[15px] leading-relaxed mb-10'>
                            BNHP ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the BNHP platform and related services.
                        </p>

                        {/* Sections */}
                        <div className='flex flex-col gap-y-10'>
                            {sections.map((sec, i) => (
                                <div key={i} className='border-l-2 border-[#2B2B2B] pl-6'>
                                    <h2 className='text-[16px] font-semibold text-white mb-3' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                        {sec.title}
                                    </h2>
                                    <p className='text-[rgba(255,255,255,0.55)] text-[14px] leading-[1.8]'>
                                        {sec.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className='w-full h-px bg-[#2B2B2B] mt-12 mb-6' />
                        <p className='text-[rgba(255,255,255,0.25)] text-[12px]'>
                            © {new Date().getFullYear()} BNHP. All rights reserved. This Privacy Policy is subject to change without notice.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
