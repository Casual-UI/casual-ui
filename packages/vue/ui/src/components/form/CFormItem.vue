<script lang="ts" setup>
import type { CSize } from 'casual-types'

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
}

const props = withDefaults(defineProps<CFormItemProps>(), {
  label: '',
  labelWidth: undefined,
  col: undefined,
  size: undefined,
})
</script>
<template>
  <div class="c-form-item">
    <!-- @slot 默认内容 -->
    <slot />
  </div>
</template>
