import type { ColorOptions, Options } from './types'

export const createShadeOptions = (defaultOptions: ColorOptions, start: number, end: number): ColorOptions => {
  return {
    ...defaultOptions,
    end: defaultOptions.end ? defaultOptions.end * end : end,
    start: defaultOptions.start ? defaultOptions.start * start : start,
  }
}

export const createPaletteOptions = (options?: Partial<Options>): Options => {
  const baseOptions: ColorOptions = {
    ...options,
    curve: 'linear',
    end: 1,
    shift: 0,
    start: 0,
  }

  return {
    steps: 10,
    ...baseOptions,
    c: createShadeOptions({ ...baseOptions, ...options?.c }, 0, 1),
    h: createShadeOptions({ ...baseOptions, ...options?.h }, 0, 360),
    l: createShadeOptions({ ...baseOptions, ...options?.l }, 0, 1),
  }
}
