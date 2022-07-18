import getDemoCodeHTMLFromEager from '$theme/utils/getDemoCodeHTMLFromEager'
import type { RequestHandler } from '@sveltejs/kit'
import { resolve } from 'path'
import { parse } from 'sveltedoc-parser'

export const GET: RequestHandler = async function () {
  return {
    status: 200,
    body: {
      demosCodeHTML: await getDemoCodeHTMLFromEager(
        import.meta.glob('./_demos/*.svelte', { as: 'raw', eager: true })
      ),
      componentAPI: (await parse({
        filename: resolve(
          process.cwd(),
          '../ui/src/components/CLoading.svelte'
        ),
        version: 3,
      })) as any,
    },
  }
}
