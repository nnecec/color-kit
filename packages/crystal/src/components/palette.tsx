import { getHue, useHue, useSaturation } from '@color-kit/react'

import { Interactive, Slider } from './ui'

export const PalettePicker = () => {
  const [hue] = useHue()
  const [saturation, setSaturation] = useSaturation()
  const h = getHue(hue)

  const updateColor = (x: number, y: number) => {
    const nextColor = ColorService.convert('hsv', {
      ...color.hsv,
      s: (x / width) * 100,
      v: 100 - (y / height) * 100,
    })

    onChange(nextColor)
  }

  return <Interactive />
}
