// @ts-nocheck
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import unocss from 'unocss/vite'
import { presetIcons } from 'unocss'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    svelte(),
    unocss({
      presets: [presetIcons()],
    }),
  ],
  build: {
    lib: {
      entry: resolve(process.cwd(), 'src/index.ts'),
      name: 'CasualUISvelte',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['svelte', 'svelte/internal'],
    },
  },
})
