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
  import EditOnGithub from './_components/EditOnGithub.svelte'
  import PageSwitcher from './_components/PageSwitcher.svelte'
  import { page, session } from '$app/stores'
  import SlugNav from '$theme/SlugNav.svelte'
  import ComponentApi from './_components/ComponentAPI.svelte'
  import Doc from '$theme/Doc.svelte'

  export let sidebar: {
    to: string
    label: string
  }[]

  // current page in sidebar index
  $: currentPageIndex = sidebar.findIndex(item =>
    item.to.includes($page.routeId || '*#%@')
  )

  // previous page info
  $: previousPage = currentPageIndex < 1 ? null : sidebar[currentPageIndex - 1]

  // next page info
  $: nextPage =
    currentPageIndex >= sidebar.length - 1
      ? null
      : sidebar[currentPageIndex + 1]

  $: sessionData = $session as any
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
  <div w-240 pb-8>
    <slot />
    {#if sessionData.demos}
      {#each sessionData.demos as { title, name, comp }}
        <Doc
          {title}
          code={sessionData.demosCodeHTML[name]}
          component={comp}
          id={name}
        />
      {/each}
    {/if}

    {#if sessionData.componentAPI}
      <ComponentApi api={sessionData.componentAPI} />
    {/if}

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
    {#if sessionData.demos && sessionData.demosCodeHTML}
      <SlugNav />
    {/if}
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
