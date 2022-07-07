<script lang="ts">
  import 'uno.css'
  import 'casual-styles'
  import Sidebar from '$theme/layouts/Sidebar.svelte'
</script>

<aside>
  <Sidebar />
</aside>
<div flex-grow>
  <slot />
</div>
