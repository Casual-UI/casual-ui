import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    dev: true,
  },

  preprocess: mdsvex({
    extensions: ['.mdsv'],
  }),

  extensions: ['.svelte', '.mdsv'],

  kit: {
    adapter: adapter(),
    alias: {
      $utils: 'src/utils',
    },
  },
}

export default config
