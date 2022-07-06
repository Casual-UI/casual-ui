<script lang="ts">
  import { attributeAtom } from '$utils/attributeAtom'

  import 'uno.css'

  let scrollY = 0

  $: {
    console.log(scrollY)
  }
</script>

<svelte:window bind:scrollY />
<div flex flex-col min-h-screen pt-14 box-border text-t1>
  <header
    bg-white
    flex
    justify-between
    fixed
    top-0
    left-0
    right-0
    h-14
    leading-14
    {...attributeAtom({
      'shadow-md': scrollY > 10,
    })}
  >
    <div>顶导</div>
  </header>

  <div flex flex-grow>
    <aside>左侧导航</aside>
    <div>
      <slot />
    </div>
  </div>
  <footer sticky bottom-0 bg-white>
    copyright © 2021 - {new Date().getFullYear()} Casual UI
  </footer>
</div>
