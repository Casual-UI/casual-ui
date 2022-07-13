<div flex w-320 justify-center mx-auto>
  <div
    flex-grow
    flex
    flex-col
    h-screen
    w-screen
    box-border
    text-t1
    relative
    pt-18
    font-mono
  >
    <slot name="header" />

    <div flex flex-grow pb-8 w-full>
      <slot />
    </div>

    <slot name="footer">
      <footer text-t-3 text-3 text-center sticky bottom-0 h-8 leading-8>
        Copyright © 2021 - {new Date().getFullYear()} Casual UI
      </footer>
    </slot>
  </div>
</div>
