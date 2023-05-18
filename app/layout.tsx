import '@/styles/globals.css'
import React from 'react'
import { Metadata } from 'next'

const siteName = '決め爺'
const description = 'あなたの代わりに爺さんが決めてくれます'
const url = 'https://kimeg.xyz/'

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    site: '@sh1n4ps',
    creator: '@sh1n4ps',
  },
  alternates: {
    canonical: url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className={`mx-auto max-w-screen-sm`}>{children}</body>
    </html>
  )
}
