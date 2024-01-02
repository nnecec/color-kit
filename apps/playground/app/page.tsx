'use client'

import {
  AlphaPicker,
  ColorAtomProvider,
  HuePicker,
  LightnessPicker,
  PalettePicker,
  SaturationPicker,
} from '@color-kit/crystal'

import { HSLFields, RGBFields } from '../components/fields'

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <ColorAtomProvider value={{ thumb: { size: 16 } }}>
        <div className="min-h-screen columns-3 gap-4">
          <div className="mb-4 break-inside-avoid">
            <PalettePicker className="h-[210px] w-full rounded-t" />
            <div className="bg-neutral-900">
              <HuePicker size={24} />
              <AlphaPicker className="rounded-b" size={24} />
            </div>
          </div>

          <div className="mb-4 break-inside-avoid rounded bg-neutral-600/30 p-4">
            <HuePicker />
            <SaturationPicker />
            <LightnessPicker />
            <AlphaPicker />
          </div>

          <div className="mb-4 break-inside-avoid rounded border border-neutral-600/60 bg-neutral-900/80 p-4">
            <HSLFields showLabel />
          </div>

          <div className="mb-4 flex break-inside-avoid flex-col gap-3 rounded-xl border border-white/30 p-4">
            <PalettePicker className="h-[200px] w-full rounded-xl" />
            <HuePicker className="rounded-full" size={32} />
            <HSLFields />
          </div>

          <div className="mb-4 break-inside-avoid rounded bg-neutral-700/30 p-4">
            <RGBFields showLabel />
          </div>

          <div className="mb-4 flex h-auto break-inside-avoid flex-col gap-3 border border-neutral-600/60 bg-neutral-800 p-4">
            <HuePicker className="rounded-full" />
            <SaturationPicker className="rounded-full" />
            <LightnessPicker className="rounded-full" />
            <AlphaPicker className="rounded-full" />
          </div>

          <div className="mb-4 flex break-inside-avoid gap-3 rounded-xl border border-white/30 p-4">
            <PalettePicker className="h-[200px] w-full rounded-xl" />
            <HuePicker className="rounded-full" orientation="vertical" />
            <AlphaPicker className="rounded-full" orientation="vertical" />
          </div>
        </div>
      </ColorAtomProvider>
    </div>
  )
}
