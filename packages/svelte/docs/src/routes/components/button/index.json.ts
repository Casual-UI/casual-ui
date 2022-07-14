import type { RequestHandler } from '@sveltejs/kit'
import * as shiki from 'shiki'

shiki.setCDN('/shiki/')

export const get: RequestHandler = async function () {
  const demos = import.meta.glob('./_demos/*.svelte', { as: 'raw' })

  const entries = Object.entries(demos)

  const demosCodeHTML: any = {}

  for (const [k, v] of entries) {
    demosCodeHTML[k.replace(/(^\.\/_demos\/)|(\.svelte$)/g, '')] = (
      await shiki.getHighlighter({ theme: 'nord' })
    ).codeToHtml(v as any, { lang: 'html' })
  }

  return {
    status: 200,
    body: {
      demosCodeHTML,
    },
  }
}
