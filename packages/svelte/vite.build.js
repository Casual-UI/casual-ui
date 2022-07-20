// @ts-nocheck
import { defineConfig } from 'vite'
import { resolve } from 'path'
import unoConfig from '../../uno.config.js'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [Unocss(unoConfig)],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(process.cwd(), './src/import-style.js'),
      name: 'casual-ui-svelte',
    },
  },
})
