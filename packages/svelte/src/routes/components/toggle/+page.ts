import parseDemosFromEager from '$theme/utils/parseDemosFromEager'

export const title = 'Toggle'

const demos = parseDemosFromEager(
  import.meta.glob('./_demos/*.svelte', { eager: true })
)
