import type { AriaSliderProps } from 'react-aria'

import { useRef } from 'react'
import { VisuallyHidden, mergeProps, useFocusRing, useNumberFormatter, useSlider, useSliderThumb } from 'react-aria'
import { useSliderState } from 'react-stately'

import { cls } from '../../utils'

export type SliderProps<T = number> = AriaSliderProps<T> & {
  className?: string
  name?: string
  size?: number
  thumbStyle?: React.CSSProperties
  trackStyle?: React.CSSProperties
}

export function Slider<T extends number | number[] = number>({
  className,
  size = 16,
  thumbStyle,
  trackStyle,
  ...props
}: SliderProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null)
  const numberFormatter = useNumberFormatter()
  const state = useSliderState({ ...props, numberFormatter })
  const { groupProps, labelProps, outputProps, trackProps } = useSlider(props, state, trackRef)

  const inputRef = useRef(null)
  const { inputProps, isDragging, thumbProps } = useSliderThumb(
    {
      index: 0,
      inputRef,
      name: props.name,
      trackRef,
    },
    state,
  )

  const { focusProps, isFocusVisible } = useFocusRing()
  return (
    <div {...groupProps} className={cls('flex', state.orientation === 'horizontal' && 'flex-col')}>
      {props.label ?
        <div className="flex justify-between">
          <label {...labelProps}>{props.label}</label>
          <output {...outputProps}>{state.getThumbValueLabel(0)}</output>
        </div>
      : null}
      <div
        {...trackProps}
        className={cls('size-full', state.isDisabled ? 'opacity-50' : '', className)}
        ref={trackRef}
        style={{
          ...trackProps.style,
          ...trackStyle,
          ...(state.orientation === 'horizontal' && { height: size }),
          ...(state.orientation === 'vertical' && { width: size }),
        }}
      >
        <div
          {...thumbProps}
          className={cls(
            'rounded-full border-2 border-white',
            isFocusVisible ? 'ring ring-neutral-500/30' : '',
            isDragging ? 'cursor-grabbing' : 'cursor-grab',
            state.orientation === 'horizontal' && 'h-full top-1/2',
            state.orientation === 'vertical' && 'w-full left-1/2',
          )}
          style={{
            ...thumbProps.style,
            ...thumbStyle,
            ...(state.orientation === 'horizontal' && { width: size }),
            ...(state.orientation === 'vertical' && { height: size }),
          }}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
          </VisuallyHidden>
        </div>
      </div>
    </div>
  )
}
