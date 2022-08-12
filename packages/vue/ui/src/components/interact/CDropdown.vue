<script
  setup
  lang="ts"
>
import { useClickOutside, useVModel } from 'casual-ui-vue'
import { toRefs, ref } from 'vue'

interface CDropdownProps {
  /**
   * The dropdown shown status. Can be use with <code>v-model</code>
   * @zh 下拉是否展示，用于<code>v-model</code>绑定用
   */
  modelValue: boolean
  /**
   * Determine whether the dropdown is disabled or not.
   * @zh 是否禁用
   */
  disabled?: boolean
  /**
   * Determine whether to keep the same width with parent or not.
   * @zh 是否自动与默认内容保持一致宽度
   */
  widthWithinParent?: boolean
  /**
   * Determine whether to use manual control or not.
   * @zh 是否手动控制
   */
  manual?: boolean
}

const props = withDefaults(defineProps<CDropdownProps>(), {
  disabled: false,
  widthWithinParent: true,
  manual: false,
})

const emit = defineEmits<{
  /**
   * Emit when the shown status change.
   * @zh 下拉状态变化时触发
   */
  (e: 'update:modelValue', newValue: boolean): void
}>()

const { modelValue } = toRefs(props)

const { innerValue } = useVModel(modelValue, modelValue.value, newValue => {
  emit('update:modelValue', newValue)
})

const dropdownDom = ref<HTMLDivElement | null>(null)
useClickOutside({
  elRef: dropdownDom,
  cbOutside: () => {
    if (props.disabled || props.manual) return
    innerValue.value = false
  },
  cbInside: () => {
    if (props.disabled || props.manual) return
    innerValue.value = true
  },
})
</script>
<template>
  <div
    ref="dropdownDom"
    :class="['c-dropdown', { 'c-dropdown--dropped': innerValue }]"
  >
    <div class="c-dropdown--trigger">
      <!-- 
        @slot The trigger content 
        @zh 用于触发下拉的内容 -->
      <slot />
    </div>
    <div
      :class="[
        'c-dropdown--drop-content',
        { 'c-dropdown--drop-content-auto-width': !widthWithinParent },
      ]"
    >
      <!-- 
        @slot The dropdown content. 
        @zh 下拉内容 -->
      <slot name="drop-content" />
    </div>
  </div>
</template>
