<script setup lang="ts">
import { useDefaultVModel, useValidator } from 'casual-ui-vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void
}>()

const innerValue = useDefaultVModel(props, emit)

const { validate, clearValidate, hasError } = useValidator()
</script>
<template>
  <div :class="['custom-input', { 'custom-input--has-error': hasError }]">
    <input
      v-model="innerValue"
      @focus="clearValidate"
      @blur="validate(innerValue)"
    />
  </div>
</template>
<style lang="scss" scoped>
.custom-input {
  input {
    outline: none;
    border: 1px solid var(--casual-copywriting-normal);
  }
  &--has-error {
    input {
      color: var(--casual-warning);
      border-color: var(--casual-warning);
    }
  }
}
</style>
