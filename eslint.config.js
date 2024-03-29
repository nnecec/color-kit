import pluginNext from '@next/eslint-plugin-next'
import nnecec from '@nnecec/eslint-config'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...nnecec({
    react: true,
    tailwindcss: true,
    typescript: true,
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['apps/playground/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs['core-web-vitals'].rules,
    },
    settings: {
      next: {
        rootDir: ['apps/*/'],
      },
    },
  },
  {
    files: ['apps/**/*.{js,jsx,ts,tsx}'],
    settings: {
      tailwindcss: {
        config: './apps/playground/tailwind.config.ts',
      },
    },
  },
]
