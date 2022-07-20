import getDemoCodeHTMLFromEager from '$theme/utils/getDemoCodeHTMLFromEager'
import parseComponentAPI from '$theme/utils/parseComponentAPI'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  const demosCodeHTML = await getDemoCodeHTMLFromEager(
    import.meta.glob('./_demos/*.svelte', { as: 'raw', eager: true })
  )

  return {
    status: 200,
    body: {
      demosCodeHTML,
      componentAPI: await parseComponentAPI('CButton'),
    },
  }
}
