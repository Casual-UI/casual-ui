<script setup lang="ts">
import type { CSize } from 'casual-types'
import { useInjectSize, useDefaultVModel } from 'casual-ui-vue'

interface CToggleProps {
  /**
   * The label text.
   * @zh 文案
   */
  label?: string
  /**
   * The size of toggle.
   * @zh 尺寸
   */
  size?: CSize
  /**
   * Current value. Can be used with <code>v-model</code>.
   * 绑定值，用于<code>v-model</code>绑定用
   */
  modelValue: any
  /**
   * The value used for toggle on.
   * @zh 选中时的值
   */
  checkValue?: any
  /**
   * The value used for toggle off.
   * @zh 未选中时的值
   */
  uncheckValue?: any
  /**
   * Determine whether the toggle is disabled or not.
   * @zh 是否禁用
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
   * Emit when the toggle binding value changed.
   * @zh 绑定值变更时触发
   * @arg {any} newValue - new value
   * @arg {any} newValue_zh - 新的绑定值
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
