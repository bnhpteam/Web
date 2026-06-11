import { redirect } from 'next/navigation';

export const metadata = {
    title: 'BNHP Omnichain Bridge — NPH Token',
    description: 'Bridge your $NPH tokens seamlessly across Ethereum, BNB Chain, Arbitrum, and Base using LayerZero V2 OFT technology.',
};

export default async function BridgePage() {
    redirect('https://app.bnhp.ai/bridge');
}
