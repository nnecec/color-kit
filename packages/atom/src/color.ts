import type { ReadableAtom, WritableAtom } from 'nanostores'

import { atom, computed } from 'nanostores'

import type { HSL } from './types'

export class ColorAtom {
  alpha: WritableAtom<number>
  color: ReadableAtom<HSL>
  hue: WritableAtom<number>
  lightness: WritableAtom<number>
  saturation: WritableAtom<number>

  constructor() {
    const { alpha, hue, lightness, saturation } = this.initialize()
    this.hue = hue
    this.saturation = saturation
    this.lightness = lightness
    this.alpha = alpha
    this.color = computed<HSL, [typeof hue, typeof saturation, typeof lightness, typeof alpha]>(
      [hue, saturation, lightness, alpha],
      (h, s, l, a) => ({ a, h, l, s }),
    )
  }

  initialize() {
    return {
      alpha: atom(1),
      hue: atom(0),
      lightness: atom(50),
      saturation: atom(100),
    }
  }
}
