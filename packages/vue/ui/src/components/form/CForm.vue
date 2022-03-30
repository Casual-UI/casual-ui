<script setup lang="ts">
interface CFormItemConfig {
  type: 'input' | 'select' | 'checkbox' | 'radio' | 'date' | 'datetime'
}

/**
 * 验证规则函数，可以返回Promise做异步验证
 */
type CRule = (
  v: string | number
) => string | boolean | Promise<string | boolean>

interface CFormProps {
  /**
   * 表单项配置
   */
  items?: CFormItemConfig[]
  /**
   * 表单验证规则
   */
  rules?: {
    [key: string]: CRule
  }
  /**
   * 表单绑定值，用于<code>v-model</code>
   */
  modelValue: object
}

withDefaults(defineProps<CFormProps>(), {
  items: () => [],
  rules: () => ({}),
})
</script>
<template>
  <div class="c-form">
    <!-- TODO: 待实现 -->
  </div>
</template>
