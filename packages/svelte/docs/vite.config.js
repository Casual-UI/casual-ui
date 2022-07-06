import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    Unocss({
      theme: {
        colors: {
          primary: '#8155F4',
          t1: '#213547',
          t2: 'rgba(60, 60, 60, .7)',
          t3: 'rgba(60, 60, 60, .33)',
          t4: 'rgba(60, 60, 60, .18)',
          dark: {
            t1: 'rgba(255, 255, 255, .87)',
            t2: 'rgba(235, 235, 235, .6)',
            t3: 'rgba(60, 60, 60, .33)',
            t4: 'rgba(60, 60, 60, .18)',
          },
        },
      },
      presets: [presetAttributify(), presetUno()],
    }),
    sveltekit(),
  ],
})
