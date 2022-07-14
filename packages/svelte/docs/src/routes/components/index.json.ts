import type { RequestHandler } from '@sveltejs/kit'

const components = import.meta.globEager('./**/*.svelte')

const sidebar = Object.entries(components)
  .filter(
    ([k]) =>
      k.indexOf('__layout.svelte') === -1 &&
      k !== './index.svelte' &&
      k.indexOf('_demos') === -1
  )
  .map(([k, v]) => ({
    label: v.title || 'Untitled',
    to:
      '/components/' +
      k
        .replace(/\.svelte$/, '')
        .replace(/^\.\//, '')
        .replace(/\/index$/, '') +
      '/',
  }))

export const get: RequestHandler = async function ({}) {
  return {
    status: 200,
    body: {
      sidebar,
    },
  }
}
