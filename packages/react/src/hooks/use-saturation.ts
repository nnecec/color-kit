import { useStore } from '@nanostores/react'

import { useColorContext } from '../context'

export const useSaturation = () => {
  const { color } = useColorContext()

  const s = useStore(color.saturation)

  return [s, color.saturation.set] as const
}
