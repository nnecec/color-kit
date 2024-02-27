import type { Color } from 'culori'

import type { Shade } from './types'

import { oklch } from './utils'

export function createShade(name: string, color: Color | string): Shade {
  return {
    color: oklch(color)!,
    name,
  }
}
