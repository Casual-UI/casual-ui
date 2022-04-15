<script setup lang="ts">
import type { CSize } from 'casual-types'
import { useVModel, CCheckbox } from 'casual-ui-vue'
import { computed, toRefs } from 'vue'
import useFormProps from './useFormProps'
import useValidator from './useValidator'
type CCheckboxModel = boolean | string | number

interface CCheckboxGroupProps {
  /**
   * 选项数组
   */
  options?: Array<{ label: string; value: CCheckboxModel }>
  /**
   * 当前选中值数组，用于<code>v-model</code>绑定
   */
  modelValue: CCheckboxModel[]
  /**
   * 尺寸
   * @default 'md'
   */
  size?: CSize
  /**
   * 勾选框间距尺寸
   * @default 'md'
   */
  gutterSize?: CSize
}

const props = withDefaults(defineProps<CCheckboxGroupProps>(), {
  options: () => [],
  size: undefined,
  gutterSize: undefined,
})

const emit = defineEmits<{
  /**
   * 绑定值变化时触发
   */
  (e: 'update:modelValue', newValue: CCheckboxModel[]): void
}>()

const { modelValue } = toRefs(props)

const { innerValue } = useVModel<CCheckboxModel[]>(
  modelValue,
  modelValue.value,
  newValue => {
    emit('update:modelValue', newValue)
  }
)

const optionsWithCheckStatus = computed(() =>
  props.options.map(op => ({
    ...op,
    value: op.value as string,
    checked: innerValue.value.some(v => v === op.value),
  }))
)
const { validate } = useValidator()
const onCheckStatusChange = (val: CCheckboxModel) => {
  const idx = innerValue.value.findIndex(v => v === val)
  if (idx === -1) {
    innerValue.value.push(val)
  } else {
    innerValue.value.splice(idx, 1)
  }
  validate(innerValue.value)
}

const { gutterSize } = useFormProps(props)
</script>
<template>
  <div
    class="c-checkbox-group c-row c-items-center c-wrap"
    :class="[`c-gutter-${gutterSize}`]"
  >
    <div v-for="op in optionsWithCheckStatus" :key="op.value">
      <c-checkbox
        :label="op.label"
        :model-value="op.checked"
        @update:model-value="onCheckStatusChange(op.value)"
      />
    </div>
  </div>
</template>
