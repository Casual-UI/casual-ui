import getDemoCodeHTMLFromEager from '$theme/utils/getDemoCodeHTMLFromEager'
import parseComponentAPI from '$theme/utils/parseComponentAPI'

export async function load() {
  return {
    demosCodeHTML: await getDemoCodeHTMLFromEager(
      import.meta.glob('./_demos/*.svelte', { as: 'raw', eager: true })
    ),
    componentAPI: await parseComponentAPI('form/CToggle'),
  }
}
