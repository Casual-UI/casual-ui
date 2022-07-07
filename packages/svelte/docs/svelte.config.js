import adapter from '@sveltejs/adapter-static'
import sveltePreprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    dev: true,
  },

  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
      crawl: true,
    },
    alias: {
      $utils: 'src/utils',
      $theme: 'src/theme',
    },
  },

  preprocess: sveltePreprocess(),
}

export default config
