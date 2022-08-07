<script lang="ts">
  import { page } from '$app/stores'
  import PageSwitcher from './PageSwitcher.svelte'

  import EditOnGithub from './EditOnGithub.svelte'

  export let pages: {
    to: string
    label: string
  }[] = []

  // current page in sidebar index
  $: currentPageIndex = pages?.findIndex(item =>
    item.to.includes($page.routeId || '*#%@')
  )

  // previous page info
  $: previousPage = currentPageIndex < 1 ? null : pages[currentPageIndex - 1]

  // next page info
  $: nextPage =
    currentPageIndex >= pages.length - 1 ? null : pages[currentPageIndex + 1]
</script>

<div pt-8 justify-center class="doc-layout">
  <aside
    fixed
    top-18
    style="height: calc(100vh - 4.5rem);"
    fs-14
    z-3
    class="left"
    justify-end
    bg-white
    dark:bg-262626
    display-none
    md:flex
  >
    <slot name="left" />
  </aside>
  <div max-w-120 lg:max-w-150 xl:max-w-200 pb-8 m-auto px-4 md:px-0>
    <slot />
    <EditOnGithub />
    <div border-t border-e9e9e9 dark:border-383838 mt-4 mb-8 />
    <div grid grid-cols-2 gap-4 md:gap-8 lg:gap-16>
      <div>
        {#if previousPage}
          <PageSwitcher
            title="Previous page"
            page={previousPage.label}
            link={previousPage.to}
          />
        {/if}
      </div>
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
  <aside class="right" box-border fixed top-26 z-3 display-none md:block>
    <slot name="right" />
  </aside>
</div>

<style>
  .left,
  .right {
    --content-width: 30rem;
  }
  .left {
    left: 0;
    right: calc(
      var(--content-width) + 2rem + (100vw - var(--content-width)) / 2
    );
  }
  .right {
    left: calc(
      var(--content-width) + 2rem + (100vw - var(--content-width)) / 2
    );
    right: 0;
  }
  @media (min-width: 1024px) {
    .left,
    .right {
      --content-width: 37.5rem;
    }
  }
  @media (min-width: 1280px) {
    .left,
    .right {
      --content-width: 50rem;
    }
  }
</style>
