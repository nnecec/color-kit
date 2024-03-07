import plugin from 'tailwindcss/plugin'

import { createPalette } from '@color-kit/palette'

const DEFAULT_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(step => step / 10)

type Options = {
  /** define the color palette map, or provide a number means which color will be used from default tailwind colors */
  colors?: Record<string, string>
  dark?: boolean
  /** define the color stop's interval, it will be same as tailwind default color stops if not present. */
  interval?: number | number[]
  /** provide a primary color, it will generate primary shades */
  primary?: Record<string, number | string> | string
}

function toSteps(interval?: number | number[]) {
  let steps: number | number[] = DEFAULT_STEPS
  if (Array.isArray(interval)) {
    steps = interval.toReversed()
  } else if (typeof interval === 'number') {
    let start = 0
    steps = []
    while (start < 1000) {
      steps.push((start + interval) / 10)
      start += interval
    }
    steps = steps.toReversed()
  } else {
    steps = DEFAULT_STEPS.toReversed()
  }
  return steps
}

export const withCSSVariables = () => {}

const palettePlugin = plugin.withOptions(
  function () {
    return function () {}
  },
  function (options?: Options) {
    const { colors, dark, interval, primary } = options ?? {}

    if (!colors && !primary) {
      return {}
    }

    const palette = createPalette(colors ?? {}, {
      dark,
      primary,
      steps: toSteps(interval),
    })

    return {
      theme: {
        colors: {
          ...colors,
          ...Object.fromEntries(
            palette.map(swatch => [
              swatch.name,
              Object.fromEntries(swatch.shades.map(shade => [shade.step, shade.color])),
            ]),
          ),
        },
      },
    }
  },
)

export default palettePlugin
