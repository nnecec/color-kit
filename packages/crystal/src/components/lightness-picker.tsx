import { useLightness } from '@color-kit/react-atom'

import type { SliderProps } from './ui'

import { to } from '../utils'
import { Slider } from './ui'

export const LightnessPicker = (props: SliderProps) => {
  const [lightness, setLightness] = useLightness()

  return (
    <Slider
      maxValue={1}
      minValue={0}
      step={0.01}
      {...props}
      onChange={val => setLightness(val)}
      thumbStyle={{
        backgroundColor: `oklch(${lightness * 100}% 0 0 / 1)`,
      }}
      trackStyle={{
        background: `linear-gradient(${to(props.orientation)}, oklch(0% 0% 0 / 1) 0%, oklch(100% 0% 0 / 1) 100%)`,
      }}
      value={lightness}
    />
  )
}
