import getDemoCodeHTMLFromEager from '$theme/utils/getDemoCodeHTMLFromEager'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async function () {
  return {
    status: 200,
    body: {
      demosCodeHTML: await getDemoCodeHTMLFromEager(
        import.meta.glob('./_demos/*.svelte', { as: 'raw' })
      ),
    },
  }
}
