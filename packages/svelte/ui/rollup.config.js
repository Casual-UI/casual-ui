import { defineConfig } from 'rollup'
import scss from 'rollup-plugin-scss'
import del from 'rollup-plugin-delete'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default defineConfig([
  {
    input: 'src/index.js',
    plugins: [
      nodeResolve(),
      del({
        targets: 'dist/*',
      }),
      scss({
        output: 'dist/style.css',
      }),
    ],
    output: {
      format: 'esm',
      dir: 'dist',
    },
  },
])
