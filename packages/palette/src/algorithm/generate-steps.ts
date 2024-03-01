const bezier = require('bezier-easing')

type Props = {
  curve: number[]
  steps: number
}

export default function generateNumberOfSteps({ curve, steps }: Props): number[] {
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
