<script lang="ts">
  import { browser } from '$app/env'

  import { slide } from 'svelte/transition'
  import { dark } from './theme'

  if (browser) {
    const storeValue = window.localStorage.getItem(
      'CASUAL_SVELTE_DOC_DARK_MODE'
    ) as any
    if (storeValue) {
      $dark = storeValue
    }
    if (storeValue === 'on') {
      document.documentElement.classList.add('dark')
    }
  }

  const toggle = () => {
    $dark = $dark === 'off' ? 'on' : 'off'
    if ($dark === 'on') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    window.localStorage.setItem('CASUAL_SVELTE_DOC_DARK_MODE', $dark)
  }
</script>

<div text-6 cursor-pointer on:click={toggle} mx-2>
  {#if $dark === 'on'}
    <div transition:slide i-icon-park-solid-dark-mode />
  {:else}
    <div transition:slide i-line-md-sun-rising-loop />
  {/if}
</div>
