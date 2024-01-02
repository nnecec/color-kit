import type { Plugin } from '@color-kit/color'

import type { HSL } from './types'

import { HSLColor } from './hsl'

declare module '@color-kit/color' {
  interface Color {
    fromHSL: () => Color
    fromHSLString: () => Color
    toHSL: () => HSL
    toHSLString: () => string
  }
}

export const HSLPlugin = (): Plugin => {
  const plugin = new HSLColor()
  return Class => {
    Class.register('hsl', function (input: HSL) {
      return plugin.fromHSL(input)
    })

    Class.register('hslString', function (input: string) {
      return plugin.fromHSLString(input)
    })

    Class.prototype.toHSL = function () {
      return plugin.toHSL(this.color)
    }

    Class.prototype.toHSLString = function () {
      return plugin.toHSLString(this.color)
    }
  }
}
