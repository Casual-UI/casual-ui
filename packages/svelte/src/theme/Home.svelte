<script lang="ts">
  import { goto } from '$app/navigation'
  import { CButton } from '$lib'
  import { attributeAtom } from '$theme/utils/attributeAtom'
  import AnimationLogo from './AnimationLogo.svelte'
  import casualConfig from './casual.config'
</script>

<div max-w-288 class="2xl-max-w-350" mx-auto flex flex-col items-center>
  <div
    md:flex-row
    flex-col-reverse
    flex
    justify-between
    items-center
    w-full
    px-8
    box-border
  >
    <div flex flex-col items-center md:items-start>
      <div
        text-8
        md:text-12
        class="title"
        leading-12
        inline-block
        relative
        md:pt-8
      >
        Casual UI - Svelte
        <div
          absolute
          bg-primary
          leading-6
          text-3
          px-2
          rounded-1
          text-white
          md:right-0
          top--6
          md:top-0
          md:translate-x-0
          class="right-1/2 translate-x-1/2"
        >
          In progress
        </div>
      </div>
      <div text-4 md:text-6 leading-12 text-t2 dark:text-eeeeee>
        A UI components lib supports for Svelte3
      </div>
      <div flex gap-4 mt-4 md:mt-12>
        <CButton
          label="Guide"
          round
          hover:shadow-md
          on:click={() => goto('/guide/1-install/')}
        />
        <CButton
          label="Components"
          round
          outlined
          hover:shadow-md
          on:click={() => goto('/components/button/')}
        />
      </div>
    </div>
    <div md:p-4 relative>
      <AnimationLogo />
    </div>
  </div>
  <div
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    class="2xl:grid-cols-4"
    w-full
    gap-4
    px-8
    box-border
    mt-8
    md:mt-0
  >
    {#each casualConfig.features as { label, desc }, i}
      <div
        bg-white
        dark:bg-111111
        rounded-4
        hover:shadow-md
        transition
        transition-shadow
        p-4
        leading-8
      >
        <!-- NOTICE: support for maximum 6 features -->
        <div
          p-4
          box-border
          bg-e5e5e5
          dark:bg-252525
          text-12
          rounded-2
          {...attributeAtom({
            'i-openmoji-red-apple': i === 0,
            'i-openmoji-banana': i === 1,
            'i-openmoji-grapes': i === 2,
            'i-openmoji-peach': i === 3,
            'i-openmoji-strawberry': i === 4,
            'i-openmoji-pear': i === 5,
          })}
        />
        <div mt-2 dark:text-dedede>
          {label}
        </div>
        <div text-t2 fs-14 dark:text-666666>
          {desc}
        </div>
      </div>
    {/each}
  </div>

  <div w-full pt-8 mt-16 text-center border-t border-e9e9e9 dark:border-333333>
    <div flex items-center justify-center mb-8 text-6 dark:text-9c9c9c>
      <div i-twemoji-red-heart mr-2 />
      Thanks
    </div>
    <div grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 px-8>
      <img src="/badges/react.svg" alt="" />
      <img src="/badges/vue.svg" alt="" />
      <img src="/badges/docusaurus.svg" alt="" />
      <img src="/badges/quasar.svg" alt="" />
      <img src="/badges/sass.svg" alt="" />
      <img src="/badges/typescript.svg" alt="" />
      <img src="/badges/vite.svg" alt="" />
      <img src="/badges/eslint.svg" alt="" />
      <img src="/badges/javascript.svg" alt="" />
      <img src="/badges/pnpm.svg" alt="" />
      <img src="/badges/stylelint.svg" alt="" />
      <img src="/badges/vuepress.svg" alt="" />
      <img src="/badges/svelte.svg" alt="" />
      <img src="/badges/vscode.svg" alt="" />
    </div>
  </div>
</div>

<style>
  .title {
    background: linear-gradient(45deg, #bd34fe 30%, #41d1ff);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }
</style>
