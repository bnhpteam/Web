import './global.css'
import { Header } from './components/header'
import { Footer } from './components/footer'
import Contents from './components/contents'
import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import { getT } from '../i18n'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://www.bnhp.ai'),
    title: {
      default: 'BNHP — The Next Generation of Web3',
      template: '%s | BNHP',
    },
    description: 'BNHP is a next-generation Web3 application platform built on Ethereum. Earn $NPH tokens, access decentralized finance tools, and participate in the public sale.',
    keywords: [
      'BNHP', 'NPH token', '$NPH', 'Web3', 'DeFi', 'Ethereum', 'ERC-20',
      'blockchain', 'crypto', 'public sale', 'token sale', 'decentralized finance',
    ],
    authors: [{ name: 'BNHP Team', url: 'https://www.bnhp.ai' }],
    creator: 'BNHP Team',
    publisher: 'BNHP',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://www.bnhp.ai',
      siteName: 'BNHP',
      title: 'BNHP — The Next Generation of Web3',
      description: 'BNHP is a next-generation Web3 application platform built on Ethereum. Earn $NPH tokens, access decentralized finance tools, and participate in the public sale.',
      images: [
        {
          url: '/assets/imgs/og-image.png',
          width: 1200,
          height: 630,
          alt: 'BNHP — The Next Generation of Web3',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'BNHP — The Next Generation of Web3',
      description: 'BNHP is a next-generation Web3 application platform built on Ethereum. Earn $NPH tokens and participate in the public sale.',
      images: ['/assets/imgs/og-image.png'],
      creator: '@BNHPofficial',
      site: '@BNHPofficial',
    },
    alternates: {
      canonical: 'https://www.bnhp.ai',
      languages: {
        'en': 'https://www.bnhp.ai/en',
        'zh': 'https://www.bnhp.ai/zh',
      },
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  }
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.bnhp.ai/#organization',
      name: 'BNHP',
      url: 'https://www.bnhp.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.bnhp.ai/assets/imgs/brand-logo-v1-black-gold.png',
        width: 1291,
        height: 745,
      },
      description: 'BNHP is a next-generation Web3 application platform built on Ethereum.',
      sameAs: [
        'https://twitter.com/BNHPofficial',
        'https://t.me/bnhp_official',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.bnhp.ai/#website',
      url: 'https://www.bnhp.ai',
      name: 'BNHP',
      description: 'The Next Generation of Web3',
      publisher: { '@id': 'https://www.bnhp.ai/#organization' },
      inLanguage: ['en', 'zh'],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.bnhp.ai/#webpage',
      url: 'https://www.bnhp.ai',
      name: 'BNHP — The Next Generation of Web3',
      isPartOf: { '@id': 'https://www.bnhp.ai/#website' },
      about: { '@id': 'https://www.bnhp.ai/#organization' },
      description: 'BNHP is a next-generation Web3 application platform built on Ethereum. Earn $NPH tokens, access decentralized finance tools, and participate in the public sale.',
    },
  ],
}

export default async function RootLayout({ children, params }) {
  const { lng } = await params
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body>
        <script src="/assets/js/rive.js"></script>
        <Header />
        <Contents>
          {children}
          <Footer />
        </Contents>
      </body>
    </html>
  )
}
