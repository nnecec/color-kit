import type { Color } from 'culori'

import { converter } from 'culori'

export const oklch = (color: Color | string) => converter('oklch')(color)
