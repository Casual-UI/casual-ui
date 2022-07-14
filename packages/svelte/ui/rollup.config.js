import { defineConfig } from 'rollup'
import scss from 'rollup-plugin-scss'
import del from 'rollup-plugin-delete'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

export default defineConfig([
  {
    input: 'src/index.ts',
    plugins: [
      typescript(),
      nodeResolve({
        browser: true,
      }),
      del({
        targets: 'dist/*',
      }),
      scss({
        output: 'dist/style.css',
      }),
      svelte({
        preprocess: sveltePreprocess(),
      }),
    ],
    output: {
      format: 'esm',
      file: 'dist/index.mjs',
    },
    external: ['svelte', 'svelte/internal'],
  },
  {
    input: 'src/index.ts',
    plugins: [
      typescript(),
      nodeResolve(),
      scss({
        output: false,
      }),
      svelte({
        preprocess: sveltePreprocess(),
      }),
    ],
    external: ['svelte', 'svelte/internal'],
    output: {
      format: 'cjs',
      file: 'dist/index.cjs',
    },
  },
])
