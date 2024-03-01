type EasingFunction = (progress: number) => number

export type Easing = EasingFunction | keyof typeof easings

interface EasingDictionary {
  [easing: string]: EasingFunction
}

const pow = Math.pow
const sqrt = Math.sqrt
const sin = Math.sin
const cos = Math.cos
const PI = Math.PI
const c1 = 1.701_58
const c2 = c1 * 1.525
const c3 = c1 + 1
const c4 = (2 * PI) / 3
const c5 = (2 * PI) / 4.5

const bounceOut: EasingFunction = function (x) {
  const n1 = 7.5625
  const d1 = 2.75

  if (x < 1 / d1) {
    return n1 * x * x
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984_375
  }
}

export const easings: EasingDictionary = {
  easeInBack: function (x) {
    return c3 * x * x * x - c1 * x * x
  },
  easeInBounce: function (x) {
    return 1 - bounceOut(1 - x)
  },
  easeInCirc: function (x) {
    return 1 - sqrt(1 - pow(x, 2))
  },
  easeInCubic: function (x) {
    return x * x * x
  },
  easeInElastic: function (x) {
    return (
      x === 0 ? 0
      : x === 1 ? 1
      : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)
    )
  },
  easeInExpo: function (x) {
    return x === 0 ? 0 : pow(2, 10 * x - 10)
  },
  easeInOutBack: function (x) {
    return x < 0.5 ?
        (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
  },
  easeInOutBounce: function (x) {
    return x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
  },
  easeInOutCirc: function (x) {
    return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
  },
  easeInOutCubic: function (x) {
    return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
  },
  easeInOutElastic: function (x) {
    return (
      x === 0 ? 0
      : x === 1 ? 1
      : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
      : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1
    )
  },
  easeInOutExpo: function (x) {
    return (
      x === 0 ? 0
      : x === 1 ? 1
      : x < 0.5 ? pow(2, 20 * x - 10) / 2
      : (2 - pow(2, -20 * x + 10)) / 2
    )
  },
  easeInOutQuad: function (x) {
    return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2
  },
  easeInOutQuart: function (x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2
  },
  easeInOutQuint: function (x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2
  },
  easeInOutSine: function (x) {
    return -(cos(PI * x) - 1) / 2
  },
  easeInQuad: function (x) {
    return x * x
  },
  easeInQuart: function (x) {
    return x * x * x * x
  },
  easeInQuint: function (x) {
    return x * x * x * x * x
  },
  easeInSine: function (x) {
    return 1 - cos((x * PI) / 2)
  },
  easeOutBack: function (x) {
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)
  },
  easeOutBounce: bounceOut,
  easeOutCirc: function (x) {
    return sqrt(1 - pow(x - 1, 2))
  },
  easeOutCubic: function (x) {
    return 1 - pow(1 - x, 3)
  },
  easeOutElastic: function (x) {
    return (
      x === 0 ? 0
      : x === 1 ? 1
      : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1
    )
  },
  easeOutExpo: function (x) {
    return x === 1 ? 1 : 1 - pow(2, -10 * x)
  },
  easeOutQuad: function (x) {
    return 1 - (1 - x) * (1 - x)
  },
  easeOutQuart: function (x) {
    return 1 - pow(1 - x, 4)
  },
  easeOutQuint: function (x) {
    return 1 - pow(1 - x, 5)
  },
  easeOutSine: function (x) {
    return sin((x * PI) / 2)
  },
  linear: x => x,
}
