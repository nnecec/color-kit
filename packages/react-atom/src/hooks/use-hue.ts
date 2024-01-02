import { useStore } from '@nanostores/react'

import { useColorAtomContext } from '../context'

export const useHue = () => {
  const { colorAtom } = useColorAtomContext()
  const h = useStore(colorAtom.hue)

  return [h, colorAtom.hue.set] as const
}
