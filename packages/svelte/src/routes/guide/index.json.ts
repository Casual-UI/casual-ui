import parseSidebar from '$theme/utils/parseSidebar'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function () {
  return {
    status: 200,
    body: {
      sidebar: parseSidebar(
        import.meta.glob('./**/*.svelte', { eager: true }),
        '/guide/'
      ),
    },
  }
}
