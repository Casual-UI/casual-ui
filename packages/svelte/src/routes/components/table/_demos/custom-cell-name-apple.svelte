<script lang="ts">
  export let row: {
    name: string
    description: string
  } = {
    name: '',
    description: '',
  }

  export let col: any = undefined

  export let rowIndex: number = 0
</script>

<div>
  col: {JSON.stringify(col)}
</div>
<div text-10 flex items-center>
  <div mr-4>
    {rowIndex + 1}
  </div>
  {#if row?.name === 'Apple'}
    <div i-openmoji-red-apple />
  {:else if row?.name === 'Banana'}
    <div i-openmoji-banana />
  {:else}
    <div i-openmoji-grapes />
  {/if}
</div>
