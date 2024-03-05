import type { Hct } from '@material/material-color-utilities'

import type { Easing, EasingKey } from './easing'

export type Shade = Color & {
  step: number
}

export type Swatch = {
  color: string // hex
  name: string
}

export type ColorOptions = {
  base: number
  /** default: 1 */
  end: number
  /** default: 0 */
  shift?: number
  /** default: 0 */
  start: number
}

export type Options = {
  primary?: unknown
  /** from 0 to 100 */
  steps: number | number[]
} & Partial<ColorOptions>

export type ParsedOptions = {
  primary?: string
  steps: number[]
}

export type Palette = {
  name: string
  shades: any[]
}

export { type Easing } from './easing'

export type Color = Hct

export type SwatchLike = [string, string][] | { [key: string]: string }
