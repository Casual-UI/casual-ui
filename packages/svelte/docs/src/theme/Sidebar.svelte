<script lang="ts">
  import { page } from '$app/stores'
  import Link from '$theme/Link.svelte'

  export let links: {
    label: string
    to: string
  }[] = []

  $: activeLink = $page.url.href
</script>

<div list-none leading-8 m-0 p-0 w-50>
  {#each links as { label, to }}
    <div flex items-center>
      {#if activeLink.includes(to)}
        <div
          i-emojione-monotone-backhand-index-pointing-right
          text-primary
          mr-2
          text-4
        />
      {/if}
      <Link {label} {to} />
    </div>
  {/each}
</div>
