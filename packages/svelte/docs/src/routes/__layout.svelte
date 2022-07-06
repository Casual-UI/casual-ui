<script lang="ts">
  import { getStores } from '$app/stores'

  import { attributeAtom } from '$utils/attributeAtom'
  import 'uno.css'

  let scrollY = 0

  const { page } = getStores()

  console.log(page)
</script>

<svelte:window bind:scrollY />
<div flex flex-col min-h-screen box-border text-t1 relative pt-18 font-mono>
  <header
    bg-white
    bg-opacity-70
    fixed
    top-0
    left-0
    w-screen
    h-18
    leading-18
    {...attributeAtom({
      'shadow-md': scrollY > 10,
    })}
  >
    <div max-w-360 mx-auto flex justify-between items-center>
      <div flex items-center font->
        <img h-14 src="/logo.svg" alt="" />
        Casual UI - Svelte
      </div>
      <div>导航</div>
    </div>
  </header>

  <div flex flex-grow>
    <aside>Sidebar</aside>
    <div>
      <slot />
    </div>
  </div>
  <footer sticky bottom-0 bg-white>
    copyright © 2021 - {new Date().getFullYear()} Casual UI
  </footer>
</div>

<style>
  header {
    backdrop-filter: saturate(50%) blur(8px);
  }
</style>
