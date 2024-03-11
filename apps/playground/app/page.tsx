'use client'

import { useEffect, useMemo } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { createPalette, getTailwindColors } from 'tailwind-plugin-palette'

import { Input, Switch } from '@nextui-org/react'

export default function RootPage() {
  const { control } = useForm({
    defaultValues: {
      dark: false,
      primary: '#f6b894',
    },
  })

  const values = useWatch({ control })

  const palette = useMemo(
    () =>
      createPalette({
        colors: getTailwindColors(500),
        dark: values.dark,
        primary: values.primary,
      }),
    [values],
  )

  return (
    <div className="h-screen w-screen">
      <h1 className="text-6xl">tailwind-plugin-palette</h1>
      <div className="fixed bottom-10 z-10 rounded-full">
        <Controller
          control={control}
          name="primary"
          render={({ field }) => (
            <input
              className="w-[100px]"
              onChange={e => field.onChange(e.target.value)}
              type="color"
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="dark"
          render={({ field }) => <Switch isSelected={field.value} onValueChange={value => field.onChange(value)} />}
        />
      </div>

      {Object.entries(palette).map(([name, shades]) => (
        <div key={name}>
          <div className="flex">
            {Object.entries(shades).map(([step, shade]) => (
              <div key={shade}>
                <div
                  className="size-20"
                  style={{
                    backgroundColor: shade,
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
