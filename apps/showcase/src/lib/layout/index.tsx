import type { ReactNode } from 'react'

import Meta from './meta'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Meta />
      <div className="flex min-h-screen flex-col">
        <main className="wrapper">{children}</main>
      </div>
    </>
  )
}

export default Layout
