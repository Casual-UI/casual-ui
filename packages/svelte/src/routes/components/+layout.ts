import type { LoadEvent } from '@sveltejs/kit'

const allDemosRaw = import.meta.glob('./**/_demo/*.svelte', {
  eager: true,
  as: 'raw',
})

// TODO: 解析demos得到执行demos之后预渲染DOM内容以及语法高亮后的DOM内容

export async function load({ fetch }: LoadEvent) {
  return {
    sidebar: [],
    demos: [],
    componentAPI: {},
  }
}
