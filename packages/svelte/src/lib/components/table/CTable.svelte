<script>
  import bem from '$lib/utils/bem'

  import clsx from '$lib/utils/clsx'
  import { each } from 'svelte/internal'
  import CTd from './CTd.svelte'
  import CTh from './CTh.svelte'
  import CTr from './CTr.svelte'

  /**
   * Determine whether the table is striped or not.
   * @type {boolean}
   */
  let striped = false

  /**
   * The columns config array.
   * @type {Array<{ field: string; width?: string; title?: string | import('svelte').SvelteComponentTyped; cell?: import('svelte').ComponentType }>}
   */
  let columns = []

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
          <CTh>
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
            <CTd>
              {#if col.cell}
                <svelte:component
                  this={col.cell}
                  colData={col}
                  rowData={row}
                  rowIdx={i}
                />
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
