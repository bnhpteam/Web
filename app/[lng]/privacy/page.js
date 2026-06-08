export const dynamic = 'force-dynamic';
import PrivacyMod from './mod1';

export const metadata = {
    title: 'Privacy Policy — BNHP',
    description: 'Read the BNHP Privacy Policy. Learn how we collect, use, and protect your personal data when you use the BNHP platform.',
    openGraph: {
        title: 'Privacy Policy — BNHP',
        description: 'Read the BNHP Privacy Policy. Learn how we collect, use, and protect your personal data when you use the BNHP platform.',
        url: 'https://www.bnhp.ai',
        siteName: 'BNHP',
        images: [{ url: '/assets/imgs/og-image.png', width: 1200, height: 630 }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy — BNHP',
        description: 'Read the BNHP Privacy Policy. Learn how we collect, use, and protect your personal data when you use the BNHP platform.',
        images: ['/assets/imgs/og-image.png'],
    },
};


export default function PrivacyPage() {
    return <PrivacyMod />;
}
