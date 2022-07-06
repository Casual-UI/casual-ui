<script lang="ts">
  import NavBar from '$theme/layouts/NavBar.svelte'
  import 'uno.css'
  import 'casual-styles'
  import GlobalLayout from '$theme/GlobalLayout.svelte'
  import Sidebar from '$theme/layouts/Sidebar.svelte'
</script>

<GlobalLayout>
  <NavBar slot="header" />

  <Sidebar slot="aside" />

  <!-- This is where page content are -->
  <slot />
</GlobalLayout>
