<div flex pt-8 justify-center>
  <aside
    fixed
    top-18
    bottom-0
    fs-14
    box-border
    z-3
    class="left"
    flex
    justify-end
    pr-8
    pt-8
    bg-white
  >
    <slot name="left" />
  </aside>
  <div w-240 pb-8>
    <slot />
  </div>
  <aside class="right" box-border fixed top-26 z-3>
    <slot name="right" />
  </aside>
</div>

<style>
  .left {
    left: 0;
    right: calc(62rem + (100vw - 60rem) / 2);
  }
  .right {
    left: calc(62rem + (100vw - 60rem) / 2);
    right: 0;
  }
</style>
