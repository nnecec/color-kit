import type { RGB } from '@color-kit/utils'

import { round, roundRGB } from '@color-kit/utils'

import type { HEX } from './types'

import { format, hexMatcher } from './utils'

export class HEXColor {
  fromHEX(hex: HEX): RGB | null {
    const hexMatch = hexMatcher.exec(hex)

    if (!hexMatch) return null

    hex = hexMatch[1]!

    if (hex.length <= 4) {
      return {
        a: hex.length === 4 ? round(Number.parseInt(hex[3]! + hex[3], 16) / 255, 2) : undefined,
        b: Number.parseInt(hex[2]! + hex[2], 16),
        g: Number.parseInt(hex[1]! + hex[1], 16),
        r: Number.parseInt(hex[0]! + hex[0], 16),
      }
    }

    if (hex.length === 6 || hex.length === 8) {
      return {
        a: hex.length === 8 ? round(Number.parseInt(hex.slice(6, 8), 16) / 255, 2) : undefined,
        b: Number.parseInt(hex.slice(4, 6), 16),
        g: Number.parseInt(hex.slice(2, 4), 16),
        r: Number.parseInt(hex.slice(0, 2), 16),
      }
    }

    return null
  }

  toHEX(rgb: RGB): HEX {
    const { a, b, g, r } = roundRGB(rgb)
    const alphaHex = a === undefined ? '' : format(round(a * 255))
    return '#' + format(r) + format(g) + format(b) + alphaHex
  }
}
