<script setup lang="ts">
import type { CSize } from 'casual-types'
import { useInjectSize, useDefaultVModel } from 'casual-ui-vue'

type CRadioModel = boolean | string | number

interface CRadioProps {
  /**
   * 当前值，用于<code>v-model</code>绑定用
   */
  modelValue: CRadioModel
  /**
   * 选中时的值
   */
  value?: CRadioModel
  /**
   * 文字
   */
  label?: string | number
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 是否禁用
   */
  disabled?: boolean
}

const props = withDefaults(defineProps<CRadioProps>(), {
  label: '',
  size: undefined,
  disabled: false,
  value: true,
})

const emit = defineEmits<{
  /**
   * 值发生变化时触发
   * @arg {any} newValue - 新的绑定值，值的类型取决于<code>props.value</code>属性
   */
  (e: 'update:modelValue', newModelValue: CRadioModel): void
}>()

const { provideSize } = useInjectSize(props)

const innerValue = useDefaultVModel(props, emit)

const onClick = () => {
  if (props.disabled) return
  if (props.value === innerValue.value) {
    return
  }
  innerValue.value = props.value
}
</script>
<template>
  <div
    :class="[
      'c-radio',
      `c-font-${provideSize}`,
      `c-h-${provideSize}`,
      `c-radio--size-${provideSize}`,
      { 'c-radio--selected': innerValue === value },
      { 'c-radio--disabled': disabled },
    ]"
    @click="onClick"
  >
    <svg
      class="c-radio--circle-wrapper"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path
        d="M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"
      ></path>
      <path
        class="c-radio--inner-circle"
        d="M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
      ></path>
    </svg>
    <div class="c-radio--label">
      {{ label }}
    </div>
  </div>
</template>
