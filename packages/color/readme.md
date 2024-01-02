# @color-kit/color

```js
import { Color, color } from '@color-kit/color'
import HEXPlugin from '@color-kit/plugin-hex'
import HSLPlugin from '@color-kit/plugin-hsl'

Color.extends([HEXPlugin(), HSLPlugin()])

// initial
const red = color('red')
const green = new Color('green')

// convert
color('yellow').toHSL() // { h: 1, s: 1, l: 1, a: 1 }
color('yellow').toHEX() // #FFEEDD

// manipulate
green.alpha()
green.darken()
green.grayscale()
green.invert()
green.lighten()
green.rotate()
green.saturate()
```
