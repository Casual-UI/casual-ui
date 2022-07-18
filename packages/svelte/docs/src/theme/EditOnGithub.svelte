<script lang="ts">
  import { page } from '$app/stores'
  import Link from './Link.svelte'
</script>

<Link
  to={`https://github.com/Blackman99/casual-ui/edit/main/packages/svelte/docs/src/routes/${$page.routeId}/index.svelte`}
  external
  hideExternalIcon
>
  <div flex items-center text-primary>
    <div i-bx-edit text-5 mr-2 />
    Edit this page on github
  </div>
</Link>
