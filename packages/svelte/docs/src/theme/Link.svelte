<script lang="ts">
  import { attributeAtom } from 'casual-utils'

  export let label = ''
  export let to = '/'
</script>

<a
  {...attributeAtom($$restProps)}
  hover="opacity-60"
  href={to}
  active:text-primary
>
  <slot>{label}</slot></a
>
