import type { RequestHandler } from '@sveltejs/kit'
import parseSidebar from '$theme/utils/parseSidebar'

export const GET: RequestHandler = async function () {
  return {
    status: 200,
    body: {
      sidebar: parseSidebar(
        import.meta.glob('./**/*.svelte', { eager: true }),
        '/components/'
      ),
    },
  }
}
