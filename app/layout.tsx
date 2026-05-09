import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {

  title: {
    default: 'GuidePFE',
    template: '%s | GuidePFE',
  },

  description:
    'Plateforme académique intelligente nouvelle génération pour gérer votre PFE, mémoire, méthodologie, CV ATS et assistant IA.',

  keywords: [
    'PFE',
    'mémoire',
    'méthodologie',
    'CV ATS',
    'assistant IA',
    'étudiant',
    'université',
    'GuidePFE',
  ],

  authors: [
    {
      name: 'GuidePFE',
    },
  ],

  creator: 'GuidePFE',

  metadataBase: new URL(
    'https://guidepfe.com'
  ),

  openGraph: {

    title: 'GuidePFE',

    description:
      'La plateforme intelligente pour réussir votre PFE.',

    siteName: 'GuidePFE',

    locale: 'fr_FR',

    type: 'website',
  },

  twitter: {

    card: 'summary_large_image',

    title: 'GuidePFE',

    description:
      'Plateforme académique intelligente nouvelle génération.',
  },

  icons: {

    icon: '/logo-guidepfe.png',

    shortcut:
      '/logo-guidepfe.png',

    apple:
      '/logo-guidepfe.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (

    <html
      lang="fr"
      suppressHydrationWarning
    >

      <body
    className="
      relative
      overflow-x-hidden
      bg-[#f8fafc]
      text-slate-900
      antialiased
    "
  >

    {/* GLOBAL GRID */}

    <div
      className="
        fixed
        inset-0
        -z-10
        bg-[linear-gradient(to_right,#dbe4f0_1px,transparent_1px),linear-gradient(to_bottom,#dbe4f0_1px,transparent_1px)]
        bg-[size:72px_72px]
        opacity-40
      "
    />

    {/* GLOBAL GRADIENT */}

    <div
      className="
        fixed
        inset-0
        -z-10
        bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.10),transparent_30%)]
      "
    />

    {children}

  </body>
    </html>

  )
}