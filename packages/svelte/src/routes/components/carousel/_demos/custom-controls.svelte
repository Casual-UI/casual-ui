<script lang="ts">
  import { CButton, CCarousel, CCarouselSlider } from 'casual-ui-svelte'

  let activeIndex = 0
</script>

<CCarousel bind:activeIndex infinity>
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
  <CButton slot="control-prev" icon flat theme="secondary">
    <div i-mdi-page-previous-outline />
  </CButton>
  <CButton slot="control-next" icon flat theme="secondary">
    <div i-mdi-page-next-outline />
  </CButton>
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
