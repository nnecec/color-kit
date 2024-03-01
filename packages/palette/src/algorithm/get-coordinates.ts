import type { CurveType } from './types'

import defaultCurves from './default-curves'

export default function getCoordinates(curve: CurveType, invert?: boolean) {
  if (typeof curve === 'string') {
    const coordinates = defaultCurves[curve]
    if (coordinates) {
      return invert === true ? [...coordinates.value].reverse() : coordinates.value
    } else {
      throw new Error('provided incorrect curve')
    }
  }

  if (typeof curve === 'object') {
    if (curve.length === 4) {
      if (curve.some(isNaN)) {
        throw new Error('incompatible curve')
      } else {
        return curve
      }
    } else {
      throw new Error('curve is neither a string or a compatible array')
    }
  }
  throw new Error('curve was neither a string or an object')
}
