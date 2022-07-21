<slot name="header" />
<div flex-col flex text-t1 pt-18 style="min-height: calc(100vh - 4.5rem);">
  <div flex-grow>
    <slot />
  </div>

  <slot name="footer">
    <footer text-t-3 text-3 text-center h-8 leading-8>
      Copyright © 2021 - {new Date().getFullYear()} Casual UI
    </footer>
  </slot>
</div>
