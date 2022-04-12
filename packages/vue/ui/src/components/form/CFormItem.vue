<script lang="ts" setup>
interface CFormItemProps {
  label?: string
  labelWidth?: string
  selfCol?: number
}

const props = withDefaults(defineProps<CFormItemProps>(), {
  label: '',
  labelWidth: undefined,
  selfCol: undefined,
})
</script>
<template>
  <div class="c-form-item">
    <!-- @slot 默认内容 -->
    <slot />
  </div>
</template>
