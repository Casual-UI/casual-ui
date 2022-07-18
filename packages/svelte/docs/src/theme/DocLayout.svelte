<script lang="ts">
  import { page } from '$app/stores'
  import PageSwitcher from './PageSwitcher.svelte'

  import EditOnGithub from './EditOnGithub.svelte'

  export let pages: {
    to: string
    label: string
  }[] = []

  // current page in sidebar index
  $: currentPageIndex = pages.findIndex(item =>
    item.to.includes($page.routeId || '*#%@')
  )

  // previous page info
  $: previousPage = currentPageIndex < 1 ? null : pages[currentPageIndex - 1]

  // next page info
  $: nextPage =
    currentPageIndex >= pages.length - 1 ? null : pages[currentPageIndex + 1]
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
    <slot name="left" />
  </aside>
  <div w-240 pb-8>
    <slot />
    <EditOnGithub />
    <div border-t border-e9e9e9 mt-4 mb-8 />
    <div flex justify-between gap-16>
      <div flex-grow>
        {#if previousPage}
          <PageSwitcher
            title="Previous page"
            page={previousPage.label}
            link={previousPage.to}
          />
        {/if}
      </div>
      <div flex-grow>
        {#if nextPage}
          <PageSwitcher
            text-right
            title="Next page"
            direction="right"
            page={nextPage.label}
            link={nextPage.to}
          />
        {/if}
      </div>
    </div>
  </div>
  <aside class="right" box-border fixed top-26 z-3>
    <slot name="right" />
  </aside>
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
