import type { CSize, CTheme } from 'casual-types'
import { computed } from 'vue'
import type { Ref } from 'vue'

export default ({
  size,
  theme,
  prefix,
}: {
  size: Ref<CSize>
  theme: Ref<CTheme>
  prefix: string
}) => {
  return computed(() => [
    prefix,
    `${prefix}--theme-${theme.value || 'primary'}`,
    `${prefix}--size-${size.value || 'md'}`,
  ])
}
