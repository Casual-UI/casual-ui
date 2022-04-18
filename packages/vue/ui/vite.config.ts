import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vitePluginVueAutoName from 'vite-plugin-vue-auto-name'
import type { PluginOption } from 'vite'

const CWD_PATH = process.cwd()

export default defineConfig({
  plugins: [vue() as PluginOption, vitePluginVueAutoName() as PluginOption],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(CWD_PATH, './src/index.ts'),
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
