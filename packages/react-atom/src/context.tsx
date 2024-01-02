'use client'
import type { PropsWithChildren } from 'react'
import { createContext, useContext, useRef } from 'react'

import { ColorAtom } from '@color-kit/atom'

import type { ColorAtomProps } from './types'

export const ColorAtomContext = createContext<ColorAtomProps | null>(null)

type ColorAtomProviderProps = {
  value?: ColorAtomProps
}

export const useColorAtom = (value?: ColorAtomProps): ColorAtomProps => {
  const ref = useRef(value)

  if (!ref.current || !ref.current.colorAtom) {
    ref.current = {
      thumb: { size: 8 },
      ...ref.current,
      colorAtom: value?.colorAtom ?? new ColorAtom(),
    }
  }

  return ref.current
}

export const ColorAtomProvider = ({ children, value }: PropsWithChildren<ColorAtomProviderProps>) => {
  const colorAtom = useColorAtom(value)
  return <ColorAtomContext.Provider value={colorAtom}>{children}</ColorAtomContext.Provider>
}

export const useColorAtomContext = () => {
  const colorAtom = useContext(ColorAtomContext)

  if (!colorAtom) {
    throw new Error('Any component must be used within a ColorKit or a ColorProvider')
  }

  return colorAtom as Required<ColorAtomProps>
}
