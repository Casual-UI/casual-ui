<script lang="ts">
  import { CButton, CPopup } from 'casual-ui-svelte'
  import { scale, fly } from 'svelte/transition'

  let show = false

  let verticalAlign: any = 'start'
  let horizontalAlign: any = 'start'

  function openWithPosition(h: any, v: any) {
    horizontalAlign = h
    verticalAlign = v
    show = true
  }
</script>

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

<CPopup {show} {verticalAlign} {horizontalAlign}>
  <div
    bg-white
    p-4
    rounded-2
    w-80
    in:fly={{
      x:
        horizontalAlign === 'start'
          ? -50
          : horizontalAlign === 'center'
          ? 0
          : 50,
      y: verticalAlign === 'start' ? -50 : verticalAlign === 'center' ? 0 : 50,
    }}
    out:fly={{
      x:
        horizontalAlign === 'start'
          ? -50
          : horizontalAlign === 'center'
          ? 0
          : 50,
      y: verticalAlign === 'start' ? -50 : verticalAlign === 'center' ? 0 : 50,
    }}
  >
    <div pb-4 border-b border-gray-3 flex justify-between items-center>
      <div font-bold>Some Title</div>
      <div
        i-material-symbols-close
        cursor-pointer
        hover:text-gray
        on:click={() => (show = false)}
      />
    </div>
    <div text-gray-6>
      <p>Some description</p>
    </div>
    <div flex justify-end>
      <CButton rounded label="A Button" />
    </div>
  </div>
</CPopup>
