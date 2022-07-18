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
  import DocLayout from '$theme/DocLayout.svelte'

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

  $: demos = Array.isArray(sessionData.demos) ? sessionData.demos : []

  let computedTargetPositions: any

  function onDocExpandStatusChange() {
    computedTargetPositions?.()
  }
</script>

<DocLayout>
  <Sidebar slot="left" links={sidebar} />
  <svelte:fragment>
    <slot />
    {#if demos.length}
      {#each demos as { title, name, comp }}
        <Doc
          {title}
          component={comp}
          id={name}
          {...sessionData.demosCodeHTML[name]}
          on:ready={onDocExpandStatusChange}
          on:toggle={onDocExpandStatusChange}
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
  </svelte:fragment>
  <SlugNav bind:computedTargetPositions {demos} slot="right" />
</DocLayout>
