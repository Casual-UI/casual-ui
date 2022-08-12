<script lang="ts">
  import { CCarousel, CCarouselSlider, CRadioGroup } from 'casual-ui-svelte'

  let activeIndex = 0
  let theme: 'primary' | 'secondary' | 'warning' | 'negative' = 'primary'
  const themeOptions = [
    {
      label: 'primary',
      value: 'primary',
    },
    {
      label: 'secondary',
      value: 'secondary',
    },
    {
      label: 'warning',
      value: 'warning',
    },
    {
      label: 'negative',
      value: 'negative',
    },
  ]
</script>

<CRadioGroup bind:value={theme} options={themeOptions} />

<hr />

<CCarousel bind:activeIndex {theme} interval={3000} infinity>
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
