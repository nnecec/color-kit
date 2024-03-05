'use client'

import type { DefaultColors } from 'tailwindcss/types/generated/colors'

import colors from 'tailwindcss/colors'

import { createPalette } from '@color-kit/palette'

const DEFAULT_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

export default function PalettePage() {
  const map = Object.keys(colors)
    .map(color => {
      if (['blueGray', 'coolGray', 'lightBlue', 'trueGray', 'warmGray'].includes(color)) return null
      const middleColor = colors[color as keyof DefaultColors][500]
      if (middleColor) {
        return [color, middleColor] as [string, string]
      }
      return null
    })
    .filter(Boolean)

  const palette = createPalette(map, {
    steps: DEFAULT_STOPS.map(stop => stop / 10),
  })

  const palette1 = createPalette(map, {
    primary: 'blue',
    steps: DEFAULT_STOPS.map(stop => stop / 10),
  })

  return (
    <div className="h-screen w-screen">
      Palette
      {palette.map((swatch, i) => (
        <div key={swatch.name}>
          {swatch.name}
          <div className="flex gap-1">
            {swatch.shades.map((shade, j) => (
              <div key={shade}>
                <div
                  className="size-20"
                  style={{
                    backgroundColor: shade,
                  }}
                />
                <div
                  className="size-20"
                  style={{
                    backgroundColor: palette1[i]?.shades[j],
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
