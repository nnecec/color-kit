'use client'
import React, { useCallback, useRef } from 'react'

import clsx from 'clsx'

import { useBoundingClientRect } from '../../hooks'
import { usePropsValue } from '../../hooks/use-props-value'
import { clamp } from '../../utils'

export type Rect = {
  h: number
  w: number
  x: number
  y: number
}

type Value = {
  x: number
  y: number
}

export type InteractiveProps = {
  className?: string
  defaultValue?: Value
  onChange?: (rect: Value) => void
  size?: number
  style?: React.CSSProperties
  thumbStyle?: React.CSSProperties
  value?: Value
}

export const Interactive = ({ defaultValue, onChange, thumbStyle, value, ...props }: InteractiveProps) => {
  const interactiveRef = useRef<HTMLDivElement>() as any
  const interactiveRect = useBoundingClientRect<HTMLDivElement>(interactiveRef)
  const thumbRef = useRef<HTMLDivElement>() as any

  const [position, setPosition] = usePropsValue({ defaultValue: defaultValue ?? { x: 0, y: 0 }, onChange, value })
  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0 || !interactiveRect) return

      const { height, left, top, width } = interactiveRect

      const move = (event: PointerEvent | React.PointerEvent<HTMLDivElement>) => {
        if (width === undefined || height === undefined || left === undefined || top === undefined) return

        const x = clamp(event.clientX - left!, 0, width)
        const y = clamp(event.clientY - top!, 0, height)

        setPosition({ x: width === 0 ? 0 : x / width, y: height === 0 ? 0 : y / height })
      }

      move(event)

      const onPointerMove = (event: PointerEvent) => {
        move(event)
      }

      const onPointerUp = (event: PointerEvent) => {
        move(event)

        document.removeEventListener('pointermove', onPointerMove, false)
        document.removeEventListener('pointerup', onPointerUp, false)
      }

      document.addEventListener('pointermove', onPointerMove, false)
      document.addEventListener('pointerup', onPointerUp, false)
    },
    [interactiveRect, setPosition],
  )

  return (
    <div {...props} className={clsx('relative', props.className)} onPointerDown={onPointerDown} ref={interactiveRef}>
      <div
        className="absolute z-10 block size-6 translate-x-[-50%] translate-y-[-50%] rounded-full border-2 border-neutral-100/80 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-100/10 disabled:pointer-events-none disabled:opacity-50"
        ref={thumbRef}
        style={{
          ...thumbStyle,
          left: `${position.x * 100}%`,
          top: `${position.y * 100}%`,
        }}
      />
    </div>
  )
}
