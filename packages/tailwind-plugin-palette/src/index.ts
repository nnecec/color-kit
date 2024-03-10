import type { DefaultColors } from 'tailwindcss/types/generated/colors'

import { inspect } from 'node:util'

import tailwindColors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

import { createPalette } from '@color-kit/palette'

const DEFAULT_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const DEFAULT_COLOR_KEYS = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]
type DefaultColorsKeys = keyof DefaultColors

type Options = {
  /** define the color palette map, or provide a number means which color will be used from default tailwind colors */
  colors?: Record<string, string> | number
  dark?: boolean
  /** define the color stop's interval, it will be same as tailwind default color stops if not present. */
  interval?: number | number[]
  /** provide a primary color, it will generate primary shades */
  primary?: Record<string, number | string> | string
}

function toSteps(interval?: number | number[]) {
  let steps: number | number[] = DEFAULT_STEPS
  if (Array.isArray(interval)) {
    steps = interval
  } else if (typeof interval === 'number') {
    let current = 0
    steps = []
    while (current + interval < 1000) {
      steps.push(current + interval)
      current += interval
    }
    steps = steps
  } else {
    steps = DEFAULT_STEPS
  }
  return steps
}

export const withCSSVariables = () => {}

const palettePlugin = plugin.withOptions(
  function () {
    return function () {}
  },
  function (options?: Options) {
    const { colors: customColors, dark, interval, primary } = options ?? {}

    if (!customColors && !primary) {
      return {}
    }

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

    const palette = createPalette(colors, {
      dark,
      primary,
      steps: steps.toReversed().map(value => value / 10),
    })

    console.log(
      inspect(
        {
          ...tailwindColors,
          ...Object.fromEntries(
            palette.map(swatch => [
              swatch.name,
              {
                DEFAULT: swatch.default,
                ...Object.fromEntries(swatch.shades.map((shade, i) => [steps[i], shade.color])),
              },
            ]),
          ),
        },
        { colors: true },
      ),
    )

    return {
      theme: {
        colors: {
          ...tailwindColors,
          ...Object.fromEntries(
            palette.map(swatch => [
              swatch.name,
              {
                DEFAULT: swatch.default,
                ...Object.fromEntries(swatch.shades.map((shade, i) => [steps[i], shade.color])),
              },
            ]),
          ),
        },
      },
    }
  },
)

export default palettePlugin
