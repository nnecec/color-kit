import React, { useCallback, useRef, useState } from 'react'

import { useBoundingClientRect } from '../../hooks'
import { clamp } from '../../utils'

interface IInteractiveProps {
  readonly children: React.ReactNode
  readonly onChange: (x: number, y: number) => void
}

export const Interactive = ({}: IInteractiveProps) => {
  const interactiveRef = useRef<HTMLDivElement>() as any
  const interactiveRect = useBoundingClientRect<HTMLDivElement>(interactiveRef)
  const thumbRef = useRef<HTMLDivElement>() as any
  const thumbRect = useBoundingClientRect<HTMLDivElement>(thumbRef)

  const [position, setPosition] = useState({ x: 0, y: 0 })

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return

      const { height, left, top, width } = interactiveRect!

      const move = (event: PointerEvent | React.PointerEvent<HTMLDivElement>) => {
        const x = clamp(event.clientX - left, 0, width)
        const y = clamp(event.clientY - top, 0, height)

        setPosition({ x, y })
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
    [interactiveRect],
  )

  return (
    <div className="h-20" onPointerDown={onPointerDown} ref={interactiveRef}>
      <div ref={thumbRef} style={{ left: position.x, top: position.y }} />
    </div>
  )
}
