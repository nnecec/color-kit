import { useStore } from '@nanostores/react'

import { useColorContext } from '../context'

export const useLightness = () => {
  const { color } = useColorContext()

  const l = useStore(color.lightness)

  return [l, color.lightness.set] as const
}
