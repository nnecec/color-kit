import type { Config } from 'tailwindcss'

import palette from 'tailwind-plugin-palette'

import { nextui } from '@nextui-org/react'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    nextui(),
    palette({
      primary: '#F6B894',
    }),
  ],
  theme: {},
} satisfies Config
