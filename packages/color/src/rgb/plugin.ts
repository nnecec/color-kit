import type { RGB } from '@color-kit/utils'

import type { Plugin } from '../types'

import { RGBColor } from './rgb'

declare module '../color' {
  interface Color {
    fromRGBA: () => Color
    fromRGBAString: () => Color
    toRGB: () => RGB
    toRGBString: () => string
  }
}

export const RGBPlugin = (): Plugin => {
  const plugin = new RGBColor()
  return Class => {
    Class.register('rgb', function (input: RGB) {
      return plugin.fromRGB(input)
    })

    Class.register('rgbString', function (input: string) {
      return plugin.fromRGBString(input)
    })

    Class.prototype.toRGB = function () {
      if (!this.color) return { a: 1, b: 0, g: 0, r: 0 }
      return plugin.toRGB(this.color)
    }

    Class.prototype.toRGBString = function () {
      if (!this.color) return 'rgb(0 0 0 / 1)'
      return plugin.toRGBString(this.color)
    }
  }
}
