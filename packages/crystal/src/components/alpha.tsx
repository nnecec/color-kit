import { useAlpha, useHue } from '@color-kit/react'

import { Slider } from './ui'

export const AlphaPicker = () => {
  const [hue] = useHue()
  const [alpha, setAlpha] = useAlpha()

  return (
    <Slider
      max={1}
      min={0}
      onValueChange={val => setAlpha(val[0]!)}
      step={0.01}
      thumbStyle={{
        backgroundColor: `hsl(${hue} 100% 50% / ${alpha})`,
      }}
      trackStyle={{
        backgroundColor: '#fff',
        backgroundImage: `linear-gradient(to right, hsl(${hue} 100% 100% / 0) 0%, hsl(${hue} 100% 50% / 1) 100%), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')`,
        backgroundRepeat: 'repeat',
      }}
      value={[alpha]}
    />
  )
}
