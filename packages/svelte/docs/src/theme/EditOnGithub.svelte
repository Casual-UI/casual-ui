<script lang="ts">
  import { page } from '$app/stores'
</script>

<div
  flex
  items-center
  text-primary
  fs-14
  cursor-pointer
  on:click={() => {
    window.open(
      `https://github.com/Blackman99/casual-ui/edit/main/packages/svelte/docs/src/routes/${$page.routeId}/index.svelte`
    )
  }}
>
  <div i-bx-edit text-5 mr-2 />
  Edit this page on github
</div>
