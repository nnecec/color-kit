import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import Link from 'next/link'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Welcome to the ColorKit world!',
  title: 'ColorKit',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark" lang="en">
      <body className={inter.className}>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link className="btn btn-ghost text-xl" href="/">
              ColorKit
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/color">Color</Link>
              </li>
              <li>
                <Link href="/crystal">Crystal</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  )
}
