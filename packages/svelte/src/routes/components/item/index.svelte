<script context="module" lang="ts">
  import parseDemosFromEager from '$theme/utils/parseDemosFromEager'

  export const title = 'Item'

  const demos = parseDemosFromEager(
    import.meta.glob('./_demos/*.svelte', { eager: true })
  )
</script>

<script lang="ts">
  import { session } from '$app/stores'
  import { browser } from '$app/env'
  import Attention from '$theme/Attention.svelte'
  import Link from '$theme/Link.svelte'

  export let componentAPI: any = {}
  export let demosCodeHTML: any = {}

  if (browser) {
    $session = { demos, demosCodeHTML, componentAPI }
  }
</script>

<svelte:head>
  <title>{title} - Casual UI Svelte</title>
</svelte:head>

<Attention mb-8>
  The CItem is used by <Link
    label="Clist"
    to="/components/list"
    text-secondary
  />
</Attention>
