'use client'

import type { PropsWithChildren } from 'react'

import type { ColorKitProps } from './types'

import { ColorProvider } from './context'

export const ColorKit = ({ children, color }: PropsWithChildren<ColorKitProps>) => {
  return (
    <ColorProvider
      value={{
        color,
      }}
    >
      {children}
    </ColorProvider>
  )
}
