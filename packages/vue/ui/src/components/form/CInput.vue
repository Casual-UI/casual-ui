<script setup lang="ts">
import { ref, toRefs } from 'vue'
import {
  useInjectTheme,
  useVModel,
  useInjectSize,
  useSizeThemeClass,
  CLoading,
  CIcon,
  useDefaultVModel,
} from 'casual-ui-vue'
import { matHighlightOff } from '@quasar/extras/material-icons'
import type { CSize, CTheme } from 'casual-types'
import useValidator from './useValidator'

interface OInputProps {
  /**
   * 输入框内的值，用于默认的<code>v-model</code>绑定
   */
  modelValue: string | number
  /**
   * 主题
   */
  theme?: CTheme
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 输入框预设文本
   */
  placeholder?: string
  /**
   * 是否表现为圆角
   */
  rounded?: boolean
  /**
   * 是否处于加载态
   */
  loading?: boolean
  /**
   * 内容是否可清除
   */
  clearable?: boolean
  /**
   * 是否是只读状态
   */
  readonly?: boolean
  /**
   * 是否展示前置内容与输入框之间的分割线
   */
  prefixDivider?: boolean
  /**
   * 是否展示后置内容与输入框之间的分割线
   */
  suffixDivider?: boolean
  /**
   * 是否处于聚焦态，<code>v-model:focused</code>双向绑定用
   */
  focused?: boolean
  /**
   * 是否自动根据input失去焦点事件blur
   */
  autoBlur?: boolean
  /**
   * 输入框类型
   */
  type?: 'text' | 'password'
  /**
   * 是否使用自定义颜色状态，若设置为<code>true</code>，则聚焦不会触发边框颜色变更，包括背景色、边框色
   */
  customColor?: boolean
  /**
   * 表单验证触发时机，默认为<code>'blur'</code>
   */
  validateTrigger?: 'change' | 'blur' | 'focus' | 'manual'
  /**
   * 是否在聚焦时清除验证状态
   */
  clearValidateOnFocus?: boolean
}

const emit = defineEmits<{
  /**
   * 输入框值发生变化时触发
   * @arg {string} newValue - 新的输入框内的值
   */
  (e: 'update:modelValue', newValue: string | number): void
  /**
   * 聚焦状态发生变化时触发
   * @arg {boolean} newFocusStatus - 新的聚焦状态
   */
  (e: 'update:focused', newFocusStatus: boolean): void
  /**
   * 清除按钮触发
   */
  (e: 'clear'): void
}>()

const props = withDefaults(defineProps<OInputProps>(), {
  theme: undefined,
  disabled: false,
  placeholder: '',
  rounded: false,
  loading: false,
  clearable: false,
  readonly: false,
  prefixDivider: true,
  suffixDivider: true,
  size: undefined,
  focused: false,
  autoBlur: true,
  type: 'text',
  customColor: false,
  validateTrigger: 'blur',
  clearValidateOnFocus: true,
})

const { focused } = toRefs(props)
const { provideSize: innerSize } = useInjectSize(props)

const { provideTheme: theme } = useInjectTheme(props)

const sizeThemeClasses = useSizeThemeClass({
  size: innerSize,
  theme,
  prefix: 'c-input',
})

const { innerValue: innerFocused } = useVModel(focused, false, newFocused => {
  emit('update:focused', newFocused)
})

const { hasError, validate, clearValidate } = useValidator()

const innerValue = useDefaultVModel(props, emit, {
  beforeEmit: props.validateTrigger === 'change' ? validate : undefined,
})

const inputDom = ref<HTMLInputElement | null>(null)

const onFocus = () => {
  if (props.clearValidateOnFocus) {
    clearValidate()
  }
  innerFocused.value = true
}

const onBlur = () => {
  if (props.autoBlur) {
    innerFocused.value = false
  }
  if (props.validateTrigger === 'blur') {
    validate(innerValue.value)
  }
}

const focusInput = () => {
  inputDom.value?.focus()
}

const onClearIconClick = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>
<template>
  <div
    :class="[
      ...sizeThemeClasses,
      { 'c-input--custom-color': customColor },
      { 'c-input--focused': innerFocused },
      { 'c-input--disabled': disabled },
      { 'c-input--readonly': readonly },
      `c-font-${innerSize}`,
      rounded && `c-rounded-${innerSize}`,
      { 'c-input--loading': loading },
      `c-h-${innerSize}`,
      `c-px-${innerSize}`,
      { 'c-input--has-error': hasError },
    ]"
  >
    <div :class="['c-input--content-wrapper']">
      <div
        :class="[
          'c-input--prefix',
          { 'c-input--prefix-with-divider': prefixDivider },
          { 'c-pr-sm c-input--prefix-with-content': $slots.prefix },
        ]"
        @click="focusInput"
      >
        <!-- @slot 输入框前置内容 -->
        <slot name="prefix" />
      </div>
      <div class="c-input--input-wrapper">
        <input
          ref="inputDom"
          v-model="innerValue"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled || loading"
          :readonly="readonly"
          :type="type"
          :class="[{ 'c-pl-sm': $slots.prefix }, { 'c-pr-sm': $slots.suffix }]"
          @focus="onFocus"
          @blur="onBlur"
        />
      </div>
      <div
        v-if="clearable"
        :class="[
          'c-input--clear-icon',
          { 'c-mr-sm': $slots.suffix || loading },
          { 'c-input--clear-icon-show': innerValue },
        ]"
        @click.stop="onClearIconClick"
      >
        <c-icon :content="matHighlightOff" />
      </div>
      <div
        :class="[
          'c-input--suffix',
          { 'c-input--suffix-with-divider': suffixDivider },
          {
            'c-pl-sm c-input--suffix-with-content': $slots.suffix,
          },
        ]"
        @click="focusInput"
      >
        <div :class="[{ 'c-mr-sm': loading }]">
          <!-- @slot 输入框后置内容 -->
          <slot name="suffix" />
        </div>
        <!-- @slot 自定义加载中 -->
        <slot v-if="loading" name="loading">
          <c-loading />
        </slot>
      </div>
    </div>
  </div>
</template>
