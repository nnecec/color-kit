import type { Config } from 'tailwindcss'

import palette, { createPalette } from 'tailwind-plugin-palette'

import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/crystal/src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: createPalette({
            dark: true,
            primary: '#F6B894',
          }),
        },
      },
    }),
  ],
}

export default config
