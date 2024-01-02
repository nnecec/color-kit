import type { Config } from 'tailwindcss'

import daisyui from 'daisyui'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/crystal/src/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: ['dark'],
  },
  darkMode: 'class',
  plugins: [daisyui],
}
export default config
