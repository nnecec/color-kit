import type { DefaultColors } from 'tailwindcss/types/generated/colors'

// import { inspect } from 'node:util'

import tailwindColors from 'tailwindcss/colors'

import { createPalette as ColorKitCreatePalette } from '@color-kit/palette'

import type { DefaultColorsKeys, Options } from './types'

import { DEFAULT_COLOR_KEYS, toSteps } from './utils'

export const createPalette = (options: Options) => {
  const { colors: customColors, dark, interval, primary } = options ?? {}
  const colors =
    typeof customColors === 'number' || !customColors ?
      Object.fromEntries(
        DEFAULT_COLOR_KEYS.map(colorName => {
          const color =
            tailwindColors[colorName as DefaultColorsKeys][
              (customColors as keyof DefaultColors[DefaultColorsKeys]) ?? 500
            ]!
          return [colorName, color] as [string, string]
        }).filter(Boolean),
      )
    : customColors

  const steps = toSteps(interval)

  const palette = ColorKitCreatePalette(colors, {
    dark,
    primary,
    steps: steps.toReversed().map(value => value / 10),
  })

  return Object.fromEntries(
    palette.map(swatch => [
      swatch.name,
      {
        DEFAULT: swatch.default,
        ...Object.fromEntries(swatch.shades.map((shade, i) => [steps[i], shade.color])),
      },
    ]),
  )
}
