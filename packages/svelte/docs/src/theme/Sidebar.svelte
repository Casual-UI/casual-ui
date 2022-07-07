<script lang="ts">
  import Link from '$theme/Link.svelte'

  export let links: {
    label: string
    to: string
  }[] = []
</script>

<ul>
  {#each links as { label, to }}
    <li>
      <Link {label} {to} />
    </li>
  {/each}
</ul>
