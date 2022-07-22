<script context="module" lang="ts">
  import parseDemosFromEager from '$theme/utils/parseDemosFromEager'

  export const title = 'Button'

  const demos = parseDemosFromEager(
    import.meta.glob('./_demos/*.svelte', { eager: true })
  )
</script>

<script lang="ts">
  import Attention from '$theme/Attention.svelte'
  import Link from '$theme/Link.svelte'
  import { session } from '$app/stores'
  import { browser } from '$app/env'

  // the demos rendered colored html content
  export let demosCodeHTML: any = {}

  // the components api json data
  export let componentAPI: any = {}

  // in the browser pass demos to session
  if (browser) {
    $session = { demos, componentAPI, demosCodeHTML }
  }
</script>

<svelte:head>
  <title>{title} - Casual UI</title>
</svelte:head>

<div mb-8>
  <Attention>
    <div slot="title" flex items-center>
      <div i-fluent-lightbulb-filament-16-regular mr-1 text-6 />
      Tip
    </div>
    This documentation use
    <Link
      external
      to="https://github.com/unocss/unocss/tree/main/packages/preset-icons/"
      label="UnoCSS preset-icons"
    />
    for icon button
  </Attention>
</div>
