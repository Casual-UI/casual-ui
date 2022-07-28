<script context="module" lang="ts">
  import parseDemosFromEager from '$theme/utils/parseDemosFromEager'

  export const title = 'Notification'

  const demos = parseDemosFromEager(
    import.meta.glob('./_demos/*.svelte', { eager: true })
  )
</script>

<script lang="ts">
  import { session } from '$app/stores'
  import { browser } from '$app/env'
  import Attention from '$theme/Attention.svelte'
  import InlineCode from '$theme/InlineCode.svelte'

  export let demosCodeHTML: any = {}
  export let componentAPI: any = {}

  if (browser) {
    $session = { demos, demosCodeHTML, componentAPI }
  }
</script>

<svelte:head>
  <title>{title} - Casual UI Svelte</title>
</svelte:head>

<Attention mb-8>
  Please be aware of that <InlineCode>CNotification</InlineCode>
  need and only need to be <b>placed once </b>in global layout.
</Attention>
