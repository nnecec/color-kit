import type { Oklch } from 'culori'

import type { AlgorithmResult, ColorOptions, ColorProps, ColorStep, ColorSteps, Options } from './types'

import { createShadeOptions } from './build-option'
import distribute from './distribute'
import getCoordinates from './get-coordinates'
import { createSteps } from './step'

export default function generateColors(base: Oklch, options: Options): ColorSteps {
  const { c, h, l, steps } = options

  const hValues = createSteps(h).map(function (step) {
    return distribute({
      limit: true,
      range: [h.start, h.end],
      value: step,
    })
  })

  const cValues = cSteps.map(function (step) {
    return distribute({
      limit: true,
      range: [c.start, c.end],
      value: step,
    })
  })

  const lValues = lSteps.map(function (step) {
    return distribute({
      range: [l.start, l.end],
      value: step,
    })
  })

  // Merge values into color steps
  const colorSteps: ColorSteps = hValues.map(function (hue, i) {
    const step: ColorStep = {
      brightness: {
        step: lSteps[i] as number,
        value: lValues[i] as number,
      },
      hue: {
        step: hSteps[i] as number,
        value: hValues[i] as number,
      },
      isLocked: false,
      isMajor: true,
      saturation: {
        step: cSteps[i] as number,
        value: saturationValues[i] as number,
      },
      step: i,
    }
    return step
  })

  return colorSteps
}

export function createShades(color: Oklch, options: Options) {
  const algorithmResult: AlgorithmResult = []
  const generated = generateColors(color, options)
  algorithmResult.push(generated)
  return algorithmResult
}
