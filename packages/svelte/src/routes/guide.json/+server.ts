import { json } from '@sveltejs/kit'
import parseSidebar from '$theme/utils/parseSidebar'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  return json({
    sidebar: parseSidebar(
      import.meta.glob('./**/*.svelte', { eager: true }),
      '/guide/'
    ),
  })
}
