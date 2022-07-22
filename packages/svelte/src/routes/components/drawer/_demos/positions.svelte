<script lang="ts">
  import { CDrawer, CButton } from 'casual-ui-svelte'

  type Position = 'left' | 'top' | 'right' | 'bottom'

  let show = false

  let position: Position = 'left'

  function openWithPosition(pos: Position) {
    position = pos
    show = true
  }
</script>

<div grid grid-cols-4>
  <div>
    <CButton
      style="font-size: 28px"
      icon
      on:click={() => openWithPosition('left')}
    >
      <div i-ic-twotone-arrow-circle-left />
    </CButton>
  </div>
  <div>
    <CButton
      style="font-size: 28px"
      icon
      on:click={() => openWithPosition('top')}
    >
      <div i-ic-twotone-arrow-circle-up />
    </CButton>
  </div>
  <div>
    <CButton
      style="font-size: 28px"
      icon
      on:click={() => openWithPosition('right')}
    >
      <div i-ic-twotone-arrow-circle-right />
    </CButton>
  </div>
  <div>
    <CButton
      style="font-size: 28px"
      icon
      on:click={() => openWithPosition('bottom')}
    >
      <div i-ic-twotone-arrow-circle-down />
    </CButton>
  </div>
</div>

<CDrawer bind:show {position} title="Hi, there!">Some drawer content</CDrawer>
