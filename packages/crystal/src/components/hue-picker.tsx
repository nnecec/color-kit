import { getHueBackground, useColorAtomContext, useHue } from '@color-kit/react-atom'

import type { SliderProps } from './ui'

import { to } from '../utils'
import { Slider } from './ui'

const GRADIENT_STOP = Object.entries(getHueBackground())
  .map(([pos, hue]) => `oklch(50% 100% ${hue} / 1) ${pos}%`)
  .join(', ')

export const HuePicker = (props: SliderProps) => {
  const [hue, setHue] = useHue()
  const { thumb } = useColorAtomContext()

  return (
    <Slider
      aria-label="hue picker"
      maxValue={360}
      minValue={0}
      size={thumb.size}
      step={1}
      {...props}
      onChange={val => setHue(val)}
      thumbStyle={{
        backgroundColor: `oklch(50% 100% ${hue} / 1)`,
      }}
      trackStyle={{
        background: `linear-gradient(${to(props.orientation)},
          ${GRADIENT_STOP}
        )`,
      }}
      value={hue}
    />
  )
}
