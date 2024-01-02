import type { ClassValue } from 'clsx'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { SliderProps } from '../components/ui'

export const clamp = (value: number, min: number, max: number) => {
  return (
    value < min ? min
    : value > max ? max
    : value
  )
}
export const cls = (...input: ClassValue[]) => twMerge(clsx(input))
export const to = (orientation: SliderProps['orientation']) => (orientation === 'vertical' ? 'to top' : 'to right')
