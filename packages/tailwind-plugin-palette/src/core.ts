import { createPalette as ColorKitCreatePalette } from '@color-kit/palette'

import type { Options } from './types'

import { toSteps } from './utils'

export const createPalette = (options: Options) => {
  const { colors, dark, interval, primary, reversed } = options ?? {}

  if (!colors) {
    throw new Error('You must provide colors map.')
  }

  const steps = toSteps(interval)
  const palette = ColorKitCreatePalette(colors, {
    dark,
    primary,
    steps: Boolean(reversed) ? steps.map(value => value / 10) : steps.toReversed().map(value => value / 10),
  })

  return Object.fromEntries<Record<string, string>>(
    palette.map(swatch => [
      swatch.name,
      {
        DEFAULT: swatch.default,
        ...Object.fromEntries(swatch.shades.map((shade, i) => [steps[i], shade.color])),
      },
    ]),
  )
}
