import type { RequestHandler } from '@sveltejs/kit'

const components = import.meta.globEager('./**/*.svelte')

const sidebar = Object.entries(components)
  .filter(
    ([k]) => k.indexOf('__layout.svelte') === -1 && k !== './index.svelte'
  )
  .map(([k, v]) => ({
    label: v.title || 'Untitled',
    to: '/components/' + k.replace(/\.svelte$/, '').replace(/^\.\//, ''),
  }))

export const post: RequestHandler = async function ({}) {
  return {
    status: 200,
    body: {
      sidebar,
    },
  }
}
