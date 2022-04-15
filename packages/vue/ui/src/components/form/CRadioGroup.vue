<script setup lang="ts">
import type { CSize } from 'casual-types'
import useFormProps from './useFormProps'
import useValidator from './useValidator'

interface CRadioGroups {
  /**
   * 当前值，用于<code>v-model</code>绑定用
   */
  modelValue: boolean | string | number
  /**
   * 选项数组
   */
  options: { value: string | number; label: string }[]
  /**
   * 尺寸
   * @default 'md'
   */
  size?: CSize
  /**
   * 选项间距
   * @default 'md'
   */
  gutterSize?: CSize
}

const props = withDefaults(defineProps<CRadioGroups>(), {
  size: undefined,
  gutterSize: undefined,
})

const emit = defineEmits<{
  /**
   * 当前值变化时触发
   * @param newValue 新值
   */
  (e: 'update:modelValue', newValue: string | number): void
}>()

const { gutterSize } = useFormProps(props)

const { validate } = useValidator()

const onUpdateModelValue = (newValue: string | number) => {
  emit('update:modelValue', newValue)
  validate(newValue)
}
</script>
<template>
  <div class="c-flex c-items-center c-wrap" :class="[`c-gutter-${gutterSize}`]">
    <div v-for="{ label, value } in options" :key="value">
      <c-radio
        :model-value="modelValue"
        :label="label"
        :value="value"
        @update:model-value="onUpdateModelValue"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
