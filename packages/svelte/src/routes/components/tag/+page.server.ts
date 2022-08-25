import getDemoCodeHTMLFromEager from '$theme/utils/getDemoCodeHTMLFromEager'
import parseComponentAPI from '$theme/utils/parseComponentAPI'
import type { PageServerLoad } from '@sveltejs/kit'

export const load: PageServerLoad = async function () {
  return {
  demosCodeHTML: await getDemoCodeHTMLFromEager(
    import.meta.glob('./_demos/*.svelte', { as: 'raw', eager: true })
  ),
  componentAPI: await parseComponentAPI('CTag'),
}
}
