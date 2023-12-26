import { useHue, useSaturation } from '@color-kit/react'

import { Slider } from './ui'

export const SaturationPicker = () => {
  const [hue] = useHue()
  const [saturation, setSaturation] = useSaturation()

  return (
    <Slider
      max={100}
      min={0}
      onValueChange={val => setSaturation(val[0]!)}
      step={1}
      thumbStyle={{
        backgroundColor: `hsl(${hue} ${saturation}% 50% / 1)`,
      }}
      trackStyle={{
        background: `linear-gradient(to right, hsl(${hue} 0% 50% / 1) 0%, hsl(${hue} 100% 50% / 1) 100%)`,
      }}
      value={[saturation]}
    />
  )
}
