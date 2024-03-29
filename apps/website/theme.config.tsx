import type { DocsThemeConfig } from 'nextra-theme-docs'

import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'

import { Logo } from './components/logo'

const config: DocsThemeConfig = {
  chat: {
    icon: (
      <svg height={24} viewBox="0 0 24 24" width={24}>
        <g>
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          />
        </g>
      </svg>
    ),
    link: 'https://x.com/nnecec_cn',
  },
  docsRepositoryBase: 'https://github.com/nnecec/color-kit',
  editLink: {
    component: ({ children, filePath }) => (
      <a
        className="nx-text-xs nx-font-medium nx-text-gray-500 hover:nx-text-gray-900 dark:nx-text-gray-400 dark:hover:nx-text-gray-100 contrast-more:nx-text-gray-800 contrast-more:dark:nx-text-gray-50"
        href={`https://github.com/nnecec/color-kit/tree/main/apps/website/${filePath}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    ),
    text: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div>
          <a
            className="flex items-center gap-1 text-current"
            href="https://github.com/nnecec/color-kit"
            rel="noopener noreferrer"
            target="_blank"
            title="vercel.com homepage"
          >
            <span>© {new Date().getFullYear()} nnecec. </span>
          </a>
        </div>
        <p className="mt-6 text-xs">Released under the MIT License</p>
      </div>
    ),
  },
  head: function useHead() {
    const { title } = useConfig()
    return (
      <>
        <meta content="#fff" name="msapplication-TileColor" />
        <meta content="#fff" name="theme-color" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="en" httpEquiv="Content-Language" />
        <meta content="Formatting Chinese with ease." name="description" />
        <meta content="Formatting Chinese with ease." name="og:description" />
        <meta content={title ? title + ' – ColorKit' : 'ColorKit'} name="og:title" />
        <meta content="ColorKit" name="apple-mobile-web-app-title" />
        <link href="/favicon.ico" rel="icon" type="image/svg+xml" />
      </>
    )
  },
  logo: <Logo size={36} />,
  primaryHue: 35,
  project: {
    link: 'https://github.com/nnecec/color-kit',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    },
    toggleButton: true,
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – ColorKit',
      }
    }
  },
}

export default config
