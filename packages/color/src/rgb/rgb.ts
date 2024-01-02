import { type RGB, isPresent } from '@color-kit/utils'

import { clampRGB, normalizeRGB, spaceRgbaMatcher } from './utils'

export class RGBColor {
  fromRGB({ a, b, g, r }: RGB): RGB | null {
    if (!isPresent(r) || !isPresent(g) || !isPresent(b)) return null
    const rgb = { b, g, r } as RGB
    if (a !== undefined) rgb.a = a
    return rgb
  }

  fromRGBString(input: string): RGB | null {
    const match = spaceRgbaMatcher.exec(input)

    if (!match) return null

    // Mixing numbers and percentages is not allowed
    // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb_syntax_variations
    if (match[2] !== match[4] || match[4] !== match[6]) return null

    return clampRGB({
      a: match[7] === undefined ? 1 : Number(match[7]) / (match[8] ? 100 : 1),
      b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
      g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
      r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
    })
  }

  toRGB(rgb: RGB): RGB {
    return normalizeRGB(rgb)
  }

  toRGBString(rgb: RGB): string {
    const { a, b, g, r } = normalizeRGB(rgb)
    return a === undefined ? `rgb(${r} ${g} ${b})` : `rgb(${r} ${g} ${b} / ${a})`
  }
}
