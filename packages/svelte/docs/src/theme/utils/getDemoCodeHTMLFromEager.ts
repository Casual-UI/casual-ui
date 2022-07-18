import * as shiki from 'shiki'
import nightOwlTheme from './night-owl.json'

export const codeToHTML = async (code: string, lang = 'html') =>
  (await shiki.getHighlighter({ theme: nightOwlTheme as any })).codeToHtml(
    code,
    { lang }
  )

export default async (modules: Record<string, any>) => {
  const entries = Object.entries(modules)

  const demosCodeHTML: any = {}

  for (const [k, v] of entries) {
    demosCodeHTML[k.replace(/(^\.\/_demos\/)|(\.svelte$)/g, '')] = {
      code: v,
      html: await codeToHTML(v),
    }
  }

  return demosCodeHTML
}
