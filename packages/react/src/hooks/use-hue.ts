import { useStore } from '@nanostores/react'

import { useColorContext } from '../context'

export const useHue = () => {
  const { color } = useColorContext()
  const h = useStore(color.hue)

  return [h, color.hue.set] as const
}
