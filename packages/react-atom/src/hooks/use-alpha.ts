import { useStore } from '@nanostores/react'

import { useColorAtomContext } from '../context'

export const useAlpha = () => {
  const { colorAtom } = useColorAtomContext()

  const a = useStore(colorAtom.alpha)

  return [a, colorAtom.alpha.set] as const
}
