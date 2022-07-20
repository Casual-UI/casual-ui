<script lang="ts" context="module">
  import type { LoadEvent } from '@sveltejs/kit'
  export const title = 'Theme Customization'
  export async function load({ fetch }: LoadEvent) {
    const res = await fetch('/guide/theme-customization.json')

    const props = await res.json()
    return {
      status: res.status,
      props,
    }
  }
</script>

<script lang="ts">
  import Attention from '$theme/Attention.svelte'
  import Link from '$theme/Link.svelte'

  export let scssCodeHTML = ''
</script>

<Attention mb-4>
  <p>
    Use <Link
      label="CSS3 Variables"
      to="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"
      external
    /> to customize your own theme colors <br />
    All of the variables shown below can be override by user
  </p>
</Attention>
{@html scssCodeHTML}
