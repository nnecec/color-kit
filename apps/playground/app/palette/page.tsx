'use client'

import type { DefaultColors } from 'tailwindcss/types/generated/colors'

import colors from 'tailwindcss/colors'

import { palx } from '@color-kit/palette'

const DEFAULT_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

export default function PalettePage() {
  const map = Object.keys(colors)
    .map(color => {
      const middleColor = colors[color as keyof DefaultColors][500]
      if (middleColor) {
        return [color, middleColor] as [string, string]
      }
      return null
    })
    .filter(Boolean)

  const palette = palx(map, {
    primary: undefined,
    stops: DEFAULT_STOPS.map(stop => stop / 1000),
  }) as unknown as any

  console.log(palette)

  return <div className="h-screen w-screen">Palette</div>
}
