import type { Metadata } from 'next'

// eslint-disable-next-line camelcase
import { Roboto_Mono } from 'next/font/google'

import './globals.css'

const font = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Welcome to the ColorKit world!',
  title: 'ColorKit',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark" lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
