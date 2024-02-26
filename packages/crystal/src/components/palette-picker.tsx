import type { HTMLAttributes } from 'react'

import { useChroma, useColorAtomContext, useHue, useLightness } from '@color-kit/react-atom'

import type { InteractiveProps } from './ui'

import { Interactive } from './ui'

type PalettePickerProps = InteractiveProps & HTMLAttributes<HTMLDivElement>

export const PalettePicker = (props: PalettePickerProps) => {
  const { size } = props
  const [hue] = useHue()
  const [c, setC] = useChroma()
  const [l, setL] = useLightness()
  const { thumb } = useColorAtomContext()

  const onChange = ({ x, y }: { x: number; y: number }) => {
    if (x === undefined || y === undefined) return

    const nextColor = {
      l: (1 - y) * 100 * (1 - x * 0.5),
      s: x * 100,
    }
    setC(nextColor.s)
    setL(nextColor.l)
  }

  return (
    <Interactive
      {...props}
      onChange={onChange}
      style={{
        ...props.style,
        backgroundColor: `oklch(50% 100% ${hue})`,
        backgroundImage: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg,#fff,oklch(100% 0% 0 / 0))`,
      }}
      thumbStyle={{
        backgroundColor: `oklch(${l}% ${c}% ${hue})`,
        height: size ?? thumb.size,
        width: size ?? thumb.size,
      }}
      value={{
        x: c / 100,
        y: 1 - l / 100 / (1 - (c / 100) * 0.5),
      }}
    />
  )
}
