import { codeToHTML } from '$theme/utils/getDemoCodeHTMLFromEager'
import importStyle from './_demos/import-style?raw'
import simpleUse from './_demos/simple-use.svelte?raw'

const code = `# via npm
npm install casual-ui-svelte

# via yarn
yarn add casual-ui-svelte

# via pnpm 
pnpm install casual-ui-svelte`

export async function load() {
  return {
    installHTML: await codeToHTML(code, 'sh'),
    code,
    importStyleHTML: await codeToHTML(importStyle, 'js'),
    importStyleCode: importStyle,
    simpleUseHTML: await codeToHTML(simpleUse),
    simpleUseCode: simpleUse,
  }
}
