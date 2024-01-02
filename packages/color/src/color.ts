import type { RGB } from '@color-kit/utils'

import type { ColorType, Parser, Plugin } from './types'

import { RGBPlugin } from './rgb'

export class Color {
  static parsers: Map<string, Parser> = new Map()
  color: RGB
  input: ColorType

  constructor(input: ColorType) {
    Color.extends([RGBPlugin()])

    this.input = input
    this.color = this.findValidColor()
  }

  static extends(plugins?: Plugin[]) {
    if (Array.isArray(plugins)) {
      for (const plugin of plugins) {
        plugin(Color)
      }
    }
  }

  static register<T extends ColorType = ColorType>(name: string, parser: Parser<T>) {
    this.parsers.set(name, parser)
  }

  private findValidColor() {
    for (const [, parser] of Color.parsers) {
      if (!this.input) return { a: 0, b: 0, g: 0, r: 0 }
      const result = parser(this.input)
      if (result) return result
    }
    return { a: 0, b: 0, g: 0, r: 0 }
  }

  alpha() {}
  darken() {}
  grayscale() {}
  invert() {}
  lighten() {}
  rotate() {}
  saturate() {}
}

export const color = (input: ColorType) => {
  if (input instanceof Color) return input
  return new Color(input)
}
