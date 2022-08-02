import { resolve } from 'path'
import { parse } from 'sveltedoc-parser'
import MarkdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'
import nightOwl from './night-owl.json'
// @ts-ignore
import Shiki from 'markdown-it-shiki'

const md = MarkdownIt({ html: true })

md.use(Shiki, {
  theme: nightOwl,
})

md.use(markdownItContainer, 'tip', {
  validate: function (params: string) {
    return params.trim().match(/^tip\s+(.*)$/)
  },
  render(tokens: any, idx: number) {
    const m = tokens[idx].info.trim().match(/^tip\s+(.*)$/)

    if (tokens[idx].nesting === 1) {
      return `<div class="my-2 mr-4" bg-opacity-10="" border-l-6="" rounded-l-2="" box-border="" bg-primary="" border-primary="" pt-4="" pb-2="" pl-4="" fs-14="" mr-4>
          <div font-bold="">
            <div leading-6="">
              ${md.utils.escapeHtml(m[1])}
            </div>
          </div>`
    } else {
      return '</div>\n'
    }
  },
})

export default async (name: string) => {
  const api = await parse({
    filename: resolve(process.cwd(), `./src/lib/components/${name}.svelte`),
    version: 3,
  })

  const converter = <T extends Record<string, any>>(d: T) => ({
    ...d,
    description: md.render(d.description || ''),
  })

  api.data = api.data?.map(converter)

  api.events = api.events?.map(converter)

  api.slots = api.slots?.map(item => {
    const newItem = converter(item)
    newItem.params = newItem.params
      ?.filter(item => item.name !== 'slot')
      .map(converter)

    return newItem
  })

  return api as any
}
