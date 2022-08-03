import { resolve } from 'path'
import { parse } from 'sveltedoc-parser'
import parseMarkdown from './parseMarkdown'

export default async (name: string) => {
  const api = await parse({
    filename: resolve(process.cwd(), `./src/lib/components/${name}.svelte`),
    version: 3,
  })

  const converter = <T extends Record<string, any>>(d: T) => ({
    ...d,
    description: parseMarkdown(d.description),
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
