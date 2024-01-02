import type { RGB } from '@color-kit/utils'

import { clamp, clampHue, round } from '@color-kit/utils'

import type { HSL } from './types'
// Whitespace syntax
// hsl( <hue> <percentage> <percentage> [ / <alpha-value> ]? )
export const spaceHslMatcher =
  /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i

export const clampHSL = ({ a, h, l, s }: HSL): HSL => ({
  a: a === undefined ? undefined : clamp(a),
  h: clampHue(h),
  l: clamp(l, 0, 100),
  s: clamp(s, 0, 100),
})

export const roundHSL = ({ a, h, l, s }: HSL): HSL => {
  const hsl = {
    h: round(h),
    l: round(l),
    s: round(s),
  } as HSL
  if (a !== undefined) hsl.a = a
  return hsl
}

export const HSLToRGB = ({ a, h, l, s }: HSL): RGB => {
  const hDecimal = h / 360
  const sDecimal = s / 100
  const lDecimal = l / 100

  let r, g, b

  if (s === 0) {
    r = lDecimal
    g = lDecimal
    b = lDecimal
  } else {
    const hueToRGB = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = lDecimal < 0.5 ? lDecimal * (1 + sDecimal) : lDecimal + sDecimal - lDecimal * sDecimal
    const p = 2 * lDecimal - q

    r = hueToRGB(p, q, hDecimal + 1 / 3)
    g = hueToRGB(p, q, hDecimal)
    b = hueToRGB(p, q, hDecimal - 1 / 3)
  }

  const rgb = { b: b * 255, g: g * 255, r: r * 255 } as RGB

  if (a) rgb.a = a

  return rgb
}

/**
 * https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation
 */
export const RGBToHSL = ({ a, b, g, r }: RGB): HSL => {
  // 将 RGBA 转换为 RGB
  const rgb = { b: b / 255, g: g / 255, r: r / 255 }
  const max = Math.max(rgb.r, rgb.g, rgb.b)
  const min = Math.min(rgb.r, rgb.g, rgb.b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rgb.r: {
        h = (rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0)
        break
      }
      case rgb.g: {
        h = (rgb.b - rgb.r) / d + 2
        break
      }
      case rgb.b: {
        h = (rgb.r - rgb.g) / d + 4
        break
      }
    }
    h /= 6
  }
  const hsl = {
    h: h * 360,
    l: l * 100,
    s: s * 100,
  } as HSL
  if (a !== undefined) hsl.a = a
  return hsl
}
