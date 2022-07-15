<script lang="ts">
  import type { CTheme } from 'casual-types'
  import { attributeAtom } from '$theme/utils/attributeAtom'

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
    'text-primary': type === 'primary',
    'bg-secondary': type === 'secondary',
    'border-secondary': type === 'secondary',
    'text-secondary': type === 'secondary',
    'bg-warning': type === 'warning',
    'border-warning': type === 'warning',
    'text-warning': type === 'warning',
    'bg-negative': type === 'negative',
    'border-negative': type === 'negative',
    'text-negative': type === 'negative',
  })}
  pt-4
  pb-2
  pl-4
  fs-14
>
  <div font-bold>
    <slot name="title">
      {title}
    </slot>
  </div>
  <p text-t-1>
    <slot />
  </p>
</div>
