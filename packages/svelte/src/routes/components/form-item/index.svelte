<script context="module" lang="ts">
  import parseDemosFromEager from '$theme/utils/parseDemosFromEager'

  export const title = 'FormItem'

  const demos = parseDemosFromEager(
    import.meta.glob('./_demos/*.svelte', { eager: true })
  )
</script>

<script lang="ts">
  import { session } from '$app/stores'
  import { browser } from '$app/env'
  import Link from '$theme/Link.svelte'
  import Attention from '$theme/Attention.svelte'

  export let componentAPI: any = {}
  export let demosCodeHTML: any = {}

  if (browser) {
    $session = { demos, demosCodeHTML, componentAPI }
  }
</script>

<svelte:head>
  <title>{title} - Casual UI Svelte</title>
</svelte:head>

<Attention type="primary" title="NOTICE">
  All the props that has the same name with <Link
    to="/components/form"
    label="CForm"
  /> would have a higher priority.
</Attention>

<p>
  It is recommended to use this component along with <Link
    to="/components/form"
    label="CForm"
  />
</p>
