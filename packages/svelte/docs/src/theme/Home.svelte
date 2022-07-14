<script lang="ts">
  import { goto } from '$app/navigation'
  import { CButton } from 'casual-ui-svelte'
  import { attributeAtom } from 'casual-utils'
  import casualConfig from './casual.config'
</script>

<div w-288 mx-auto flex flex-col items-center>
  <div flex justify-between items-center w-full>
    <div>
      <div text-12 class="title" leading-24 inline-block relative>
        Casual UI - Svelte
        <div
          absolute
          top-0
          right-0
          bg-primary
          leading-6
          text-3
          px-2
          rounded-1
          text-white
          translate-x-20
        >
          In progressing
        </div>
      </div>
      <div text-6 leading-12 text-t2>A UI components supports for Svelte3</div>
      <div flex gap-4 mt-12>
        <CButton
          label="Guide"
          round
          hover:shadow-md
          on:click={() => goto('/guide')}
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
    <div p-4 relative>
      <div absolute z-2 top-0 left-0 h-full w-full class="logo-bg" />
      <img relative z-3 w-80 src="/logo.svg" alt="" />
    </div>
  </div>
  <div grid grid-cols-3 w-full gap-4>
    {#each casualConfig.features as { label, desc }, i}
      <div
        bg-white
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
        <div mt-2>
          {label}
        </div>
        <div text-t2 fs-14>
          {desc}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .logo-bg {
    background: linear-gradient(
      45deg,
      rgb(108, 255, 250) 50%,
      rgb(233, 124, 255) 50%
    );
    filter: saturate(60%) blur(80px);
  }
  .title {
    background: linear-gradient(45deg, #bd34fe 30%, #41d1ff);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }
</style>
