'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { ArrowLeftIcon, ArrowRightIcon, MoonIcon, PlusIcon, SunIcon, XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { colorsNamed, differenceEuclidean, formatHex, nearest, random } from 'culori'
import { useClipboard } from 'foxact/use-clipboard'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { createPalette } from 'tailwind-plugin-palette'

import { Button, Checkbox, Input, Switch, Tooltip } from '@nextui-org/react'

import { ColorPicker } from '../components/color-picker'

let names = Object.keys(colorsNamed)

const randomColor = () => {
  const hex = formatHex(random())
  const name = nearest<string>(names, differenceEuclidean())(hex, 1)[0]
  return { hex, name }
}
const MotionButton = motion(Button)

export default function RootPage() {
  const [inPaletteView, setInPaletteView] = useState(false)
  const [primaryHovered, setPrimaryHovered] = useState(false)
  const [colors, setColors] = useState(new Map())

  const { control, setValue } = useForm<{ dark?: boolean; primary?: string; reversed?: boolean }>()

  const values = useWatch({ control })
  const deferredValues = useDeferredValue({ colors, ...values })
  const palette = useMemo(
    () =>
      createPalette({
        colors: Object.fromEntries(colors),
        dark: deferredValues.dark,
        primary: deferredValues.primary,
        reversed: deferredValues.reversed,
      }),
    [colors, deferredValues],
  )

  console.log(palette)

  const isEmptyPalette = !Object.keys(palette)?.length

  const handleEditSubmit = () => {
    let color = randomColor()

    while (colors.has(color.name)) {
      color = randomColor()
    }

    setColors(colors => {
      colors.set(color.name, color.hex)
      return new Map(colors)
    })
  }

  const { copied, copy } = useClipboard({ timeout: 2000 })

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > window.innerHeight / 2) {
      !inPaletteView && setInPaletteView(true)
    } else {
      inPaletteView && setInPaletteView(false)
    }
  })

  const removePrimaryColor = () => {
    setValue('primary', undefined)
  }

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
                  /
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
        animate={inPaletteView ? 'show' : 'hide'}
        className="fixed bottom-10 left-[calc(50%-170px)] z-10"
        initial="hide"
        variants={{
          hide: { opacity: 0.3, y: 32 + 40 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <motion.div
          className="flex h-16 items-center gap-3 rounded-full bg-white/30 p-4 shadow backdrop-blur-lg"
          layout="size"
        >
          <motion.div
            className="group flex gap-1"
            onPointerEnter={() => setPrimaryHovered(true)}
            onPointerLeave={() => setPrimaryHovered(false)}
          >
            <Controller
              control={control}
              name="primary"
              render={({ field }) => (
                <ColorPicker className="z-10" onChange={value => field.onChange(value)} value={field.value} />
              )}
            />

            <MotionButton
              animate={primaryHovered ? 'show' : 'hide'}
              className={clsx(primaryHovered ? 'inline-flex' : 'hidden')}
              isIconOnly
              onPress={() => {
                setPrimaryHovered(false)
                removePrimaryColor()
              }}
              radius="full"
              size="sm"
              transition={{ ease: 'linear' }}
              variants={{
                hide: {
                  opacity: 0,
                  x: -30,
                },
                show: {
                  opacity: 1,
                  x: 0,
                },
              }}
            >
              <XMarkIcon width={14} />
            </MotionButton>
          </motion.div>

          <motion.div className="flex gap-3" layout="position">
            <Tooltip content="Add a swatch">
              <Button isIconOnly onPress={handleEditSubmit} radius="full" size="sm">
                <PlusIcon width={14} />
              </Button>
            </Tooltip>

            <Controller
              control={control}
              name="dark"
              render={({ field }) => (
                <Checkbox isSelected={field.value} onValueChange={value => field.onChange(value)} size="lg">
                  Dark
                </Checkbox>
              )}
            />

            <Controller
              control={control}
              name="reversed"
              render={({ field }) => (
                <Checkbox isSelected={field.value} onValueChange={value => field.onChange(value)} size="lg">
                  Reversed
                </Checkbox>
              )}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <div
        className={clsx(
          'container relative mx-auto min-h-screen space-y-6 pb-60 pt-40',
          isEmptyPalette && 'flex items-center justify-center',
        )}
      >
        {isEmptyPalette ?
          <div>empty</div>
        : Object.entries(palette).map(([name, shades]) => (
            <div key={name}>
              <div className="flex items-center gap-4">
                <ColorPicker value={colors.get(name)} />
                <Input classNames={{ base: 'w-auto' }} fullWidth={false} value={name} />
              </div>
              <motion.div
                animate="show"
                className="flex"
                initial="hide"
                transition={{
                  staggerChildren: 0.01,
                }}
                variants={{
                  hide: {
                    opacity: 0,
                  },
                  show: {
                    opacity: 1,
                  },
                }}
              >
                {Object.entries(shades).map(([step, shade], index) => (
                  <motion.div
                    className="relative w-full"
                    key={index}
                    variants={{
                      hide: {
                        opacity: 0,
                      },
                      show: {
                        opacity: 1,
                      },
                    }}
                  >
                    <div className="mt-[100%]" />
                    <Tooltip content={`${name}-${step}`}>
                      <div
                        className="absolute inset-[12%] rounded-full text-sm"
                        style={{
                          backgroundColor: shade,
                        }}
                      />
                    </Tooltip>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
