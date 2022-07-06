<script lang="ts">
  import NavBar from '$theme/layouts/NavBar.svelte'
  import 'uno.css'
</script>

<div flex flex-col min-h-screen box-border text-t1 relative pt-18 font-mono>
  <NavBar />

  <div flex flex-grow pb-8>
    <aside>Sidebar</aside>
    <div>
      <slot />
    </div>
  </div>
  <footer text-t-3 text-3 text-center sticky bottom-0 bg-white h-8 leading-8>
    copyright © 2021 - {new Date().getFullYear()} Casual UI
  </footer>
</div>
