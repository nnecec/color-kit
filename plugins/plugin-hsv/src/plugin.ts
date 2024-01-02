import type { Plugin } from '@color-kit/color'

import type { HSV } from './types'

import { HSVColor } from './hsv'

declare module '@color-kit/color' {
  interface Color {
    fromHSV: () => Color
    fromHSVString: () => Color
    toHSV: () => HSV
    toHSVString: () => string
  }
}

export const HSLPlugin = (): Plugin => {
  const plugin = new HSVColor()
  return Class => {
    Class.register('hsl', function (input: HSV) {
      return plugin.fromHSV(input)
    })

    Class.prototype.toHSV = function () {
      return plugin.toHSV(this.color)
    }
  }
}
