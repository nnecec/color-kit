import { useStore } from '@nanostores/react'

import { useColorAtomContext } from '../context'

export const useChroma = () => {
  const { colorAtom } = useColorAtomContext()

  const c = useStore(colorAtom.chroma)

  return [c, colorAtom.chroma.set] as const
}
