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
  const { t } = await getT();
  return {
    title: "BNHP",
    description: "",
  }
}

export default async function RootLayout({
  children,
  params
}) {
  const { lng } = await params
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
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



