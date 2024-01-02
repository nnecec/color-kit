import type { RGB } from '@color-kit/utils'

import { isPresent } from '@color-kit/utils'

import type { HSV } from './types'

import RGBToHSV, { HSVToRGB, clampHSV, roundHSV } from './utils'

export class HSVColor {
  fromHSV({ a = 1, h, s, v }: HSV): RGB | null {
    if (!isPresent(h) || !isPresent(s) || !isPresent(v)) return null

    const hsl = clampHSV({
      a: Number(a),
      h: Number(h),
      s: Number(s),
      v: Number(v),
    })

    return HSVToRGB(hsl)
  }

  toHSV(rgb: RGB): HSV {
    return roundHSV(RGBToHSV(rgb))
  }
}
