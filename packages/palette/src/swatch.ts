import type { Swatch } from './types'

import { toColor } from './utils'

export function createSwatch(name: string, color: any): Swatch | null {
  const hex = toColor(color)!

  return {
    color: hex,
    name,
  }
}
