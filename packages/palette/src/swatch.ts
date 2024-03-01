import type { Color } from 'culori'

import type { Swatch } from './types'

import { oklch } from './utils'

export function createSwatch(name: string, color: Color | string): Swatch {
  return {
    color: oklch(color)!,
    name,
  }
}
