'use client'

import type { MutableRefObject } from 'react'
import { useRef, useState } from 'react'

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect'
import { useWindowSize } from './use-window-size'

export const useBoundingClientRect = <T extends HTMLElement | null>(ref: MutableRefObject<T>) => {
  useRef
  const [boundingClientRect, setBoundingClientRect] = useState<Partial<DOMRect | null>>(null)
  const windowSize = useWindowSize()

  const onResize = ({ target }: { target: T }) => {
    if (!target) {
      return
    }

    const clientRect = target.getBoundingClientRect()
    setBoundingClientRect(clientRect)
  }

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    const resizeObserver = new ResizeObserver(onResize as any)
    resizeObserver.observe(ref.current)
    onResize({ target: ref.current })
    return () => {
      resizeObserver.unobserve(ref.current!)
    }
  }, [ref])

  useIsomorphicLayoutEffect(() => {
    if (!ref.current || typeof onResize !== 'function') {
      return
    }

    onResize({
      target: ref.current,
    })
  }, [ref, windowSize])

  return boundingClientRect
}
