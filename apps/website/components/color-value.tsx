import { useColor } from '@color-kit/react-atom'

export const ColorValue = () => {
  const { a, c, h, l } = useColor()

  return (
    <span>
      oklch({l.toFixed(0)}% {c.toFixed(0)}% {h} / {(a * 100).toFixed(0)}%)
    </span>
  )
}
