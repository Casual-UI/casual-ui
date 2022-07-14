import * as shiki from 'shiki'
shiki.setCDN('/shiki/')

export default async (modules: Record<string, any>) => {
  const entries = Object.entries(modules)

  const demosCodeHTML: any = {}

  for (const [k, v] of entries) {
    demosCodeHTML[k.replace(/(^\.\/_demos\/)|(\.svelte$)/g, '')] = (
      await shiki.getHighlighter({ theme: 'nord' })
    ).codeToHtml(v as any, { lang: 'html' })
  }

  return demosCodeHTML
}
