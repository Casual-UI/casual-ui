import { codeToHTML } from '$theme/utils/getDemoCodeHTMLFromEager'
import type { RequestHandler } from '@sveltejs/kit'

const code = `# via npm
npm install casual-ui-svelte

# via yarn
yarn add casual-ui-svelte

# via pnpm 
pnpm install casual-ui-svelte`

export const GET: RequestHandler = async function () {
  return {
    status: 200,
    body: {
      installHTML: await codeToHTML(code, 'sh'),
      code,
    },
  }
}
