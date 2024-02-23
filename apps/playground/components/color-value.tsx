import { useColor } from '@color-kit/react-atom'

export const ColorValue = () => {
  const { a, c, h, l } = useColor()
  return (
    <div className="absolute bottom-1/2 w-screen pb-20 text-center text-8xl font-bold">
      oklch({l * 100}% {c * 100}% {h} / {a * 100}%)
    </div>
  )
}
