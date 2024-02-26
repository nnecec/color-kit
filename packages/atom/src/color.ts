import type { ReadableAtom, WritableAtom } from 'nanostores'

import { atom, computed } from 'nanostores'

import type { Color } from './types'

export class ColorAtom {
  /** [0, 1] */
  alpha: WritableAtom<number>
  /** [0, 0.4] */
  chroma: WritableAtom<number>
  color: ReadableAtom<Color>
  /** [0, 360] */
  hue: WritableAtom<number>
  /** [0, 100] */
  lightness: WritableAtom<number>

  constructor({ a, c, h, l }: Color) {
    const { alpha, chroma, hue, lightness } = this.initialize({ a, c, h, l })
    this.hue = hue
    this.chroma = chroma
    this.lightness = lightness
    this.alpha = alpha
    this.color = computed<Color, [typeof hue, typeof chroma, typeof lightness, typeof alpha]>(
      [hue, chroma, lightness, alpha],
      (h, c, l, a) => ({ a, c, h, l }),
    )
  }

  initialize({ a, c, h, l }: Color) {
    return {
      alpha: atom(a ?? 1),
      chroma: atom(c ?? 100),
      hue: atom(h ?? 0),
      lightness: atom(l ?? 50),
    }
  }
}
