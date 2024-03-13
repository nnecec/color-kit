import type { ButtonProps } from '@nextui-org/react'

import { useRef } from 'react'

import { Button } from '@nextui-org/react'

export const ColorPicker = ({
  onChange,
  value,
  ...props
}: { onChange?: (value: string) => void; value?: string } & ButtonProps) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <Button
      isIconOnly
      onClick={() => ref.current?.click()}
      radius="full"
      size="sm"
      style={{
        backgroundColor: value ?? 'rgba(255 255 255)',
        backgroundImage:
          value ? 'none' : (
            `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')`
          ),
        zIndex: 10,
      }}
      {...props}
    >
      <input
        className="invisible absolute left-0 size-0"
        onChange={e => onChange?.(e.target.value)}
        ref={ref}
        type="color"
        value={value}
      />
    </Button>
  )
}
