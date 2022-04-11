<script setup lang="ts">
import type { CSize } from 'casual-types'
import { useInjectSize, useDefaultVModel } from 'casual-ui-vue'

interface CToggleProps {
  /**
   * 文案
   */
  label?: string
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 绑定值，用于<code>v-model</code>绑定用
   */
  modelValue: any
  /**
   * 选中时的值
   */
  checkValue?: any
  /**
   * 未选中时的值
   */
  uncheckValue?: any
  /**
   * 是否禁用
   */
  disabled?: boolean
}

const props = withDefaults(defineProps<CToggleProps>(), {
  label: '',
  size: undefined,
  checkValue: true,
  uncheckValue: false,
  disabled: false,
})

const emit = defineEmits<{
  /**
   * 绑定值变更时触发
   * @arg {any} newValue - 新的绑定值，值的类型取决于<code>props.checkValue</code>属性
   */
  (e: 'update:modelValue', newValue: any): void
}>()

const innerValue = useDefaultVModel(props, emit)

const { provideSize: size } = useInjectSize(props)

const toggle = () => {
  if (props.disabled) return
  if (innerValue.value === props.checkValue) {
    innerValue.value = props.uncheckValue
    return
  }
  innerValue.value = props.checkValue
}
</script>
<template>
  <div
    :class="[
      'c-toggle',
      `c-toggle--size-${size}`,
      `c-h-${size}`,
      `c-font-${size}`,
      { 'c-toggle--checked': innerValue === checkValue },
      { 'c-toggle--disabled': disabled },
    ]"
    @click="toggle"
  >
    <div class="c-toggle--track">
      <div class="c-toggle--dot"></div>
    </div>
    <div :class="['c-toggle--label']">
      {{ label }}
    </div>
  </div>
</template>
