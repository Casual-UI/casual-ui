<script setup lang="ts">
import { CSize } from 'casual-types'
import { useInjectSize } from 'casual-ui-vue'

interface CItemProps {
  /**
   * 文字
   */
  label?: string | number
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 是否表现为可点击交互
   */
  clickable?: boolean
  /**
   * 是否处于激活态
   */
  active?: boolean
}

const emit = defineEmits<{
  /**
   * clickable为true时，点击项目触发
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
    <!-- @slot 默认内容，会覆盖<code>label</code>属性 -->
    <slot>
      <span :class="[`c-h-${provideSize}`]">
        {{ label }}
      </span>
    </slot>
  </div>
</template>
