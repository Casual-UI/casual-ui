import * as shiki from 'shiki'
import nightOwlTheme from './night-owl.json'

export default async (modules: Record<string, any>) => {
  const entries = Object.entries(modules)

  const demosCodeHTML: any = {}

  for (const [k, v] of entries) {
    demosCodeHTML[k.replace(/(^\.\/_demos\/)|(\.svelte$)/g, '')] = (
      await shiki.getHighlighter({ theme: nightOwlTheme as any })
    ).codeToHtml(v as any, { lang: 'html' })
  }

  return demosCodeHTML
}
