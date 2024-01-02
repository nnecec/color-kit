import { useHue, useSaturation } from '@color-kit/react-atom'

import type { SliderProps } from './ui'

import { to } from '../utils'
import { Slider } from './ui'

export const SaturationPicker = (props: SliderProps) => {
  const [hue] = useHue()
  const [saturation, setSaturation] = useSaturation()

  return (
    <Slider
      maxValue={100}
      minValue={0}
      step={1}
      {...props}
      onChange={val => setSaturation(val)}
      thumbStyle={{
        backgroundColor: `hsl(${hue} ${saturation}% 50% / 1)`,
      }}
      trackStyle={{
        background: `linear-gradient(${to(props.orientation)}, hsl(${hue} 0% 50% / 1) 0%, hsl(${hue} 100% 50% / 1) 100%)`,
      }}
      value={saturation}
    />
  )
}
