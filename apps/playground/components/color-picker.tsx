import { useRef } from 'react'

import { Button } from '@nextui-org/react'

export const ColorPicker = ({ onChange, value }: { onChange?: (value: string) => void; value: string }) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <Button isIconOnly onClick={() => ref.current?.click()} radius="full" size="sm" style={{ backgroundColor: value }}>
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
