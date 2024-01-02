import { useStore } from '@nanostores/react'

import { useColorAtomContext } from '../context'

export const useLightness = () => {
  const { colorAtom } = useColorAtomContext()

  const l = useStore(colorAtom.lightness)

  return [l, colorAtom.lightness.set] as const
}
