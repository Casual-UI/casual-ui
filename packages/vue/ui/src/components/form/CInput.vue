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
  useBEM,
} from 'casual-ui-vue'
import { matHighlightOff } from '@quasar/extras/material-icons'
import type { CSize, CTheme } from 'casual-types'
import useValidator from './useValidator'

interface OInputProps {
  /**
   * The input value. Can be used with <code>v-model</code>.
   * @zh 输入框内的值，用于默认的<code>v-model</code>绑定
   */
  modelValue: string | number
  /**
   * The theme color.
   * @zh 主题
   */
  theme?: CTheme
  /**
   * Determine whether the input is disabled or not.
   * @zh 是否禁用
   */
  disabled?: boolean
  /**
   * The size of input.
   * @zh 尺寸
   */
  size?: CSize
  /**
   * The input placeholder.
   * @zh 输入框预设文本
   */
  placeholder?: string
  /**
   * Determine whether the input has a rounded border or not.
   * @zh 是否表现为圆角
   */
  rounded?: boolean
  /**
   * Determine whether the input is in loading status or not.
   * @zh 是否处于加载态
   */
  loading?: boolean
  /**
   * Determine whether the input content can be cleared by a clear icon or not.
   * @zh 内容是否可清除
   */
  clearable?: boolean
  /**
   * Determine whether the input is readonly or not.
   * @zh 是否是只读状态
   */
  readonly?: boolean
  /**
   * Determine whether to be a divider between the input content and the prefix or not.
   * @zh 是否展示前置内容与输入框之间的分割线
   */
  prefixDivider?: boolean
  /**
   * Determine whether to be a divider between the input content and the suffix or not.
   * @zh 是否展示后置内容与输入框之间的分割线
   */
  suffixDivider?: boolean
  /**
   * Determine the input is in focused status or not.
   * @zh 是否处于聚焦态，<code>v-model:focused</code>双向绑定用
   */
  focused?: boolean
  /**
   * Determine whether the input's focus status is controlled manual.
   * @zh 是否自动根据input失去焦点事件blur
   */
  autoBlur?: boolean
  /**
   * The input type.
   * @zh 输入框类型
   */
  type?: 'text' | 'password'
  /**
   * Determine whether to disabled the default style trigger by hover and focus status or not.s
   * @zh 是否使用自定义颜色状态，若设置为<code>true</code>，则聚焦不会触发边框颜色变更，包括背景色、边框色
   */
  customColor?: boolean
  /**
   * The trigger to emit the form context validation which current input is in.
   * @zh 表单验证触发时机
   */
  validateTrigger?: 'change' | 'blur' | 'focus' | 'manual'
  /**
   * Determine whether to clear the validate status when blur or not.
   * @zh 是否在聚焦时清除验证状态
   */
  clearValidateOnFocus?: boolean
}

const emit = defineEmits<{
  /**
   * Emit when the input value changed.
   * @zh 输入框值发生变化时触发
   * @arg {string} newValue - new value
   * @arg {string} newValue_zh - 新的值
   */
  (e: 'update:modelValue', newValue: string | number): void
  /**
   * Emit when the input's focused status changed.
   * @zh 聚焦状态发生变化时触发
   * @arg {boolean} newFocusStatus - new focus status
   * @arg {boolean} newFocusStatus_zh - 新的聚焦状态
   */
  (e: 'update:focused', newFocusStatus: boolean): void
  /**
   * Emit when the clear icon is clicked.
   * @zh 清除按钮触发
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
      ...useBEM('input', {
        customColor,
        focused: innerFocused,
        disabled,
        readonly,
        loading,
        hasError,
      }),
      `c-font-${innerSize}`,
      rounded && `c-rounded-${innerSize}`,
      `c-h-${innerSize}`,
      `c-px-${innerSize}`,
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
        <!-- 
          @slot Customize prefix content.
          @zh 输入框前置内容 
        -->
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
          <!-- 
            @slot Customize suffix content.
            @zh 输入框后置内容 
          -->
          <slot name="suffix" />
        </div>
        <!-- 
          @slot Customize loading content.
          @zh 自定义加载中 
        -->
        <slot
          v-if="loading"
          name="loading"
        >
          <c-loading />
        </slot>
      </div>
    </div>
  </div>
</template>
