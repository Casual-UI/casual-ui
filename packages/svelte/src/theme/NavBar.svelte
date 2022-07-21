<script lang="ts">
  import casualConfig from '$theme/casual.config'
  import Link from '$theme/Link.svelte'
  import { attributeAtom } from '$theme/utils/attributeAtom'
  let scrollY = 0
</script>

<svelte:window bind:scrollY />

<!-- 
  @component
  The navbar header of global layout
 -->

<header
  bg-white
  sm:fixed
  sticky
  top-0
  z-999
  left-0
  w-screen
  h-14
  md:h-18
  leading-14
  md:leading-18
  {...attributeAtom({
    'shadow-md': scrollY > 10,
    'bg-opacity-70': scrollY > 10,
  })}
>
  <div max-w-300 mx-auto flex justify-between items-center md:px-8 px-2>
    <div flex items-center>
      <Link flex items-center transition transition-opacity>
        <img h-14 src="/logo.svg" alt="" />
        <span sm:fs-14 md:text-4> Casual UI - Svelte </span>
      </Link>
    </div>
    <div items-center gap-2 display-none md:flex>
      <Link to="/components/button/" label="Components" />
      <Link to={casualConfig.github} text-8 external hideExternalIcon>
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
