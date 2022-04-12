<script setup lang="ts">
import useFormProps from './useFormProps'
import CFormItem from './CFormItem.vue'
import type { Component } from 'vue'
/**
 * 验证规则函数，可以返回Promise做异步验证
 */
type CRule = (
  v: string | number
) => string | boolean | Promise<string | boolean>

/**
 * 表单项配置
 */
interface CFormItemConfig {
  component: 'input' | 'select' | 'checkbox' | 'radio' | 'date' | Component
  field: string
  label?: string
  rules?: CRule[]
}

interface CFormProps {
  /**
   * 表单项配置
   */
  items?: CFormItemConfig[]

  /**
   * 表单绑定值，用于<code>v-model</code>
   */
  modelValue: object
  /**
   * 表单项提示文案长度
   */
  labelWidth?: string
  /**
   * 每个表单项占用的列数
   */
  col?: number
}

const props = withDefaults(defineProps<CFormProps>(), {
  items: () => [],
  rules: () => ({}),
  labelWidth: '100px',
  col: 6,
})

const { size } = useFormProps(props)
</script>
<template>
  <div
    :class="['c-form', 'c-row', 'c-items-center', 'c-wrap', `c-gutter-${size}`]"
  >
    <c-form-item v-for="item in items" :key="item.field">
      <slot name>
        <Component :is="item.component" />
      </slot>
    </c-form-item>
  </div>
</template>
