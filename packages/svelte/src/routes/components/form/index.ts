import getDemoCodeHTMLFromEager from '$theme/utils/getDemoCodeHTMLFromEager'
import parseComponentAPI from '$theme/utils/parseComponentAPI'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  return {
    status: 200,
    body: {
      demosCodeHTML: await getDemoCodeHTMLFromEager(
        import.meta.glob('./_demos/*.(svelte|md)', { as: 'raw', eager: true })
      ),
      componentAPI: await parseComponentAPI('form/CForm'),
    },
  }
}
