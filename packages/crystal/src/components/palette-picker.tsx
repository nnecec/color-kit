import type { HTMLAttributes } from 'react'

import { useColorAtomContext, useHue, useLightness, useSaturation } from '@color-kit/react-atom'

import type { InteractiveProps } from './ui'

import { Interactive } from './ui'

type PalettePickerProps = InteractiveProps & HTMLAttributes<HTMLDivElement>

export const PalettePicker = (props: PalettePickerProps) => {
  const [hue] = useHue()
  const [s, setS] = useSaturation()
  const [l, setL] = useLightness()
  const { thumb } = useColorAtomContext()

  const onChange = ({ x, y }: { x: number; y: number }) => {
    if (x === undefined || y === undefined) return

    const nextColor = {
      l: (1 - y) * 100 * (1 - x * 0.5),
      s: x * 100,
    }
    setS(nextColor.s)
    setL(nextColor.l)
  }

  return (
    <Interactive
      {...props}
      onChange={onChange}
      style={{
        ...props.style,
        backgroundColor: `hsl(${hue} 100% 50%)`,
        backgroundImage: `linear-gradient(0deg, #000, transparent),linear-gradient(90deg,#fff,hsl(0 0% 100% / 0))`,
      }}
      thumbStyle={{
        backgroundColor: `hsl(${hue} ${s}% ${l}%)`,
        height: thumb.size,
        width: thumb.size,
      }}
      value={{
        x: s / 100,
        y: 1 - l / 100 / (1 - (s / 100) * 0.5),
      }}
    />
  )
}
