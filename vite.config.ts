import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { loadManifest } from './build/manifest.ts'

import { distribution } from './build/distribution.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), distribution()],
  publicDir: false,
  define: {
    __LESSONS__: JSON.stringify(loadManifest()),
  },
  server: {
    fs: {
      deny: [
        '.env',
        '.env.*',
        '**/.git/**',
        '**/docs/**',
        '**/design-reviews/**',
        '**/reference-materials/**',
        '**/*.zip',
        '**/*.pdf',
      ],
    },
  },
})
