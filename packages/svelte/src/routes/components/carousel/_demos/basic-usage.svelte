<script lang="ts">
  import { CCarousel, CCarouselSlider } from 'casual-ui-svelte'

  let activeName = 'apple'
</script>

<CCarousel bind:activeName>
  <CCarouselSlider name="apple">
    <div i-openmoji-red-apple text-10 />
    Do you want some apples?
  </CCarouselSlider>
  <CCarouselSlider name="banana">
    <div i-openmoji-banana text-10 />
    Would you like some bananas?
  </CCarouselSlider>
  <CCarouselSlider name="grapes">
    <div i-openmoji-grapes text-10 />
    How about some grapes?
  </CCarouselSlider>
</CCarousel>
