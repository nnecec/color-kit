import type { DefaultColors } from 'tailwindcss/types/generated/colors'

import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

import { palx } from '@color-kit/palette'

const DEFAULT_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const palettePlugin = plugin.withOptions(
  function () {
    return function () {}
  },
  function (options: any) {
    const { primary } = options

    const map = Object.keys(colors)
      .map(color => {
        const middleColor = colors[color as keyof DefaultColors][500]
        if (middleColor) {
          return [color, middleColor] as [string, string]
        }
        return null
      })
      .filter(Boolean)

    const palette = palx(map, {
      primary,
      steps: DEFAULT_STOPS.map(stop => stop / 1000),
    }) as unknown as any

    return {
      theme: {
        colors: palette,
      },
    }
  },
)
export default palettePlugin
