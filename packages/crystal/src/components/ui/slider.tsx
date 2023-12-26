'use client'

import React from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'

export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
  React.PropsWithChildren<{
    thumbStyle?: React.CSSProperties
    trackStyle?: React.CSSProperties
  }>

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ children, thumbStyle, trackStyle, ...props }, ref) => (
    <SliderPrimitive.Root className="relative flex w-full touch-none select-none items-center " ref={ref} {...props}>
      <SliderPrimitive.Track className="relative h-4 w-full grow overflow-hidden rounded-full" style={trackStyle}>
        <SliderPrimitive.Range className="absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-6 w-6 rounded-full border-2 border-neutral-100/10 bg-clip-padding shadow backdrop-blur focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-100/10 disabled:pointer-events-none disabled:opacity-50"
        style={thumbStyle}
      />
      {children}
    </SliderPrimitive.Root>
  ),
)

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
