import type { Plugin } from 'vite'

interface VitePluginSvelteMdOptions {
  extensions: string[]
}

const VitePluginSvelteMd: Plugin = function () {
  return {
    name: 'vite-plugin-svelte-md',
  }
}

export default VitePluginSvelteMd
