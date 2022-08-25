import type { PageServerLoad } from '@sveltejs/kit'
import scssCode from '$casual-style/src/variables/colors.scss?raw'
import { codeToHTML } from '$theme/utils/getDemoCodeHTMLFromEager'

export const load: PageServerLoad = async function () {
  return {
  scssCodeHTML: await codeToHTML(scssCode, 'scss'),
}
}
