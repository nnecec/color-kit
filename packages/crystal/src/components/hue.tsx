'use client'

import { getHueBackground, useHue } from '@color-kit/react'

import { Slider } from './ui'

const linearGradient = `linear-gradient(
    to right,
    ${Object.entries(getHueBackground())
      .map(([pos, color]) => `${color} ${pos}%`)
      .join(', ')}
  )`

export const HuePicker = () => {
  const [hue, setHue] = useHue()

  return (
    <Slider
      max={360}
      min={0}
      onValueChange={val => setHue(val[0]!)}
      step={1}
      thumbStyle={{
        backgroundColor: `hsl(${hue} 100% 50% / 1)`,
      }}
      trackStyle={{
        background: linearGradient,
      }}
      value={[hue]}
    />
  )
}
