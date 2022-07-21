import { resolve } from 'path'
import { parse } from 'sveltedoc-parser'
import MarkdownIt from 'markdown-it'

const md = MarkdownIt()

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

  api.slots = api.slots?.map(converter)

  return api as any
}
