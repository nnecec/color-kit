import { Hct, TemperatureCache, argbFromHex, hexFromArgb } from '@material/material-color-utilities'

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
    default: swatch.color,
    name: swatch.name,
    shades: createShades(swatch.color, paletteOptions),
  }))

  if (paletteOptions.primary) {
    const temperatureCache = new TemperatureCache(Hct.fromInt(argbFromHex(paletteOptions.primary)))

    palette.unshift(
      {
        default: paletteOptions.primary,
        name: 'primary',
        shades: createShades(paletteOptions.primary, paletteOptions),
      },
      {
        default: paletteOptions.primary,
        name: 'secondary',
        shades: createShades(hexFromArgb(temperatureCache.complement.toInt()), paletteOptions),
      },
    )
  }

  return palette
}
