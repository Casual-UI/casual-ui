<script lang="ts" setup>
import type { CSize, CRule } from 'casual-types'
import useFormProps, { type LabelDirection } from './useFormProps'

interface CFormItemProps {
  /**
   * 对应表单中的项的名称
   */
  field?: string
  /**
   * 文本提示
   */
  label?: string
  /**
   * 文本提示宽度
   * @default '100px'
   */
  labelWidth?: string
  /**
   * 表单项占用的列数，可覆盖表单整体的col属性，可用于为项定制列宽
   * @default 6
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
  /**
   * 提示文字排列方向
   * @default 'row'
   */
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

const { col, labelDirection, size, labelWidth } = useFormProps(props)

const isLabelVertical = (direction: LabelDirection) => {
  return direction === 'column' || direction === 'column-reverse'
}

const getLabelMarginPosition = (direction: LabelDirection) => {
  return new Map<LabelDirection, 't' | 'b' | 'l' | 'r'>([
    ['row', 'r'],
    ['row-reverse', 'l'],
    ['column', 'b'],
    ['column-reverse', 't'],
  ]).get(direction)
}
</script>
<template>
  <div
    :class="[
      'c-form-item',
      `c-col-${col}`,
      `c-${labelDirection}`,
      isLabelVertical(labelDirection) ? 'c-items-start' : 'c-items-center',
    ]"
  >
    <!-- 
      @slot 表单项内容 
    -->
    <div
      :class="[
        'c-form-item--label',
        `c-font-${size}`,
        `c-m${getLabelMarginPosition(labelDirection)}-${size}`,
      ]"
      :style="{
        width: labelWidth,
      }"
    >
      {{ label }}
    </div>
    <slot />
  </div>
</template>
