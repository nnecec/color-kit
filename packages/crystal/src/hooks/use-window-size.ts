import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState<{ height: number; width: number } | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onResize = () =>
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      })

    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return size
}
