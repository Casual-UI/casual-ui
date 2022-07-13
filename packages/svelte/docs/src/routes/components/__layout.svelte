<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit'
  export async function load({ fetch }: LoadEvent) {
    const res = await fetch('/components.json')

    const props = await res.json()
    return {
      status: res.status,
      props,
    }
  }
</script>

<script lang="ts">
  import 'uno.css'
  import 'casual-styles'
  import Sidebar from '$theme/Sidebar.svelte'

  export let sidebar: any
</script>

<aside pr-4>
  <Sidebar links={sidebar} />
</aside>
<div flex-grow p-4>
  <slot />
</div>
<div>slug nav</div>
