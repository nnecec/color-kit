import type { ColorOptions, Oklch, Options, Shade } from './types'

import { easings } from './easing'

function createEasing(options: ColorOptions): (step: number) => number {
  const easing = typeof options?.easing === 'function' ? options?.easing : easings[options?.easing ?? 'easeInOutCubic']
  return (step: number) => easing!(step)
}

export function createShades(color: Oklch, options: Options) {
  const { c, h, l, steps } = options

  const lEasing = createEasing(l)
  const cEasing = createEasing(c)
  const hEasing = createEasing(h)

  const stepsArray = Array.isArray(steps) ? steps : Array.from({ length: steps }).map((_, i) => i / steps)

  return stepsArray.map(
    step =>
      ({
        c: c.start + cEasing(step) * (c.end - c.start),
        h: color.h,
        l: l.start + lEasing(step) * (l.end - l.start),
        step,
      }) as Shade,
  )
}
