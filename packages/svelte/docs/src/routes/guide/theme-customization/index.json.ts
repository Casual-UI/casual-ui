import type { RequestHandler } from '@sveltejs/kit'
import scssCode from '$casual-style/src/variables/colors.scss?raw'
import { codeToHTML } from '$theme/utils/getDemoCodeHTMLFromEager'

export const GET: RequestHandler = async function () {
  return {
    status: 200,
    body: {
      scssCodeHTML: await codeToHTML(scssCode, 'scss'),
    },
  }
}
