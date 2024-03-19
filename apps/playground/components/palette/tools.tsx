'use client'

import { useState, useTransition } from 'react'

import { AdjustmentsHorizontalIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useAtom } from 'jotai'

import {
  Badge,
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'

import { ColorPicker } from '../../components/color-picker'
import { randomColor } from '../../utils/color'
import { IconButton, colorsAtom, optionsAtom } from './utils'

export function PaletteTools() {
  const [inPaletteView, setInPaletteView] = useState(false)
  const [options, setOptions] = useAtom(optionsAtom)
  const [colors, setColors] = useAtom(colorsAtom)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [, startTransition] = useTransition()

  const isEmptyPalette = colors.length === 0

  const addSwatch = () => {
    let color = randomColor()

    while (colors.some(({ name }) => name === color.name)) {
      color = randomColor()
    }
    setColors([...colors, color])
  }

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > window.innerHeight / 2) {
      !inPaletteView && setInPaletteView(true)
    } else {
      inPaletteView && setInPaletteView(false)
    }
  })

  return (
    <div>
      <motion.div
        animate={inPaletteView ? 'show' : 'hide'}
        className="fixed bottom-10 left-[calc(50%-114px)] z-10 select-none"
        initial="hide"
        variants={{
          hide: { opacity: 0.3, y: 64 + 40 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <motion.div className="flex h-16 items-center gap-3 rounded-full bg-white/30 p-4 shadow backdrop-blur-lg">
          <Badge
            className="cursor-pointer"
            color="danger"
            content={<XMarkIcon width={12} />}
            isInvisible={!options.primary}
            isOneChar
            onClick={() => {
              setOptions({ ...options, primary: '' })
              setColors(colors.filter(color => !['primary', 'secondary'].includes(color.name)))
            }}
            shape="circle"
            showOutline={false}
          >
            <ColorPicker
              className="z-10"
              onChange={value => {
                if (!options.primary) {
                  colors.unshift({ disabled: true, name: 'primary' }, { disabled: true, name: 'secondary' })
                }
                startTransition(() => {
                  setOptions(options => ({ ...options, primary: value }))
                })
              }}
              value={options.primary}
            />
          </Badge>

          <motion.div className="flex gap-3" layout="position">
            <Tooltip content="Add a swatch">
              <IconButton onPress={addSwatch}>
                <PlusIcon width={14} />
              </IconButton>
            </Tooltip>

            <Popover placement="top-start">
              <PopoverTrigger>
                <IconButton>
                  <AdjustmentsHorizontalIcon width={14} />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-4 px-1 py-2">
                  <Checkbox isSelected={options.dark} onValueChange={value => setOptions({ ...options, dark: value })}>
                    Dark
                  </Checkbox>

                  <Checkbox
                    isSelected={options.reversed}
                    onValueChange={value => setOptions({ ...options, reversed: value })}
                  >
                    Reversed
                  </Checkbox>

                  <Checkbox
                    isSelected={options.harmonize}
                    onValueChange={value => setOptions({ ...options, harmonize: value })}
                  >
                    Harmonize
                  </Checkbox>
                </div>
              </PopoverContent>
            </Popover>

            <IconButton isDisabled={isEmptyPalette} onPress={onOpen}>
              <ArrowUpOnSquareIcon width={14} />
            </IconButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="text-xl">Configuration</ModalHeader>
              <ModalBody className="prose dark:prose-invert">
                <h4>1. Install tailwind-plugin-palette</h4>
                <pre>npm install tailwind-plugin-palette</pre>

                <h4>
                  2. Configure your <code>tailwind.config.ts</code>
                </h4>
                <pre>
                  {`import palette from 'tailwind-plugin-palette'

export default {
  plugins: [
    palette(
      ${JSON.stringify(Object.fromEntries([['colors', Object.fromEntries(colors.map(color => [color.name, color.hex]))], ...Object.entries(options).filter(([, value]) => Boolean(value))]), null, 2)}
    )
  ]
}`}
                </pre>
                <h5>2.1 If you just need tailwind colors</h5>
                <pre>{`import palette, { getTailwindColors } from 'tailwind-plugin-palette'

export default {
  plugins: [
    palette({
      colors: getTailwindColors() // or getTailwindColors(400)
    })
  ]
}`}</pre>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
