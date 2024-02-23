import { useStore } from '@nanostores/react'

import { useColorAtomContext } from '../context'

export const useColor = () => {
  const { colorAtom } = useColorAtomContext()

  return useStore(colorAtom.color)
}
