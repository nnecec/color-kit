import type { Color, Oklch as CuloriOklch } from 'culori'

import type { Easing, EasingKey } from './easing'

export type Shade = Oklch & {
  step: number
}

export type Swatch = {
  color: Oklch
  name: string
}

export type ColorOptions = {
  base: number
  easing: Easing | EasingKey
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

export { type Easing } from './easing'

export type Oklch = Required<Pick<CuloriOklch, 'c' | 'h' | 'l'>>
