import type { Color } from 'culori'

import { clamp } from '@color-kit/utils'

import type { Shade } from './types'

import { oklch } from './utils'

export function createDistributionValues(lightness: number, stops: number[]) {
  const mid = 0.7
  const min = 0
  const max = 1

  const tweaks = [{ stop: mid, tweak: lightness }]

  for (const stopValue of stops) {
    if (stopValue === mid) {
      tweaks.push({ stop: stopValue, tweak: lightness })
      continue
    }

    const diff = Math.abs(stopValue - mid)
    const totalDiff = stopValue < mid ? 0.7 - 0 : 1 - 0.7
    const increment = stopValue < mid ? max - lightness : lightness - min

    const tweak =
      stopValue < mid ? (increment / totalDiff) * diff + lightness : lightness - (increment / totalDiff) * diff

    tweaks.push({ stop: stopValue, tweak: Math.round(tweak) })
  }

  tweaks.sort((a, b) => a.stop - b.stop)

  return tweaks
}

export function unsignedModulo(x: number, n: number) {
  return ((x % n) + n) % n
}

export function createSwatches(shade: Shade, stops?: number[]) {
  const color = oklch(shade.color)!
  if (!stops?.length) {
    return [
      {
        ...color,
        stop: 0,
      },
    ]
  }

  const distributionScale = createDistributionValues(color.l, stops)

  const swatches = stops.map((stop, stopIndex) => {
    return {
      c: clamp(color.c, 0, 100),
      h: unsignedModulo(color.h!, 360),
      l: distributionScale[stopIndex]!.tweak,
      stop,
    }
  })

  return swatches
}

export function createGraySwatches(shade: Shade, primary?: Color | string, stops?: number[]) {
  if (primary) {
    console.log(shade.color)
  }
  return createSwatches(shade, stops)
}
