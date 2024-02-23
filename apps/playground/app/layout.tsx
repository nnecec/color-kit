import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import NextLink from 'next/link'

import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Welcome to the ColorKit world!',
  title: 'ColorKit',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
