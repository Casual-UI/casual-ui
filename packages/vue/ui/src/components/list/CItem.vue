<script
  setup
  lang="ts"
>
import type { CSize } from 'casual-types'
import { useInjectSize } from 'casual-ui-vue'

interface CItemProps {
  /**
   * The label text of item.
   * @zh 文字
   */
  label?: string | number
  /**
   * The size of item.
   * @zh 尺寸
   */
  size?: CSize
  /**
   * Determine whether the item is clickable or not.
   * @zh 是否表现为可点击交互
   */
  clickable?: boolean
  /**
   * Determine whether the item is in active status or not.
   * @zh 是否处于激活态
   */
  active?: boolean
}

const emit = defineEmits<{
  /**
   * Emit when the item is clicked. Only working when the clickable is true.
   * @zh 当clickable为true时，点击项目触发
   */
  (e: 'click'): void
}>()

const props = withDefaults(defineProps<CItemProps>(), {
  label: '',
  size: undefined,
  clickable: false,
  active: false,
})

const { provideSize } = useInjectSize(props)

const onClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>
<template>
  <div
    :class="[
      'c-item',
      { 'c-item--clickable': clickable },
      { 'c-item--active': active },
      `c-font-${provideSize}`,
      `c-pa-${provideSize}`,
    ]"
    @click.stop="onClick"
  >
    <!-- 
      @slot The content of item.
      @zh 默认内容，会覆盖<code>label</code>属性 -->
    <slot>
      <span :class="[`c-h-${provideSize}`]">
        {{ label }}
      </span>
    </slot>
  </div>
</template>
