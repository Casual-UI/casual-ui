<script lang="ts">
  import { attributeAtom } from '$utils/attributeAtom'
  let scrollY = 0

  const navbars = [
    {
      label: '指南',
      children: [
        {
          label: '安装',
          to: '/guide/install/',
        },
        {
          label: '主题定制',
          to: '/guide/theme-customize/',
        },
      ],
    },
  ]
</script>

<svelte:window bind:scrollY />

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
    <div flex items-center>
      <a href="/components"> 组件 </a>
    </div>
  </div>
</header>

<style>
  header {
    backdrop-filter: saturate(50%) blur(8px);
  }
</style>
