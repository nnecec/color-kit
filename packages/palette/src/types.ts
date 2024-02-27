import type { Color, Oklch } from 'culori'

export type Shade = {
  color: Oklch
  name: string
}

export type Options = {
  primary?: Color | string
  stops?: number[]
}
