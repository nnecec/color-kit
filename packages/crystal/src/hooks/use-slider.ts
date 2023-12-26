import type { AriaSliderProps, AriaSliderThumbProps } from 'react-aria'

import { useRef } from 'react'
import { useNumberFormatter, useSlider, useSliderThumb } from 'react-aria'
import { useSliderState } from 'react-stately'

type useColorSliderProps<T = number> = AriaSliderProps<T> &
  AriaSliderThumbProps & {
    numberFormatter: Intl.NumberFormatOptions
  }

export const useColorSlider = (props: useColorSliderProps) => {
  const trackRef = useRef(null)
  const inputRef = useRef(null)
  const numberFormatter = useNumberFormatter(props.numberFormatter)
  const state = useSliderState({ ...props, numberFormatter })
  const { groupProps, labelProps, outputProps, trackProps } = useSlider(props, state, trackRef)
  const { inputProps, isDragging, thumbProps } = useSliderThumb(
    {
      index: 0,
      inputRef,
      name: props.name,
      trackRef,
    },
    state,
  )

  return {
    groupProps,
    inputProps,
    isDragging,
    labelProps,
    outputProps,
    thumbProps,
    trackProps,
  }
}
