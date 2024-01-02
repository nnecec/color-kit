import type { RGB } from '@color-kit/utils'

import { clamp } from '@color-kit/utils'

// rgb( <percentage>{3} [ / <alpha-value> ]? )
// rgb( <number>{3} [ / <alpha-value> ]? )
export const spaceRgbaMatcher =
  /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i

export const clampRGB = ({ a = 1, b, g, r }: RGB): RGB => ({
  a: clamp(a),
  b: clamp(b, 0, 255),
  g: clamp(g, 0, 255),
  r: clamp(r, 0, 255),
})

export const normalizeRGB = ({ a, b, g, r }: RGB): RGB => {
  const rgb = {
    b: Math.round(b),
    g: Math.round(g),
    r: Math.round(r),
  } as RGB

  if (a !== undefined) rgb.a = a
  return rgb
}
