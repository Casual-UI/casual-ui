import parseDemosFromEager from '$theme/utils/parseDemosFromEager'

export const title = 'Tabs'

const demos = parseDemosFromEager(
  import.meta.glob('./_demos/*.svelte', { eager: true })
)
