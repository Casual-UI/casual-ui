import { resolve } from 'path'
import { parse } from 'sveltedoc-parser'

export default async (name: string) =>
  (await parse({
    filename: resolve(process.cwd(), `./src/lib/components/${name}.svelte`),
    version: 3,
  })) as any
