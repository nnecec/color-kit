import type { Options, Palette } from './types'

import { createOptions } from './build-option'
import { createShades } from './shade'
import { createSwatch } from './swatch'

/**
 * palx(['red', '#f00'], {
 *    primary: '#fde',
 *    steps: 10 | [50, 100],
 *    l: {
 *      start: 0,
 *      end: 0,
 *      shift: 0,
 *      curve: 'linear'
 *    },
 *    c: {
 *      start: 0,
 *      end: 0,
 *      shift: 0,
 *      curve: 'linear'
 *    },
 *    h: {
 *      start: 0,
 *      end: 0,
 *      shift: 0
 *      curve: 'linear'
 *    },
 * })
 *
 *
 * @param swatchLike
 * @param options
 * @returns
 */
export function palx(swatchLike: [string, string][], options?: Partial<Options>) {
  const swatches = swatchLike.map(([name, value]) => createSwatch(name, value))

  const { colorful, gray } = Object.groupBy(swatches, shade => {
    const { color } = shade
    if (!color) {
      return 'none'
    } else if (color.c > 0.05) {
      return 'colorful'
    } else {
      return 'gray'
    }
  })

  const palette: Palette[] = []

  const paletteOptions = createOptions(options)

  if (colorful) {
    for (const shade of colorful) {
      console.log(shade.name, shade.color, createShades(shade.color, paletteOptions))
      palette.push({ name: shade.name, shades: createShades(shade.color, paletteOptions) })
    }
  }

  // if (gray) {
  //   for (const shade of gray) {
  //     palette.push({
  //       name: shade.name,
  //       shades: createGrayShades(shade, options?.primary ?? undefined, options?.steps),
  //     })
  //   }
  // }

  return palette
}

export const DEFAULT_PALETTES = [[]]
