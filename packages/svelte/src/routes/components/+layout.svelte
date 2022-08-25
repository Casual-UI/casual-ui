<script lang="ts">
  throw new Error(
    '@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)'
  )

  import Sidebar from '$theme/Sidebar.svelte'
  import { page } from '$app/stores'
  import SlugNav from '$theme/SlugNav.svelte'
  import ComponentApi from '$theme/ComponentAPI.svelte'
  import Doc from '$theme/Doc.svelte'
  import DocLayout from '$theme/DocLayout.svelte'
  import Attention from '$theme/Attention.svelte'
  import Link from '$theme/Link.svelte'

  export let data: {
    sidebar: {
      to: string
      label: string
    }[]
    demos: any
    componentAPI: any
  }

  let slugNav: SlugNav
</script>

<DocLayout pages={data.sidebar}>
  <Sidebar slot="left" links={data.sidebar} />
  <svelte:fragment>
    <Attention mb-8 type="primary" title="Before you read">
      It is worth mentioning that all demos in this documentation using
      <Link
        text-primary
        label="UnoCSS"
        to="https://github.com/unocss/unocss"
        external
      /> for demos' styles.

      <br />
      And
      <Link
        text-primary
        external
        to="https://github.com/unocss/unocss/tree/main/packages/preset-icons/"
        label="UnoCSS preset-icons"
      /> for icons used in demos.
      <br />
      It is recommended to read the relative docs before you start.
    </Attention>
    <slot />
    <h3>
      Demos
      <!-- TODO: 渲染解析后的示例内容 -->
    </h3>

    {#if data.componentAPI}
      <ComponentApi api={data.componentAPI} />
    {/if}
  </svelte:fragment>
  <SlugNav bind:this={slugNav} demos={data.demos} slot="right" />
</DocLayout>
