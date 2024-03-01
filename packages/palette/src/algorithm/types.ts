export type CurveType = number[] | string

export type HueType = {
  curve: CurveType
  end: number
  start: number
}

export type SaturationType = {
  curve: CurveType
  end: number
  rate: number
  start: number
}

export type BrightnessType = {
  curve: CurveType
  end: number
  start: number
}

export type ColorAxis = {
  step: number
  value: number
}

export type ColorStep = {
  brightness: ColorAxis
  hue: ColorAxis
  isLocked: boolean
  isMajor: boolean
  saturation: ColorAxis
  step: number
}

export type ColorSteps = ColorStep[]

export type AlgorithmResult = ColorSteps[]

export type Color = {
  brightness: number
  hex: string
  hsl: number[]
  hsv: number[]
  hue: number
  isLocked: boolean
  isMajor: boolean
  lab: number[]
  rgbArray: number[]
  rgbString: string
  rgbaArray: number[]
  rgbaString: string
  saturation: number
  step: number
}

export interface ColorOptions {
  lockHex?: string
  lockHexInverted?: string
  minorSteps?: number[]
  name?: string
  provideInverted?: boolean
  rotation?: 'ccw' | 'clockwise' | 'counterclockwise' | 'cw'
}

export interface ColorProps {
  brightness: BrightnessType
  hue: HueType
  saturation: SaturationType
  steps: number
}

export type ColorSet = Color[]
