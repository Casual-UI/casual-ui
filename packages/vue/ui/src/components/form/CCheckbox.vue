<script setup lang="ts">
import type { CTheme, CSize } from 'casual-types'
import { useDefaultVModel, useInjectSize, useInjectTheme } from 'casual-ui-vue'

type CCheckboxModel = boolean | string | number
interface CCheckboxProps {
  /**
   * 是否处于勾选状态，用于<code>v-model</code>绑定用
   */
  modelValue: CCheckboxModel
  /**
   * 主题
   */
  theme?: CTheme
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 文字
   */
  label?: string
  /**
   * 选中时的值
   */
  checkedValue?: CCheckboxModel
  /**
   * 是否禁用
   */
  disabled?: boolean
}

const props = withDefaults(defineProps<CCheckboxProps>(), {
  theme: undefined,
  size: undefined,
  label: '',
  checkedValue: true,
  disabled: false,
})

const { provideTheme: theme } = useInjectTheme(props)
const { provideSize: size } = useInjectSize(props)

const emit = defineEmits<{
  /**
   * 绑定值发生改变时触发
   * @arg {any} newValue - 新的绑定值，值的类型取决于<code>props.checkedValue</code>属性
   */
  (e: 'update:modelValue', newValue: CCheckboxModel): void
}>()

const innerValue = useDefaultVModel(props, emit)

const onClick = () => {
  if (props.disabled) return
  innerValue.value =
    innerValue.value === props.checkedValue ? false : props.checkedValue
}
</script>
<template>
  <div
    :class="[
      'c-checkbox',
      `c-checkbox--theme-${theme}`,
      `c-h-${size}`,
      `c-font-${size}`,
      {
        'c-checkbox--checked': checkedValue === innerValue,
      },
      {
        'c-checkbox--disabled': disabled,
      },
    ]"
    @click="onClick"
  >
    <svg
      class="c-checkbox--check-wrapper"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        class="c-checkbox--checker"
        fill="none"
        d="M1.73,12.91 8.1,19.28 22.79,4.59"
      ></path>
      // TODO: 半选态
      <!-- <path d="M4,14H20V10H4"></path> -->
    </svg>
    <div class="c-checkbox--label">{{ label }}</div>
  </div>
</template>
