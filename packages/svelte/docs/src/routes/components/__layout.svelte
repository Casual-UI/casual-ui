<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit'
  export async function load({ fetch }: LoadEvent) {
    const res = await fetch('/components.json')

    const props = await res.json()
    return {
      status: res.status,
      props,
    }
  }
</script>

<script lang="ts">
  import Sidebar from '$theme/Sidebar.svelte'

  export let sidebar: any
</script>

<div flex pt-8 justify-center>
  <aside
    fixed
    top-18
    bottom-0
    fs-14
    box-border
    z-3
    class="left"
    flex
    justify-end
    pr-8
    pt-8
    bg-white
  >
    <Sidebar links={sidebar} />
  </aside>
  <div w-240 min-h-screen>
    <slot />
  </div>
  <aside class="right" box-border fixed top-26 z-3>slug nav</aside>
</div>

<style>
  .left {
    left: 0;
    right: calc(62rem + (100vw - 60rem) / 2);
  }
  .right {
    left: calc(62rem + (100vw - 60rem) / 2);
    right: 0;
  }
</style>
