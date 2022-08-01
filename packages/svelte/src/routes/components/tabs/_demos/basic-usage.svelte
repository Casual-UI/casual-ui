<script lang="ts">
  import { CTabs } from 'casual-ui-svelte'
  import type { ComponentType } from 'svelte'
  import Apple from './Apple.svelte'
  import Banana from './Banana.svelte'
  import Grapes from './Grapes.svelte'

  const items: Array<{
    name: string
    body: ComponentType
  }> = [
    {
      name: 'Apple',
      body: Apple,
    },
    {
      name: 'Banana',
      body: Banana,
    },
    {
      name: 'Grapes',
      body: Grapes,
    },
  ]

  let activeItem = 'Apple'
</script>

<CTabs bind:activeItem {items} />
