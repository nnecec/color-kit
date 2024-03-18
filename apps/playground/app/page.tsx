'use client'

import { MotionConfig } from 'framer-motion'
import { useAtomValue } from 'jotai'

import { PaletteIntro } from '../components/palette/intro'
import { PaletteSwatches } from '../components/palette/swatches'
import { PaletteTools } from '../components/palette/tools'
import { optionsAtom } from '../components/palette/utils'

export default function RootPage() {
  const options = useAtomValue(optionsAtom)

  return (
    <div
      className="relative min-h-screen"
      style={{
        // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
        background: options.primary ? `linear-gradient(transparent 0, ${options.primary}28 80vh` : undefined,
      }}
    >
      <MotionConfig transition={{ duration: 0.4, ease: 'easeInOut' }}>
        <PaletteIntro />
        <PaletteSwatches />
        <PaletteTools />
      </MotionConfig>
    </div>
  )
}
