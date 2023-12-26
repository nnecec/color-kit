import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  integrations: [
    /** @type {import('@astro/starlight').StarlightUserConfigWithPlugins} */
    starlight({
      customCss: ['./src/styles/global.css'],
      head: [
        // Add ICO favicon fallback for Safari.
        {
          attrs: {
            href: '/favicon.ico',
            rel: 'icon',
          },
          tag: 'link',
        },
        {
          attrs: {
            href: '/site.webmanifest',
            rel: 'manifest',
          },
          tag: 'link',
        },
        {
          attrs: {
            href: '/apple-touch-icon.png',
            rel: 'apple-touch-icon',
            sizes: '180x180',
          },
          tag: 'link',
        },
      ],
      sidebar: [
        {
          autogenerate: { directory: 'atom' },
          label: '@color-kit/atom',
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
        'x.com': 'https://x.com/nnecec_cn',
      },
      title: 'ColorKit',
    }),
    tailwind(),
    react(),
  ],
})
