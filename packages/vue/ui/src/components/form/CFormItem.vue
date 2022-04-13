<script lang="ts" setup>
import type { CSize, CRule } from 'casual-types'
import useFormProps, { type LabelDirection } from './useFormProps'

interface CFormItemProps {
  /**
   * 文本提示
   */
  label?: string
  /**
   * 文本提示宽度
   */
  labelWidth?: string
  /**
   * 表单项占用的列数，可覆盖CForm的col属性
   */
  col?: number
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 验证规则
   */
  rules?: CRule[]
  labelDirection?: LabelDirection
}

const props = withDefaults(defineProps<CFormItemProps>(), {
  label: '',
  labelWidth: undefined,
  col: undefined,
  size: undefined,
  rules: () => [],
  field: undefined,
  labelDirection: undefined,
})

const { col, labelDirection, size } = useFormProps(props)
</script>
<template>
  <div
    :class="[
      'c-form-item',
      `c-col-${col}`,
      `c-${labelDirection}`,
      'c-items-center',
    ]"
  >
    <!-- 
      @slot 表单项内容 
    -->
    <div :class="['c-form-item--label', `c-font-${size}`, `c-mr-${size}`]">
      {{ label }}
    </div>
    <slot />
  </div>
</template>
