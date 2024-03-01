import type { Color, Oklch } from 'culori'

export type Shade = Oklch & {
  stop: number
}

export type Swatch = {
  color: Oklch
  name: string
}

export type CurveType = number[] | string
export type ColorOptions = {
  curve: CurveType
  /** default: 1 */
  end: number
  /** default: 0 */
  shift: number
  /** default: 0 */
  start: number
}

export type Options = {
  c: ColorOptions
  h: ColorOptions
  l: ColorOptions
  primary?: Color | string
  steps: number | number[]
} & Partial<ColorOptions>

export type Palette = {
  name: string
  shades: Shade[]
}
