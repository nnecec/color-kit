import type { RGB } from '@color-kit/utils'

import type { Color } from './color'

export interface Options {
  plugins?: Plugin[]
}

export type Plugin = (Class: typeof Color) => void

export type ObjectiveColorType = Record<string, unknown>

export type ColorType = ObjectiveColorType | string

export type Parser<T extends ColorType = any> = (input: T) => RGB | null
