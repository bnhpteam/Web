'use client';
import Pagination from '../components/pagination';

const sections = [
    {
        title: '1. Acceptance of Terms',
        content: `By accessing or using the BNHP platform, website (bnhp.ai), or any associated services (collectively, the "Services"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not access or use the Services. BNHP reserves the right to update or modify these Terms at any time without prior notice. Your continued use of the Services following any changes constitutes acceptance of the revised Terms.`,
    },
    {
        title: '2. Eligibility',
        content: `You must be at least 18 years of age to use the Services. By using the Services, you represent and warrant that you meet this age requirement and that you are not located in, or a resident of, any jurisdiction where participation in blockchain-based token activities is prohibited or restricted by applicable law, including but not limited to the United States, China, or any OFAC-sanctioned territories.`,
    },
    {
        title: '3. Description of Services',
        content: `BNHP is a Web3 AI-powered social finance platform that integrates self-custody wallet infrastructure with social media features. The Services include access to the BNHP application, the NPH token claim interface, informational content, and related developer tools. The Services are provided on an "as is" and "as available" basis. BNHP does not guarantee uninterrupted or error-free access to the Services.`,
    },
    {
        title: '4. NPH Token',
        content: `The NPH token is a utility token native to the BNHP ecosystem, deployed on the Ethereum (ERC-20) network. NPH tokens are intended solely for use within the BNHP platform for governance participation, staking, and in-app rewards. NPH tokens do not represent equity, ownership, or any financial instrument. Participation in any token sale or claim event is subject to applicable laws and regulations. BNHP makes no representations regarding the future value of NPH tokens.`,
    },
    {
        title: '5. Prohibited Activities',
        content: `You agree not to: (a) use the Services for any unlawful purpose or in violation of any applicable laws; (b) attempt to gain unauthorized access to any portion of the Services or any related systems; (c) engage in any activity that disrupts, interferes with, or imposes an unreasonable burden on the Services or associated infrastructure; (d) use automated tools, bots, or scripts to access or interact with the Services without express written permission; (e) engage in market manipulation, wash trading, or any deceptive practices related to NPH tokens.`,
    },
    {
        title: '6. Intellectual Property',
        content: `All content, trademarks, logos, and intellectual property displayed on or through the Services are the exclusive property of BNHP or its licensors. You are granted a limited, non-exclusive, non-transferable license to access and use the Services for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works of, or publicly display any content from the Services without prior written consent from BNHP.`,
    },
    {
        title: '7. Disclaimer of Warranties',
        content: `THE SERVICES ARE PROVIDED WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. BNHP DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR FREE FROM ERRORS OR VIRUSES. YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK.`,
    },
    {
        title: '8. Limitation of Liability',
        content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BNHP AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICES, EVEN IF BNHP HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.`,
    },
    {
        title: '9. Risk Disclosure',
        content: `Participating in blockchain-based activities, including acquiring, holding, or using NPH tokens, involves significant risks. The value of digital assets can be highly volatile. Regulatory changes may adversely affect the availability or use of the Services. Smart contracts may contain bugs or vulnerabilities. You acknowledge and accept all risks associated with your use of the Services and any interaction with digital assets.`,
    },
    {
        title: '10. Governing Law',
        content: `These Terms shall be governed by and construed in accordance with applicable international laws. Any disputes arising under or in connection with these Terms shall be resolved through binding arbitration, except where prohibited by law. You waive any right to participate in class action lawsuits or class-wide arbitration.`,
    },
    {
        title: '11. Contact',
        content: `If you have any questions regarding these Terms, please contact us at: bnhpteam@gmail.com`,
    },
];

export default function TermsMod() {
    return (
        <div className='max-yt:px-[var(--padx)] w-full'>
            <div className="w-base min-h-screen border border-b-0 border-t-0 border-[#2B2B2B] bg-[#0B0B0B] bg-[url(/assets/imgs/fixed-bg.png)] bg-cover bg-no-repeat text-white relative">
                <Pagination
                    className='!absolute top-0 border-b border-[#2B2B2B] max-qw:border-none'
                    page='01'
                    title='TERMS OF USE'
                    desc='LEGAL'
                />
                <div className='pt-[64px] pb-20 px-10 max-qw:px-5'>
                    <div className='max-w-[800px] mx-auto'>
                        {/* Header */}
                        <div className='mb-12 pt-8'>
                            <div className='text-[11px] tracking-[0.2em] text-[#C6AC6F] uppercase mb-3'>Legal Document</div>
                            <h1 className='text-[40px] font-bold leading-tight max-qw:text-[28px]' style={{ fontFamily: 'Orbitron, sans-serif' }}>
                                Terms of Use
                            </h1>
                            <p className='text-[rgba(255,255,255,0.4)] text-[14px] mt-3'>
                                Last updated: June 2026 &nbsp;·&nbsp; Effective immediately upon publication
                            </p>
                            <div className='w-full h-px bg-[#2B2B2B] mt-8' />
                        </div>

                        {/* Intro */}
                        <p className='text-[rgba(255,255,255,0.6)] text-[15px] leading-relaxed mb-10'>
                            Please read these Terms of Use carefully before using the BNHP platform and its associated services. These Terms constitute a legally binding agreement between you and BNHP regarding your use of the Services.
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
                            © {new Date().getFullYear()} BNHP. All rights reserved. These Terms are subject to change without notice.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
