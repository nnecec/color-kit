import type { RGB } from '@color-kit/utils'

import { ALPHA_PRECISION, clamp, clampHue, round } from '@color-kit/utils'

import type { HSV } from './types'
// Whitespace syntax
// hsl( <hue> <percentage> <percentage> [ / <alpha-value> ]? )
export const spaceHslMatcher =
  /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i

export const clampHSV = ({ a = 1, h, s, v }: HSV): HSV => ({
  a: clamp(a),
  h: clampHue(h),
  s: clamp(s, 0, 100),
  v: clamp(v, 0, 100),
})

export const roundHSV = ({ a, h, s, v }: HSV): HSV => ({
  a: a === undefined ? undefined : round(a, ALPHA_PRECISION),
  h: round(h),
  s: round(s),
  v: round(v),
})

export const HSVToRGB = ({ a, h, s, v }: HSV): RGB => {
  h = (h / 360) * 6
  s = s / 100
  v = v / 100

  const hh = Math.floor(h),
    b = v * (1 - s),
    c = v * (1 - (h - hh) * s),
    d = v * (1 - (1 - h + hh) * s),
    module = hh % 6

  return {
    a: a,
    b: [b, b, d, v, v, c][module]! * 255,
    g: [d, v, v, c, b, b][module]! * 255,
    r: [v, c, b, b, d, v][module]! * 255,
  }
}

export default function RGBToHSV({ a, b, g, r }: RGB): HSV {
  const max = Math.max(r, g, b)
  const delta = max - Math.min(r, g, b)

  const hh =
    delta ?
      max === r ? (g - b) / delta
      : max === g ? 2 + (b - r) / delta
      : 4 + (r - g) / delta
    : 0

  return {
    a,
    h: 60 * (hh < 0 ? hh + 6 : hh),
    s: max ? (delta / max) * 100 : 0,
    v: (max / 255) * 100,
  }
}
