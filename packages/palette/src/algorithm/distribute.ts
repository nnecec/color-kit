// Originally from https://github.com/koenbok/Framer/blob/master/framer/Utils.coffee
// Translated to Typescript

interface Props {
  limit?: boolean
  rangeA: number[]
  rangeB: number[]
  value: number
}

type Result = number

export default function distribute({ limit, rangeA, rangeB, value }: Props): Result {
  if (limit === undefined) {
    limit = false
  }
  const [fromLow, fromHigh] = [...rangeA]
  const [toLow, toHigh] = [...rangeB]

  const result = toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow)

  if (limit === true) {
    if (toLow < toHigh) {
      if (result < toLow) {
        return toLow
      }
      if (result > toHigh) {
        return toHigh
      }
    } else {
      if (result > toLow) {
        return toLow
      }
      if (result < toHigh) {
        return toHigh
      }
    }
  }

  return result
}
