import { useLightness } from '@color-kit/react'

import { Slider } from './ui'

export const LightnessPicker = () => {
  const [lightness, setLightness] = useLightness()

  return (
    <Slider
      max={100}
      min={0}
      onValueChange={val => setLightness(val[0]!)}
      step={1}
      thumbStyle={{
        backgroundColor: `hsl(0 0% ${lightness}% / 1)`,
      }}
      trackStyle={{
        background: `linear-gradient(to right, hsl(0 0% 0% / 1) 0%, hsl(0 0% 100% / 1) 100%)`,
      }}
      value={[lightness]}
    />
  )
}
