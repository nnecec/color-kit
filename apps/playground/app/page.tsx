'use client'

import { MotionConfig } from 'framer-motion'

import { PaletteIntro } from '../components/palette/intro'
import { PaletteSwatches } from '../components/palette/swatches'
import { PaletteTools } from '../components/palette/tools'

export default function RootPage() {
  return (
    <div className="relative min-h-screen p-3 lg:p-0">
      <MotionConfig transition={{ duration: 0.4, ease: 'easeInOut' }}>
        <PaletteIntro />
        <PaletteSwatches />
        <PaletteTools />
      </MotionConfig>
    </div>
  )
}
