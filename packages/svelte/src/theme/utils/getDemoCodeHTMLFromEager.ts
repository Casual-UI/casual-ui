import * as shiki from 'shiki'
import nightOwlTheme from './night-owl.json'
import parseMarkdown from './parseMarkdown'

export const codeToHTML = async (code: string, lang = 'svelte') =>
  (await shiki.getHighlighter({ theme: nightOwlTheme as any })).codeToHtml(
    code,
    { lang }
  )

export default async (modules: Record<string, any>) => {
  const svelteFiles = Object.entries(modules).filter(([k]) =>
    k.endsWith('.svelte')
  )

  const demosCodeHTML: any = {}

  for (const [k, v] of svelteFiles) {
    const code = v.replace(
      /<script context="module">[\s\w'=-]*<\/script>\n+/,
      ''
    )

    const mdFileName: string = k.replace(/\.svelte$/, '.md')
    demosCodeHTML[k.replace(/(^\.\/_demos\/)|(\.svelte$)/g, '')] = {
      mdDocContent: parseMarkdown(modules[mdFileName]),
      code,
      html: await codeToHTML(code),
    }
  }

  return demosCodeHTML
}
