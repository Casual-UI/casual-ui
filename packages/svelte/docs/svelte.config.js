import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: mdsvex({
    extensions: ['.mdsv'],
  }),

  extensions: ['.svelte', '.mdsv'],

  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        Unocss({
          presets: [presetAttributify(), presetUno()],
        }),
      ],
    },
  },
}

export default config
