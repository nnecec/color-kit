import type { RGB } from '@color-kit/utils'

import { isPresent, parseHue } from '@color-kit/utils'

import type { HSL } from './types'

import { HSLToRGB, RGBToHSL, clampHSL, roundHSL, spaceHslMatcher } from './utils'

export class HSLColor {
  fromHSL({ a, h, l, s }: HSL): RGB | null {
    if (!isPresent(h) || !isPresent(s) || !isPresent(l)) return null

    const hsl = clampHSL({
      a: a === undefined ? undefined : Number(a),
      h: Number(h),
      l: Number(l),
      s: Number(s),
    })
    return HSLToRGB(hsl)
  }
  fromHSLString(input: string) {
    const match = spaceHslMatcher.exec(input)

    if (!match) return null

    const hsl = clampHSL({
      a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1),
      h: parseHue(match[1]!, match[2]),
      l: Number(match[4]),
      s: Number(match[3]),
    })

    return HSLToRGB(hsl)
  }

  toHSL(rgb: RGB): HSL {
    return roundHSL(RGBToHSL(rgb))
  }

  toHSLString(rgb: RGB): string {
    const { a, h, l, s } = roundHSL(RGBToHSL(rgb))
    return rgb.a === undefined ? `hsl(${h} ${s}% ${l}%)` : `hsl(${h} ${s}% ${l}% / ${a})`
  }
}
