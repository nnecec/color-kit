import type { ColorOptions, Options } from './types'

const bezier = require('bezier-easing')

type Props = {
  curve: number[]
  steps: number
}

export default function createSteps(steps: Options['steps'], curve?: Easing): number[] {
  const arrayOfSteps = [...new Array(steps).keys()]
  const array = []
  for (const step in arrayOfSteps) {
    const stepNumber = Number.parseInt(step, 10)
    const easing = bezier(...curve)
    const value = easing(stepNumber / (steps - 1))
    array.push(value)
  }
  return array
}
