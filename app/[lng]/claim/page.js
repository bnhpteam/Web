import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Claim $NPH Tokens — BNHP',
    description: 'Claim your $NPH tokens on the BNHP platform.',
};

export default async function ClaimPage() {
    redirect('https://app.bnhp.ai/claim');
}
