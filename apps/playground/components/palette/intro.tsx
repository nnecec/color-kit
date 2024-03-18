'use client'

import { useState } from 'react'

import { useClipboard } from 'foxact/use-clipboard'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'

import { Button } from '@nextui-org/react'

export function PaletteIntro() {
  const innerHeight = typeof window === undefined ? 600 : window.innerHeight

  const [inPaletteView, setInPaletteView] = useState(false)

  const { copied, copy } = useClipboard({ timeout: 2000 })

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > innerHeight / 2) {
      !inPaletteView && setInPaletteView(true)
    } else {
      inPaletteView && setInPaletteView(false)
    }
  })

  const titleY = useTransform(scrollY, [0, innerHeight], [0, innerHeight / 2.5])

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        animate={{ opacity: 1 }}
        className="group relative text-center"
        initial={{ opacity: 0 }}
        style={{
          y: titleY,
        }}
      >
        <h1 className="isolate mb-4 text-6xl font-bold">tailwind-plugin-palette</h1>
        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 p-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          {copied ?
            'Copied!'
          : <div>
              Install with
              <Button className="mx-2" onClick={() => copy('npm install --save-dev tailwind-plugin-palette')} size="sm">
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
              /
              <Button className="mx-2" onClick={() => copy('bun add --dev tailwind-plugin-palette')} size="sm">
                bun
              </Button>
            </div>
          }
        </div>
      </motion.div>
    </div>
  )
}
