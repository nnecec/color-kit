'use client'

import type { SetStateAction } from 'react'
import { useRef, useState } from 'react'

import { useMemoizedFn } from './use-memoized-fn'

type Options<T> = {
  defaultValue: T
  onChange?: (v: T) => void
  value?: T
}

export function usePropsValue<T>(options: Options<T>) {
  const { defaultValue, onChange, value } = options

  const [, update] = useState([])

  const stateRef = useRef<T>(value === undefined ? defaultValue : value)
  if (value !== undefined) {
    stateRef.current = value
  }

  const setState = useMemoizedFn((v: SetStateAction<T>, forceTrigger: boolean = false) => {
    // `forceTrigger` means trigger `onChange` even if `v` is the same as `stateRef.current`
    const nextValue = typeof v === 'function' ? (v as (prevState: T) => T)(stateRef.current) : v
    if (!forceTrigger && nextValue === stateRef.current) return
    stateRef.current = nextValue
    update([])
    return onChange?.(nextValue)
  })
  return [stateRef.current, setState] as const
}
