import million from 'million/compiler'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), react(), tsConfigPaths()],
  server: {
    port: 3001,
  },
})
