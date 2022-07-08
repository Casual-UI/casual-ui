<script lang="ts">
  import casualConfig from '$theme/casual.config'
  import Link from '$theme/Link.svelte'
  import { attributeAtom } from 'casual-utils'
  let scrollY = 0
</script>

<svelte:window bind:scrollY />

<header
  bg-white
  bg-opacity-70
  fixed
  top-0
  z-999
  left-0
  w-screen
  h-18
  leading-18
  {...attributeAtom({
    'shadow-md': scrollY > 10,
  })}
>
  <div max-w-360 mx-auto flex justify-between items-center>
    <div flex items-center>
      <Link flex items-center transition transition-opacity>
        <img h-14 src="/logo.svg" alt="" />
        Casual UI - Svelte
      </Link>
    </div>
    <div flex items-center gap-2>
      <Link to="/components/" label="Components" />
      <Link to={casualConfig.github} text-8 external>
        <div i-openmoji-github />
      </Link>
    </div>
  </div>
</header>

<style>
  header {
    backdrop-filter: saturate(50%) blur(8px);
  }
</style>
