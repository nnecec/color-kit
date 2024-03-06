import { Blend, Hct, TonalPalette, argbFromHex, hexFromArgb } from '@material/material-color-utilities'

import type { ParsedOptions, Shade } from './types'

export function createShades(hex: string, options: ParsedOptions): Shade[] {
  const { primary, steps } = options

  const argb = primary ? Blend.harmonize(argbFromHex(hex), argbFromHex(primary)) : argbFromHex(hex)

  const hct = Hct.fromInt(argb)

  const palette = TonalPalette.fromHueAndChroma(hct.hue, hct.chroma)

  return steps.map(step => ({
    color: hexFromArgb(palette.tone(step)),
    step,
  }))
}
