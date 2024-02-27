import type { Options } from './types'

import { createShade } from './shade'
import { createGraySwatches, createSwatches } from './swatch'

export function palx(shadesLike: [string, string][], options?: Options) {
  const shades = shadesLike.map(([name, value]) => createShade(name, value))

  const { colorful, gray } = Object.groupBy(shades, shade => {
    const { color } = shade
    if (!color) {
      return 'none'
    } else if (color.c > 0.04) {
      return 'colorful'
    } else {
      return 'gray'
    }
  })

  const palette = []

  if (colorful) {
    for (const shade of colorful) {
      palette.push({ color: shade.color, name: shade.name, swatches: createSwatches(shade, options?.stops) })
    }
  }

  if (gray) {
    for (const shade of gray) {
      palette.push({
        color: shade.color,
        name: shade.name,
        swatches: createGraySwatches(shade, options?.primary ?? undefined, options?.stops),
      })
    }
  }

  return palette
}

export const DEFAULT_PALETTES = [[]]
