import type { Hct } from '@material/material-color-utilities'

export type Shade = {
  color: string
  step: number
}

export type Swatch = {
  color: string // hex
  name: string
}

type ColorOptions = {
  base: number
  /** default: 1 */
  end: number
  /** default: 0 */
  shift?: number
  /** default: 0 */
  start: number
}

export type Options = {
  /** Provide a primary color */
  primary?: unknown
  /** Minimum 0 to maximum 100 */
  steps: number | number[]
  /** Also generate dark mode palette */
  dark?: boolean
} & Partial<ColorOptions>

export type ParsedOptions = {
  primary?: string
  steps: number[]
  dark: boolean
}

export type Palette = {
  name: string
  default?: string
  shades: Shade[]
}

export { type Easing } from './easing'

export type Color = Hct

export type SwatchLike = Record<string, string>
