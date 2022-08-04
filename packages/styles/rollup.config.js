import { defineConfig } from 'rollup'
import scss from 'rollup-plugin-scss'

export default defineConfig({
  input: 'src/index.js',
  plugins: [
    scss({
      output: 'dist/style.css',
    }),
  ],
  output: {
    dir: 'dist',
  },
})
