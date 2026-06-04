import BrandMod1 from './mod1'

export const metadata = {
    title: 'Brand Guidelines — BNHP',
    description: 'Official BNHP brand guidelines. Download logos, color palettes, typography specifications, and usage rules for the BNHP visual identity.',
    openGraph: {
        title: 'Brand Guidelines — BNHP',
        description: 'Official BNHP brand guidelines. Download logos, color palettes, typography specifications, and usage rules for the BNHP visual identity.',
        url: 'https://www.bnhp.ai',
        siteName: 'BNHP',
        images: [{ url: '/assets/imgs/og-image.png', width: 1200, height: 630 }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Brand Guidelines — BNHP',
        description: 'Official BNHP brand guidelines. Download logos, color palettes, typography specifications, and usage rules for the BNHP visual identity.',
        images: ['/assets/imgs/og-image.png'],
    },
};


export default async function BrandPage() {
    return (
        <>
            <div className="overflow-x-hidden">
                <BrandMod1 />
            </div>
        </>
    )
}
