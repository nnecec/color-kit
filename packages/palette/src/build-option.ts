import type { ColorOptions, Options } from './types'

export const createOptions = (options?: Partial<Options>): Options => {
  const baseOptions = {
    ...options,
    easing: 'easeInQuad',
    shift: 0,
  } as ColorOptions

  return {
    steps: 10,
    ...baseOptions,
    c: { ...baseOptions, end: 1, start: 0.01, ...options?.c },
    h: { ...baseOptions, ...options?.h },
    l: { ...baseOptions, end: 0.05, start: 0.99, ...options?.l },
  }
}
