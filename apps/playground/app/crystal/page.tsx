'use client'

import {
  AlphaPicker,
  ChromaPicker,
  ColorAtomProvider,
  HuePicker,
  LightnessPicker,
  PalettePicker,
} from '@color-kit/crystal'

import { ColorValue } from '../../components/color-value'

export default function HomePage() {
  return (
    <div className="h-screen w-screen">
      <ColorAtomProvider value={{ thumb: { size: 16 } }}>
        <div className="absolute bottom-1/2 w-screen pb-20 text-center text-7xl font-bold">
          <ColorValue />
        </div>

        <div className="relative top-1/2 mx-auto h-1/2 max-w-screen-xl columns-3 gap-4">
          <div className="mb-4 break-inside-avoid">
            <PalettePicker className="h-[210px] w-full rounded-t" size={24} />
            <div className="bg-neutral-900">
              <HuePicker size={24} />
              <AlphaPicker className="rounded-b" size={24} />
            </div>
          </div>

          <div className="mb-4 break-inside-avoid rounded border border-white/30 bg-neutral-600/30 p-4">
            <HuePicker />
            <ChromaPicker />
            <LightnessPicker />
            <AlphaPicker />
          </div>

          <div className="mb-4 flex break-inside-avoid gap-3 rounded-xl border border-white/30 p-4">
            <PalettePicker className="h-[350px] w-full rounded-xl" />
            <HuePicker className="rounded-full" orientation="vertical" />
            <AlphaPicker className="rounded-full" orientation="vertical" />
          </div>

          <div className="mb-4 flex h-auto break-inside-avoid flex-col gap-3 rounded-xl border border-neutral-600/60 bg-neutral-800 p-4">
            <HuePicker className="rounded-full" />
            <ChromaPicker className="rounded-full" />
            <LightnessPicker className="rounded-full" />
            <AlphaPicker className="rounded-full" />
          </div>

          <div className="mb-4 flex break-inside-avoid flex-col gap-3 rounded-xl border border-white/30 bg-neutral-800/80 p-4">
            <PalettePicker className="h-[160px] w-full rounded-xl" size={32} />
            <HuePicker className="rounded-full" size={32} />
          </div>
        </div>
      </ColorAtomProvider>
    </div>
  )
}
