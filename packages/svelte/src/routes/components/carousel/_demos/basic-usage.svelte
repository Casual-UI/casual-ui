<script lang="ts">
  import { CCarousel, CCarouselSlider } from 'casual-ui-svelte'

  let activeIndex = 0
</script>

<CCarousel bind:activeIndex>
  <CCarouselSlider>
    <div i-openmoji-red-apple text-10 />
    Do you want some apples?
  </CCarouselSlider>
  <CCarouselSlider>
    <div i-openmoji-banana text-10 />
    Would you like some bananas?
  </CCarouselSlider>
  <CCarouselSlider>
    <div i-openmoji-grapes text-10 />
    How about some grapes?
  </CCarouselSlider>
</CCarousel>
