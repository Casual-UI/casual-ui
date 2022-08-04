<script>
  import bem from '$lib/utils/bem'
  import CTd from './CTd.svelte'
  import CTh from './CTh.svelte'
  import CTr from './CTr.svelte'

  /**
   * Determine whether the table is striped or not.
   * @type {boolean}
   */
  export let striped = false

  /**
   * The columns config array.
   * @type {Array<{ field: string; width?: string; title?: string | import('svelte').ComponentType; cell?: import('svelte').ComponentType }>}
   */
  export let columns = []

  /**
   * The table data.
   * @type {Array<any>}
   */
  export let data = []
</script>

<div
  class={bem('table', {
    striped,
  })}
>
  <table class="c-table--table">
    <colgroup>
      {#each columns as col}
        <col />
      {/each}
    </colgroup>
    <thead>
      <CTr>
        {#each columns as col}
          <CTh width={col.width}>
            {#if typeof col.title === 'string'}
              {col.title}
            {:else}
              <svelte:component this={col.title} {col} />
            {/if}
          </CTh>
        {/each}
      </CTr>
    </thead>
    <tbody>
      {#each data as row, i}
        <CTr>
          {#each columns as col}
            <CTd width={col.width}>
              {#if col.cell}
                <svelte:component this={col.cell} {col} {row} rowIndex={i} />
              {:else}
                {row[col.field]}
              {/if}
            </CTd>
          {/each}
        </CTr>
      {/each}
    </tbody>
  </table>
</div>
