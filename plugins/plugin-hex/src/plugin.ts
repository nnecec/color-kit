import type { Plugin } from '@color-kit/color'

import type { HEX } from './types'

import { HEXColor } from './hex'

declare module '@color-kit/color' {
  interface Color {
    fromHEX: () => Color
    toHEX: () => HEX
  }
}

export const HEXPlugin = (): Plugin => {
  const plugin = new HEXColor()
  return Class => {
    Class.register('hex', function (input: HEX) {
      return plugin.fromHEX(input)
    })

    Class.prototype.toHEX = function () {
      return plugin.toHEX(this.color)
    }
  }
}
