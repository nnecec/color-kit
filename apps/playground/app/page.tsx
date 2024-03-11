'use client'

import type { DefaultColors } from 'tailwindcss/types/generated/colors'

import { createPalette } from 'tailwind-plugin-palette'
import colors from 'tailwindcss/colors'

const DEFAULT_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

function toSteps(interval?: number | number[]) {
  let steps: number | number[] = DEFAULT_STEPS
  if (Array.isArray(interval)) {
    steps = interval
  } else if (typeof interval === 'number') {
    let start = 0
    steps = []
    while (start < 1000) {
      steps.push(start + interval)
      start += interval
    }
    steps = steps
  } else {
    steps = DEFAULT_STEPS
  }
  return steps
}

type DefaultColorsKeys = keyof DefaultColors

const map = Object.fromEntries(
  Object.keys(colors)
    .map(color => {
      if (['blueGray', 'coolGray', 'lightBlue', 'trueGray', 'warmGray'].includes(color)) return null

      const middleColor = colors[color as DefaultColorsKeys][500]
      if (middleColor) {
        return [color, middleColor] as [string, string]
      }
      return null
    })
    .filter(Boolean),
)

export default function PalettePage() {
  const { interval, primary } = {} as any

  const steps = toSteps(interval)

  const palette = createPalette({
    // dark: true,
    primary: '#f6b894',
  })

  return (
    <div className="h-screen w-screen">
      <h1 className="text-xl">tailwind-plugin-palette</h1>
      {Object.entries(palette).map(([name, shades]) => (
        <div key={name}>
          <div className="flex gap-1">
            {Object.entries(shades).map(([step, shade]) => (
              <div key={shade}>
                <div
                  className="size-20"
                  style={{
                    backgroundColor: shade,
                  }}
                >
                  {name}-{step}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
