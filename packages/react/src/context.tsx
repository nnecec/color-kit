import type { PropsWithChildren } from 'react'
import { createContext, useContext, useRef } from 'react'

import { ColorAtom } from '@color-kit/atom'

import type { ColorKitProps } from './types'

export const ColorContext = createContext<ColorKitProps | null>(null)

type ColorProviderProps = {
  value?: ColorKitProps
}

export const useColorkit = (colorkit?: ColorKitProps): ColorKitProps => {
  const colorkitRef = useRef(colorkit)

  if (!colorkitRef.current) {
    colorkitRef.current = colorkit ?? { color: new ColorAtom() }
  }

  return colorkitRef.current
}

export const ColorProvider = ({ children, value }: PropsWithChildren<ColorProviderProps>) => {
  const colorkit = useColorkit(value)
  return <ColorContext.Provider value={colorkit}>{children}</ColorContext.Provider>
}

export const useColorContext = () => {
  const colorkit = useContext(ColorContext)

  if (!colorkit) {
    throw new Error('Any component must be used within a ColorKit or a ColorProvider')
  }

  return colorkit
}
