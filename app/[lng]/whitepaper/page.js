import Mod1 from './mod1'
import Mod2 from './mod2'
import Mod3 from './mod3'
import Mod4 from './mod4'
import Mod5 from './mod5'
import Mod6 from './mod6'

export const metadata = {
    title: 'White Paper — BNHP',
    description: 'Read the official BNHP White Paper. Learn about the platform architecture, $NPH tokenomics, roadmap, and how BNHP is building the next generation of Web3 on Ethereum.',
    openGraph: {
        title: 'White Paper — BNHP',
        description: 'Read the official BNHP White Paper. Learn about the platform architecture, $NPH tokenomics, roadmap, and how BNHP is building the next generation of Web3 on Ethereum.',
        url: 'https://www.bnhp.ai',
        siteName: 'BNHP',
        images: [{ url: '/assets/imgs/og-image.png', width: 1200, height: 630 }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'White Paper — BNHP',
        description: 'Read the official BNHP White Paper. Learn about the platform architecture, $NPH tokenomics, roadmap, and how BNHP is building the next generation of Web3 on Ethereum.',
        images: ['/assets/imgs/og-image.png'],
    },
};



export default async function WhitePaper() {
    return (
        <>
            <div className="overflow-x-hidden">
                <Mod1 />
                <Mod2 />
                <Mod3 />
                <Mod4 />
                <Mod5 />
                <Mod6 />
            </div>
        </>
    )
}
