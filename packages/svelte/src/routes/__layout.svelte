<script lang="ts">
  import NavBar from '$theme/NavBar.svelte'
  import 'uno.css'
  import 'casual-styles/dist/style.css'
  import GlobalLayout from '$theme/GlobalLayout.svelte'
  import CNotification from '$lib/components/CNotification.svelte'
  import './reset.css'
</script>

<GlobalLayout>
  <NavBar slot="header" />

  <!-- This is where page content are -->
  <slot />

  <CNotification />
</GlobalLayout>
