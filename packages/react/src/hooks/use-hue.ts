import { getHueColor } from '@color-kit/core'

export const useHue = () => {
  const hueColor = getHueColor()
  return {
    linearGradient: Object.entries(hueColor)
      .map(([percent, color]) => `${color} ${percent}%`)
      .join(','),
  }
}
