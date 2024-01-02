import { useAlpha, useColorAtomContext, useHue } from '@color-kit/react-atom'

import type { SliderProps } from './ui'

import { to } from '../utils'
import { Slider } from './ui'

export const AlphaPicker = (props: SliderProps) => {
  const [hue] = useHue()
  const [alpha, setAlpha] = useAlpha()
  const { thumb } = useColorAtomContext()

  return (
    <Slider
      maxValue={1}
      minValue={0}
      size={thumb.size}
      step={0.01}
      {...props}
      onChange={val => setAlpha(val)}
      thumbStyle={{
        ...props.thumbStyle,
        backgroundColor: `hsl(${hue} 100% 50% / ${alpha})`,
      }}
      trackStyle={{
        ...props.trackStyle,
        backgroundColor: '#fff',
        backgroundImage: `linear-gradient(${to(props.orientation)}, hsl(${hue} 100% 100% / 0) 0%, hsl(${hue} 100% 50% / 1) 100%), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')`,
        backgroundRepeat: 'repeat',
      }}
      value={alpha}
    />
  )
}
