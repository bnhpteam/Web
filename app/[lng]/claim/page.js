export const dynamic = 'force-dynamic';
import ClaimMod1 from './mod1'

export const metadata = {
    title: 'Claim $NPH Tokens — BNHP',
    description: 'Claim your $NPH tokens on the BNHP platform. Connect your Ethereum wallet, complete tasks, and participate in the BNHP token distribution event.',
    openGraph: {
        title: 'Claim $NPH Tokens — BNHP',
        description: 'Claim your $NPH tokens on the BNHP platform. Connect your Ethereum wallet, complete tasks, and participate in the BNHP token distribution event.',
        url: 'https://www.bnhp.ai',
        siteName: 'BNHP',
        images: [{ url: '/assets/imgs/og-image.png', width: 1200, height: 630 }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Claim $NPH Tokens — BNHP',
        description: 'Claim your $NPH tokens on the BNHP platform. Connect your Ethereum wallet, complete tasks, and participate in the BNHP token distribution event.',
        images: ['/assets/imgs/og-image.png'],
    },
};


export default async function ClaimPage() {
    return (
        <>
            <div className="overflow-x-hidden">
                <ClaimMod1 />
            </div>
        </>
    )
}
