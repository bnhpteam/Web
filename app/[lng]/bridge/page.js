export const dynamic = 'force-dynamic';
import BridgeMod1 from './mod1'

export const metadata = {
    title: 'BNHP Omnichain Bridge — NPH Token',
    description: 'Bridge your $NPH tokens seamlessly across Ethereum, BNB Chain, Arbitrum, and Base using LayerZero V2 OFT technology.',
    openGraph: {
        title: 'BNHP Omnichain Bridge — NPH Token',
        description: 'Bridge your $NPH tokens seamlessly across Ethereum, BNB Chain, Arbitrum, and Base using LayerZero V2 OFT technology.',
    },
    twitter: {
        title: 'BNHP Omnichain Bridge — NPH Token',
        description: 'Bridge your $NPH tokens seamlessly across Ethereum, BNB Chain, Arbitrum, and Base using LayerZero V2 OFT technology.',
    }
}

export default async function BridgePage({ params }) {
    const { lng } = await params;
    return (
        <main className="min-h-screen bg-[#0A0A0A] pt-[56px]">
            <BridgeMod1 lng={lng} />
        </main>
    )
}
