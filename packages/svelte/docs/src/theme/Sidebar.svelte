<script lang="ts">
  import { page } from '$app/stores'
  import Link from '$theme/Link.svelte'

  export let links: {
    label: string
    to: string
  }[] = []
</script>

<div list-none leading-8 m-0 p-0 w-40>
  {#each links as { label, to }}
    <div flex items-center>
      <Link {label} {to} />
      {#if $page.url.href.includes(to)}
        <div ph-caret-right-light />
      {/if}
    </div>
  {/each}
</div>
