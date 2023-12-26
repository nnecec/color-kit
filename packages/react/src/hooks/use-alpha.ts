import { useStore } from '@nanostores/react'

import { useColorContext } from '../context'

export const useAlpha = () => {
  const { color } = useColorContext()

  const a = useStore(color.alpha)

  return [a, color.alpha.set] as const
}
