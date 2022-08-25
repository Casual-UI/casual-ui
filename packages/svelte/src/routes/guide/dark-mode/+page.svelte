<script lang="ts" context="module">
  export const title = 'Dark Mode'
</script>

<script>
  import InlineCode from '$theme/InlineCode.svelte'
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<p>
  Simply add <InlineCode>dark</InlineCode> class to the html tag. That's it.
</p>
