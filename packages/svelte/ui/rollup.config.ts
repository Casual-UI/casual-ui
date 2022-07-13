import { defineConfig } from 'rollup'
import rollupTypescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte'
import scss from 'rollup-plugin-scss'
import sveltePreprocess from 'svelte-preprocess'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import del from 'rollup-plugin-delete'
export default defineConfig([
  {
    input: 'src/index.ts',
    plugins: [
      del({ targets: 'dist/*' }),
      nodeResolve(),
      scss({
        output: 'dist/style.css',
      }),
      rollupTypescript(),
      svelte({
        preprocess: sveltePreprocess(),
      }),
    ],
    output: {
      format: 'esm',
      file: 'dist/casual-ui-svelte.mjs',
    },
  },
  {
    input: 'src/index.ts',
    plugins: [
      nodeResolve(),
      rollupTypescript(),
      scss({
        output: false,
      }),
      svelte({
        preprocess: sveltePreprocess(),
      }),
    ],
    output: {
      file: 'dist/casual-ui-svelte.cjs',
      format: 'cjs',
    },
  },
])
