<script lang="ts">
  import type { CTheme } from 'casual-types'
  import { attributeAtom } from 'casual-utils'

  export let type: CTheme = 'secondary'
  export let title = 'Tip'
</script>

<div
  bg-opacity-10
  border-l-6
  rounded-l-2
  box-border
  {...attributeAtom({
    'bg-primary': type === 'primary',
    'border-primary': type === 'primary',
    'bg-secondary': type === 'secondary',
    'border-secondary': type === 'secondary',
    'bg-warning': type === 'warning',
    'border-warning': type === 'warning',
    'bg-negative': type === 'negative',
    'border-negative': type === 'negative',
  })}
  pt-4
  pb-2
  pl-4
  fs-14
>
  <div font-bold text-t-1>
    {title}
  </div>
  <p>
    <slot />
  </p>
</div>
