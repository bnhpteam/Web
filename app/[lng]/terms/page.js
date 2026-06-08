export const dynamic = 'force-dynamic';
import TermsMod from './mod1';

export const metadata = {
    title: 'Terms of Use — BNHP',
    description: 'Read the BNHP Terms of Use. Understand the rules and conditions for using the BNHP platform, $NPH token, and related services.',
    openGraph: {
        title: 'Terms of Use — BNHP',
        description: 'Read the BNHP Terms of Use. Understand the rules and conditions for using the BNHP platform, $NPH token, and related services.',
        url: 'https://www.bnhp.ai',
        siteName: 'BNHP',
        images: [{ url: '/assets/imgs/og-image.png', width: 1200, height: 630 }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms of Use — BNHP',
        description: 'Read the BNHP Terms of Use. Understand the rules and conditions for using the BNHP platform, $NPH token, and related services.',
        images: ['/assets/imgs/og-image.png'],
    },
};


export default function TermsPage() {
    return <TermsMod />;
}
