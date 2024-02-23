import { useChroma, useHue } from '@color-kit/react-atom'

import type { SliderProps } from './ui'

import { to } from '../utils'
import { Slider } from './ui'

export const ChromaPicker = (props: SliderProps) => {
  const [hue] = useHue()
  const [chroma, setChroma] = useChroma()

  return (
    <Slider
      maxValue={100}
      minValue={0}
      step={1}
      {...props}
      onChange={val => setChroma(val)}
      thumbStyle={{
        backgroundColor: `oklch(50% ${chroma}% ${hue} / 1)`,
      }}
      trackStyle={{
        background: `linear-gradient(${to(props.orientation)}, oklch(50% 0% ${hue} / 1) 0%, oklch(50% 100% ${hue} / 1) 100%)`,
      }}
      value={chroma}
    />
  )
}
