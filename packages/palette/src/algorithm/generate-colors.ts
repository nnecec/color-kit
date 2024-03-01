import type { ColorOptions, ColorProps, ColorStep, ColorSteps } from './types'

import distribute from './distribute'
import generateSteps from './generate-steps'
import getCoordinates from './get-coordinates'

export default function generateColors(props: ColorProps, options: ColorOptions, invert?: boolean): ColorSteps {
  const { brightness, hue, saturation, steps } = props
  const { minorSteps } = options

  // default rotation is clockwise
  const rotation = options.rotation === 'counterclockwise' || options.rotation === 'ccw' ? 'ccw' : 'cw'

  // generate steps 0 to 1 based on curve
  const hueSteps = generateSteps({
    curve: getCoordinates(hue.curve, invert),
    steps,
  })
  const saturationSteps = generateSteps({
    curve: getCoordinates(saturation.curve, invert),
    steps,
  })
  const brightnessSteps = generateSteps({
    curve: getCoordinates(brightness.curve, invert),
    steps,
  })

  // adjust hue start/end to get the intended rotation
  if (rotation === 'cw') {
    if (hue.start > hue.end) {
      hue.start -= 360
    }
  } else if (rotation === 'ccw' && hue.end > hue.start) {
    hue.end -= 360
  }

  // Distribute the generated steps between hue, saturation, brightness ranges
  const hueValues = hueSteps.map(function (s) {
    return distribute({
      limit: true,
      rangeA: [0, 1],
      rangeB: [invert === true ? hue.end : hue.start, invert === true ? hue.start : hue.end],
      value: s,
    })
  })

  const saturationValues = saturationSteps.map(function (s) {
    const value = distribute({
      limit: true,
      rangeA: [0, 1],
      rangeB: [
        invert === true ? saturation.end : saturation.start,
        invert === true ? saturation.start : saturation.end,
      ],
      value: s,
    })
    const valueWithRate = value * saturation.rate
    return valueWithRate < 1 ? valueWithRate : 1 // prevent too much satuartion saturation
  })

  const brightnessValues = brightnessSteps.map(function (s) {
    return distribute({
      rangeA: [0, 1],
      rangeB: [
        invert === true ? brightness.end : brightness.start,
        invert === true ? brightness.start : brightness.end,
      ],
      value: s,
    })
  })

  // Merge values into color steps
  const colorSteps: ColorSteps = hueValues.map(function (hue, i) {
    const step: ColorStep = {
      brightness: {
        step: brightnessSteps[i] as number,
        value: brightnessValues[i] as number,
      },
      hue: {
        step: hueSteps[i] as number,
        value: hueValues[i] as number,
      },
      isLocked: false,
      isMajor: true,
      saturation: {
        step: saturationSteps[i] as number,
        value: saturationValues[i] as number,
      },
      step: i,
    }
    return step
  })

  // generate minor steps
  if (minorSteps) {
    for (const [i, o] of minorSteps.entries()) {
      const defaultStep: ColorStep = {
        brightness: {
          step: 0,
          value: 0,
        },
        hue: {
          step: 0,
          value: 0,
        },
        isLocked: false,
        isMajor: true,
        saturation: {
          step: 0,
          value: 0,
        },
        step: 0,
      }

      let insertPreviousStep = defaultStep
      let insertNextStep = defaultStep
      let insertAtIndex = 0

      for (const [j, p] of colorSteps.entries()) {
        if (o === p.step) {
          insertAtIndex = j + 1
          insertPreviousStep = p
          insertNextStep = colorSteps[j + 1]
        }
      }

      const hueStep = (insertPreviousStep.hue.step + insertNextStep.hue.step) / 2

      const hueValue = distribute({
        rangeA: [0, 1],
        rangeB: [invert === true ? hue.end : hue.start, invert === true ? hue.start : hue.end],
        value: hueStep,
      })

      const saturationStep = (insertPreviousStep.saturation.step + insertNextStep.saturation.step) / 2
      let saturationValue =
        distribute({
          rangeA: [0, 1],
          rangeB: [
            invert === true ? saturation.end : saturation.start,
            invert === true ? saturation.start : saturation.end,
          ],
          value: saturationStep,
        }) * saturation.rate

      saturationValue = saturationValue < 1 ? saturationValue : 1

      const brightnessStep = (insertPreviousStep.brightness.step + insertNextStep.brightness.step) / 2

      const brightnessValue = distribute({
        rangeA: [0, 1],
        rangeB: [
          invert === true ? brightness.end : brightness.start,
          invert === true ? brightness.start : brightness.end,
        ],
        value: brightnessStep,
      })

      if (insertAtIndex !== undefined) {
        const insertItem: ColorStep = {
          brightness: {
            step: brightnessStep,
            value: brightnessValue,
          },
          hue: {
            step: hueStep,
            value: hueValue,
          },
          isLocked: false,
          isMajor: false,
          saturation: {
            step: saturationStep,
            value: saturationValue,
          },
          step: (insertPreviousStep.step + insertNextStep.step) / 2,
        }
        colorSteps.splice(insertAtIndex, 0, insertItem)
      }
    }
  }

  return colorSteps
}
