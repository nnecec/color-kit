import { useLightness } from '@color-kit/react-atom'

import type { SliderProps } from './ui'

import { Slider } from './ui'
import { to } from '../utils'

export const LightnessPicker = (props: SliderProps) => {
  const [lightness, setLightness] = useLightness()

  return (
    <Slider
      maxValue={100}
      minValue={0}
      step={1}
      {...props}
      onChange={val => setLightness(val)}
      thumbStyle={{
        backgroundColor: `hsl(0 0% ${lightness}% / 1)`,
      }}
      trackStyle={{
        background: `linear-gradient(${to(props.orientation)}, hsl(0 0% 0% / 1) 0%, hsl(0 0% 100% / 1) 100%)`,
      }}
      value={lightness}
    />
  )
}
