<script lang="ts">
export const hasErrorKey = Symbol('hasError')
export const validateKey = Symbol('validate')
export const clearValidateKey = Symbol('clearValidate')
</script>
<script lang="ts" setup>
import type { CSize, CRule } from 'casual-types'
import { computed, inject, provide, ref } from 'vue'
import type { Ref } from 'vue'
import useFormProps, { type LabelDirection } from './useFormProps'
import { errorKey } from './CForm.vue'

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
   * 提示文字与表单项排列方向，可覆盖表单整体的label-direction属性
   * @default 'row'
   */
  labelDirection?: LabelDirection
  /**
   * 文字对齐方式，表现为text-align的对应值，可覆盖表单整体的label-align属性
   * @default 'left'
   */
  labelAlign?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<CFormItemProps>(), {
  label: '',
  labelWidth: undefined,
  col: undefined,
  size: undefined,
  rules: () => [],
  field: undefined,
  labelDirection: undefined,
  labelAlign: undefined,
})

const { col, labelDirection, size, labelWidth, labelAlign } =
  useFormProps(props)

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

const errorStatus = inject<
  Ref<{
    [key: string]: {
      error: boolean
      message: string
    }
  }>
>(errorKey, ref({}))

const hasError = computed(() => {
  if (!errorStatus.value) return false
  const errorObj = errorStatus.value[props.field]
  if (!errorObj) return false
  if (errorObj.error) return errorObj.message
  return false
})

provide(hasErrorKey, hasError)

const validate = async (v: any) => {
  if (!props.rules) return
  const errorObj = errorStatus.value[props.field]
  if (!errorObj) return
  errorObj.error = false
  errorObj.message = ''
  for (const rule of props.rules) {
    const result = await rule(v)
    if (result) {
      errorObj.error = true
      errorObj.message = result
      break
    }
  }
}

const clearValidate = () => {
  if (!errorStatus.value) return
  const errorObj = errorStatus.value[props.field]
  if (!errorObj) return
  errorObj.error = false
  errorObj.message = ''
}

provide(validateKey, validate)

provide(clearValidateKey, clearValidate)
</script>
<template>
  <div
    :class="[
      'c-form-item',
      `c-col-${col}`,
      `c-${labelDirection}`,
      isLabelVertical(labelDirection) ? 'c-items-start' : 'c-items-center',
      { 'c-form-item--has-error': hasError },
    ]"
  >
    <div
      :class="[
        'c-form-item--label',
        `c-font-${size}`,
        `c-m${getLabelMarginPosition(labelDirection)}-${size}`,
        `c-text-${labelAlign}`,
      ]"
      :style="{
        width: labelWidth,
      }"
    >
      {{ label }}
    </div>
    <div class="c-form-item--content-wrapper">
      <!-- 
        @slot 表单项内容 
      -->
      <slot />
      <Transition name="c-form-item--error-tip">
        <div v-if="hasError" class="c-form-item--error-tip">{{ hasError }}</div>
      </Transition>
    </div>
  </div>
</template>
