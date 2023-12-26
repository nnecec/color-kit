import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      sidebar: [
        {
          // items: [{ label: 'Example Guide', link: '/guides/example/' }],
          autogenerate: { directory: 'core' },
          label: '@color-kit/core',
        },
        {
          autogenerate: { directory: 'react' },
          label: '@color-kit/react',
        },
        {
          autogenerate: { directory: 'crystal' },
          label: '@color-kit/crystal',
        },
      ],
      social: {
        github: 'https://github.com/nnecec/color-kit',
      },
      title: 'ColorKit',
    }),
    tailwind(),
    react(),
  ],
})
