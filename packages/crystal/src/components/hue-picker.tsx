import { getHueBackground, useColorAtomContext, useHue } from '@color-kit/react-atom'

import type { SliderProps } from './ui'

import { to } from '../utils'
import { Slider } from './ui'

const GRADIENT_STOP = Object.entries(getHueBackground())
  .map(([pos, color]) => `${color} ${pos}%`)
  .join(', ')

export const HuePicker = (props: SliderProps) => {
  const [hue, setHue] = useHue()
  const { thumb } = useColorAtomContext()

  return (
    <Slider
      maxValue={360}
      minValue={0}
      size={thumb.size}
      step={1}
      {...props}
      onChange={val => setHue(val)}
      thumbStyle={{
        backgroundColor: `hsl(${hue} 100% 50% / 1)`,
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
