'use client'

import { useDeferredValue, useMemo, useState } from 'react'

import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { colorsNamed, differenceEuclidean, formatHex, nearest, random } from 'culori'
import { useClipboard } from 'foxact/use-clipboard'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { atom, useAtom } from 'jotai'
import { createPalette } from 'tailwind-plugin-palette'

import { Button, Checkbox, Input, Tooltip } from '@nextui-org/react'

import { ColorPicker } from '../components/color-picker'

let names = Object.keys(colorsNamed)

const randomColor = () => {
  const hex = formatHex(random())
  const name = nearest<string>(names, differenceEuclidean())(hex, 1)[0]!
  return { hex, name }
}
const MotionButton = motion(Button)

type Options = {
  dark?: boolean
  primary?: string
  reversed?: boolean
}

const optionsAtom = atom<Options>({
  dark: false,
  primary: undefined,
  reversed: false,
})

const colorsAtom = atom<{ hex: string; name: string }[]>([])
const editingSwatchesAtom = atom(new Map())

export default function RootPage() {
  const [inPaletteView, setInPaletteView] = useState(false)
  const [primaryHovered, setPrimaryHovered] = useState(false)
  const [options, setOptions] = useAtom(optionsAtom)
  const [colors, setColors] = useAtom(colorsAtom)

  const [editingSwatches, setEditingSwatches] = useAtom(editingSwatchesAtom)

  const deferredValues = useDeferredValue({
    colors: colors,
    ...options,
  })
  const palette = useMemo(
    () =>
      createPalette({
        colors: Object.fromEntries(deferredValues.colors.map(color => [color.name, color.hex])),
        dark: deferredValues.dark,
        primary: deferredValues.primary,
        reversed: deferredValues.reversed,
      }),
    [deferredValues],
  )

  const isEmptyPalette = colors.length === 0

  const addSwatch = () => {
    let color = randomColor()

    while (colors.some(({ name }) => name === color.name)) {
      color = randomColor()
    }
    setColors([...colors, color])
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

  const titleY = useTransform(scrollY, [0, window.innerHeight], [0, window.innerHeight / 2.5])

  console.log(palette)

  return (
    <div className="relative h-screen w-screen">
      <div className="flex h-screen items-center justify-center">
        <motion.div
          className="text-center"
          style={{
            y: titleY,
          }}
        >
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
        </motion.div>
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
            <ColorPicker
              className="z-10"
              onChange={value => setOptions({ ...options, primary: value })}
              value={options.primary}
            />

            <MotionButton
              animate={primaryHovered ? 'show' : 'hide'}
              className={clsx(primaryHovered ? 'inline-flex' : 'hidden')}
              isIconOnly
              onPress={() => {
                setPrimaryHovered(false)
                setOptions({ ...options, primary: undefined })
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
              <Button isIconOnly onPress={addSwatch} radius="full" size="sm">
                <PlusIcon width={14} />
              </Button>
            </Tooltip>

            <Checkbox
              isSelected={options.dark}
              onValueChange={value => setOptions({ ...options, dark: value })}
              size="lg"
            >
              Dark
            </Checkbox>

            <Checkbox
              isSelected={options.reversed}
              onValueChange={value => setOptions({ ...options, reversed: value })}
              size="lg"
            >
              Reversed
            </Checkbox>

            <Button disabled={isEmptyPalette} isIconOnly size="sm">
              <ArrowUpOnSquareIcon width={14} />
            </Button>
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
        : colors.map((swatch, index) => {
            const editingSwatch = editingSwatches.get(index)

            return (
              <div key={swatch.hex}>
                <div className="flex items-center gap-4">
                  <ColorPicker
                    className="z-10"
                    defaultValue={swatch.hex}
                    onChange={value => {
                      const newSwatch = { hex: value, name: swatch.name }
                      editingSwatches.set(index, newSwatch)
                      setEditingSwatches(new Map(editingSwatches))
                    }}
                  />

                  <Input
                    classNames={{ base: 'w-auto' }}
                    defaultValue={swatch.name}
                    fullWidth={false}
                    onValueChange={value => {
                      const newSwatch = { hex: swatch.hex, name: value }
                      editingSwatches.set(index, newSwatch)
                      setEditingSwatches(new Map(editingSwatches))
                    }}
                  />

                  {editingSwatch && (editingSwatch.name !== swatch.name || editingSwatch.hex !== swatch.hex) ?
                    <Button
                      isIconOnly
                      onPress={() => {
                        const newSwatch = editingSwatches.get(index)
                        editingSwatches.delete(index)
                        setColors(colors.toSpliced(index, 1, newSwatch))
                        setEditingSwatches(new Map(editingSwatches))
                      }}
                    >
                      <CheckIcon width={14} />
                    </Button>
                  : null}
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
                  {!!palette[swatch.name] &&
                    Object.entries(palette[swatch.name] as Record<string, string>).map(([step, shade], key) => (
                      <motion.div
                        className="relative w-full"
                        key={key}
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
                        <Tooltip content={`${swatch.name}-${step}`}>
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
            )
          })
        }
      </div>
    </div>
  )
}
