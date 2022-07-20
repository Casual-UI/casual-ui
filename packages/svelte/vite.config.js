// @ts-nocheck
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import unoConfig from '../../uno.config.js'
import Unocss from 'unocss/vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [Unocss(unoConfig), sveltekit()],
})
