import type { RequestHandler } from '@sveltejs/kit'

const components: any = import.meta.glob('./**/*.svelte', { eager: true })

// parse the sidebar info
const sidebar = Object.entries(components)
  .filter(
    ([k]) =>
      // exclude the layouts
      k.indexOf('__layout.svelte') === -1 &&
      // exclude the index pages
      k !== './index.svelte' &&
      // exclude the demo components
      k.indexOf('_demos') === -1 &&
      // exclude the docs components
      k.indexOf('_components') === -1
  )
  // transfer the path to an sidebar item
  .map(([k, v]: any) => ({
    label: v.title || 'Untitled',
    to:
      '/components/' +
      k
        .replace(/\.svelte$/, '')
        .replace(/^\.\//, '')
        .replace(/\/index$/, '') +
      '/',
  }))

export const GET: RequestHandler = async function () {
  return {
    status: 200,
    body: {
      sidebar,
    },
  }
}
