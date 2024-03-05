import type { Options, Palette, SwatchLike } from './types'

import { createOptions } from './build-option'
import { createShades } from './shade'
import { createSwatch } from './swatch'

/**
 * @param swatchLike
 * @param options
 * @returns
 */
export function createPalette(swatchLike: SwatchLike, options?: Partial<Options>) {
  const swatchesArray = Array.isArray(swatchLike) ? swatchLike : Object.entries(swatchLike)
  const swatches = swatchesArray.map(([name, value]) => createSwatch(name, value) ?? null).filter(Boolean)

  const paletteOptions = createOptions(options)

  const palette: Palette[] = swatches.map(swatch => ({
    name: swatch.name,
    shades: createShades(swatch.color, paletteOptions),
  }))

  return palette
}
export const DEFAULT_PALETTES = [[]]
