'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { ArrowUturnLeftIcon, CheckIcon, MoonIcon, PlusIcon, SunIcon } from '@heroicons/react/20/solid'
import { colorsNamed, differenceEuclidean, nearest } from 'culori'
import { useClipboard } from 'foxact/use-clipboard'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { createPalette, getTailwindColors } from 'tailwind-plugin-palette'

import { Button, Input, Switch, Tooltip } from '@nextui-org/react'

import { ColorPicker } from '../components/color-picker'

let names = Object.keys(colorsNamed)
let nearestNamedColors = (hex: string) => nearest<string>(names, differenceEuclidean())(hex, 1)[0]

export default function RootPage() {
  const [inPaletteView, setInPaletteView] = useState(false)
  const [editing, setEditing] = useState(false)
  const [colors, setColors] = useState(new Map())

  const { control } = useForm({
    defaultValues: {
      dark: false,
      primary: '#f6b894',
    },
  })

  const values = useWatch({ control })
  const deferredValues = useDeferredValue(values)
  const palette = useMemo(
    () =>
      createPalette({
        colors: Object.fromEntries(colors),
        dark: deferredValues.dark,
        primary: deferredValues.primary,
      }),
    [colors, deferredValues],
  )

  const { control: editControl, getValues } = useForm<{ swatchValue: string }>()

  const handleEditSubmit = () => {
    const values = getValues()

    const name = nearestNamedColors(values.swatchValue)

    setColors(colors => {
      colors.set(name, values.swatchValue)
      return new Map(colors)
    })
  }

  const { copied, copy } = useClipboard({ timeout: 2000 })

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > window.innerHeight / 2) {
      setInPaletteView(true)
    } else {
      setInPaletteView(false)
    }
  })

  return (
    <div className="h-screen w-screen">
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Tooltip
            className="h-[80px] w-[500px]"
            content={
              copied ? 'Copied!' : (
                <div>
                  Install with
                  <Button
                    className="mx-2"
                    onClick={() => copy('npm install --save-dev tailwind-plugin-palette')}
                    size="sm"
                  >
                    npm
                  </Button>
                  or
                  <Button
                    className="mx-2"
                    onClick={() => copy('pnpm install --save-dev tailwind-plugin-palette')}
                    size="sm"
                  >
                    pnpm
                  </Button>
                </div>
              )
            }
            offset={20}
            placement="bottom"
            showArrow={true}
          >
            <h1 className="mb-4 text-6xl">tailwind-plugin-palette</h1>
          </Tooltip>
        </div>
      </div>
      <motion.div
        animate={{ opacity: inPaletteView ? 1 : 0, y: inPaletteView ? 0 : 100 }}
        className="fixed bottom-10 left-1/2"
        initial={{ opacity: 0, y: 100 }}
        style={{
          x: '-50%',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className="flex h-16 items-center space-x-3 rounded-full bg-white/30 p-3 shadow backdrop-blur-lg">
          <Controller
            control={control}
            name="primary"
            render={({ field }) => <ColorPicker onChange={value => field.onChange(value)} value={field.value} />}
          />
          <Controller
            control={control}
            name="dark"
            render={({ field }) => (
              <Switch
                classNames={{
                  wrapper: 'mr-0',
                }}
                endContent={<SunIcon width={14} />}
                isSelected={field.value}
                onValueChange={value => field.onChange(value)}
                size="lg"
                startContent={<MoonIcon width={14} />}
              />
            )}
          />

          <div className="flex gap-2">
            <Controller
              control={editControl}
              name="swatchValue"
              render={({ field }) => <ColorPicker onChange={value => field.onChange(value)} value={field.value} />}
            />

            <Tooltip content="Add a swatch">
              <Button isIconOnly onPress={handleEditSubmit} radius="full" size="sm">
                <PlusIcon width={14} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto min-h-screen">
        {Object.entries(palette).map(([name, shades]) => (
          <div key={name}>
            <h2>{name}</h2>
            <div className="flex">
              {Object.entries(shades).map(([step, shade], index) => (
                <div className="relative w-full" key={index}>
                  <div className="mt-[100%]" />
                  <div
                    className="absolute inset-0"
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
    </div>
  )
}
