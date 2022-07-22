<script lang="ts">
  import { CButton, CDialog } from 'casual-ui-svelte'

  let show = false

  let verticalAlign: any = 'start'
  let horizontalAlign: any = 'start'

  function openWithPosition(h: any, v: any) {
    horizontalAlign = h
    verticalAlign = v
    show = true
  }
</script>

<CDialog bind:show title="Hi, there!" {verticalAlign} {horizontalAlign}>
  some content
</CDialog>

<div grid grid-cols-3 gap-4>
  <CButton
    icon
    style="font-size: 28px;"
    on:click={() => openWithPosition('start', 'start')}
  >
    <div i-ph-arrow-circle-up-left />
  </CButton>
  <CButton
    icon
    style="font-size: 28px;"
    on:click={() => openWithPosition('center', 'start')}
  >
    <div i-ph-arrow-circle-up />
  </CButton>
  <CButton
    icon
    style="font-size: 28px;"
    on:click={() => openWithPosition('end', 'start')}
  >
    <div i-ph-arrow-circle-up-right />
  </CButton>
  <CButton
    icon
    style="font-size: 28px;"
    on:click={() => openWithPosition('start', 'center')}
  >
    <div i-ph-arrow-circle-left />
  </CButton>
  <CButton
    icon
    style="font-size: 28px;"
    on:click={() => openWithPosition('center', 'center')}
  >
    <div i-cil-center-focus />
  </CButton>
  <CButton
    icon
    style="font-size: 28px;"
    on:click={() => openWithPosition('end', 'center')}
  >
    <div i-ph-arrow-circle-right />
  </CButton>
  <CButton
    icon
    style="font-size: 28px;"
    on:click={() => openWithPosition('start', 'end')}
  >
    <div i-ph-arrow-circle-down-left />
  </CButton>
  <CButton
    icon
    style="font-size: 28px;"
    on:click={() => openWithPosition('center', 'end')}
  >
    <div i-ph-arrow-circle-down />
  </CButton>
  <CButton
    icon
    style="font-size: 28px;"
    on:click={() => openWithPosition('end', 'end')}
  >
    <div i-ph-arrow-circle-down-right />
  </CButton>
</div>
