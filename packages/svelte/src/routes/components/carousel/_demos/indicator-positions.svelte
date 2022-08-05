<script lang="ts">
  import { CRadioGroup, CCarousel, CCarouselSlider } from 'casual-ui-svelte'

  let activeIndex = 0

  let indicatorsPositionHorizontal: 'start' | 'center' | 'end' = 'center'
  let indicatorsPositionVertical: 'start' | 'center' | 'end' = 'center'
  let indicatorsAlignDirection:
    | 'row'
    | 'row-reverse'
    | 'column'
    | 'column-reverse' = 'row'

  const positionOptions = [
    { label: 'start', value: 'start' },
    { label: 'center', value: 'center' },
    { label: 'end', value: 'end' },
  ]

  const alignOptions = [
    { label: 'row', value: 'row' },
    { label: 'row-reverse', value: 'row-reverse' },
    { label: 'column', value: 'column' },
    { label: 'column-reverse', value: 'column-reverse' },
  ]
</script>

<div>
  <b> indicatorsPositionHorizontal </b>
  <CRadioGroup
    bind:value={indicatorsPositionHorizontal}
    options={positionOptions}
  />
</div>

<div>
  <b> indicatorsPositionVertical </b>
  <CRadioGroup
    bind:value={indicatorsPositionVertical}
    options={positionOptions}
  />
</div>

<div>
  <b> indicatorsAlignDirection </b>
  <CRadioGroup bind:value={indicatorsAlignDirection} options={alignOptions} />
</div>

<hr />

<CCarousel
  bind:activeIndex
  {indicatorsPositionHorizontal}
  {indicatorsPositionVertical}
  {indicatorsAlignDirection}
>
  <CCarouselSlider>
    <div class="item">
      <div i-openmoji-red-apple class="icon" />
      Do you want some apples?
    </div>
  </CCarouselSlider>
  <CCarouselSlider>
    <div class="item">
      <div i-openmoji-banana class="icon" />
      Would you like some bananas?
    </div>
  </CCarouselSlider>
  <CCarouselSlider>
    <div class="item">
      <div i-openmoji-grapes class="icon" />
      How about some grapes?
    </div>
  </CCarouselSlider>
</CCarousel>

<style>
  .item {
    font-size: 32px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .item .icon {
    font-size: 100px;
  }
</style>
