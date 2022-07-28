// parse the sidebar info
export default (files: any, prefix: string) =>
  Object.entries(files)
    .filter(
      ([k]) =>
        // exclude the layouts
        k.indexOf('__layout.svelte') === -1 &&
        // exclude the index pages
        k !== './index.svelte' &&
        // exclude the demo components
        k.indexOf('_demos') === -1
    )
    // transfer the path to an sidebar item
    .map(([k, v]: any) => ({
      label: v.title || 'Untitled',
      to:
        prefix +
        k
          .replace(/\.svelte$/, '')
          .replace(/^\.\//, '')
          .replace(/\/index$/, '') +
        '/',
    }))
