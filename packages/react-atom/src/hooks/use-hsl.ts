import { useStore } from '@nanostores/react'

import { useColorAtomContext } from '../context'

export const useHSL = () => {
  const { colorAtom } = useColorAtomContext()
  const hsl = useStore(colorAtom.color)

  return hsl
}
