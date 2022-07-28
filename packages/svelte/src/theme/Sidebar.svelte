<script lang="ts">
  import { page } from '$app/stores'
  import Link from '$theme/Link.svelte'
  import { cubicInOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  export let links: {
    label: string
    to: string
  }[] = []

  $: activeLink = $page.url.href
</script>

<div list-none leading-8 m-0 p-0 inline-block pr-8>
  {#each links as { label, to } (to)}
    <div flex items-center relative>
      {#if activeLink.includes(to)}
        <div
          absolute
          left-0
          top-1-2
          i-emojione-monotone-backhand-index-pointing-right
          transition:fly={{ x: -20, easing: cubicInOut, duration: 200 }}
          text-primary
          dark:text-dark-primary
          mr-2
          text-4
          style="transform: translateX(calc(-100% - 12px))"
        />
      {/if}
      <Link {label} {to} />
    </div>
  {/each}
</div>
