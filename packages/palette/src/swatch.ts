import type { Color } from 'culori'

import type { Swatch } from './types'

import { oklch } from './utils'

export function createSwatch(name: string, color: Color | string): Swatch {
  const oklchColor = oklch(color)!
  return {
    color: {
      c: oklchColor.c!,
      h: oklchColor.h!,
      l: oklchColor.l!,
    },
    name,
  }
}
