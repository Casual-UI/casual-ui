<script lang="ts">
  import { CButton, CTooltip } from 'casual-ui-svelte'

  const positions: any = [
    'top-left',
    'top',
    'top-right',
    'left-top',
    'left',
    'left-bottom',
    'right-top',
    'right',
    'right-bottom',
    'bottom-left',
    'bottom',
    'bottom-right',
  ]
</script>

<div grid grid-cols-3 gap-4>
  {#each positions as pos}
    <div>
      <CTooltip position={pos} content={`Hi, I'm some message from ${pos}!`}>
        <CButton label={pos} slot="trigger" />
      </CTooltip>
    </div>
  {/each}
</div>
