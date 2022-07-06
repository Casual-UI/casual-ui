<script lang="ts">
  import { goto } from '$app/navigation'

  import { CButton } from 'casual-ui-svelte'
</script>

<div w-288 mx-auto flex flex-col items-center>
  <div flex justify-between items-center w-full>
    <div>
      <div text-12 class="title" leading-24 inline-block>
        Casual UI - Svelte
      </div>
      <div text-6 leading-12 text-t2>A UI components supports for Svelte3</div>
      <p />
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
          on:click={() => goto('/components')}
        />
      </div>
    </div>
    <div p-4 relative>
      <div absolute z-2 top-0 left-0 h-full w-full class="logo-bg" />
      <img relative z-3 w-80 src="/logo.svg" alt="" />
    </div>
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
