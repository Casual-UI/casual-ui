import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vitePluginVueAutoName from 'vite-plugin-vue-auto-name'

const CWD_PATH = process.cwd()

export default defineConfig({
  plugins: [vue(), vitePluginVueAutoName()],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(CWD_PATH, './index.ts'),
      name: 'CasualUIVue',
      fileName: format => `casual-ui-vue.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
