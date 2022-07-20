<script lang="ts">
  import CButton from '$lib/components/CButton.svelte'
  import CTooltip from '$lib/components/CTooltip.svelte'

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
