import { useStore } from '@nanostores/react'

import { useColorAtomContext } from '../context'

export const useSaturation = () => {
  const { colorAtom } = useColorAtomContext()

  const s = useStore(colorAtom.saturation)

  return [s, colorAtom.saturation.set] as const
}
