<script lang="ts">
export const errorKey = Symbol('errorStatus')
export const validatorsKey = Symbol('validators')

export default {}
</script>

<script setup lang="ts">
import useFormProps, { type LabelDirection } from './useFormProps'
import CFormItem from './CFormItem.vue'
import type { Component } from 'vue'
import { provide, ref } from 'vue'
import type { CRule, CSize } from 'casual-types'
import { useDefaultVModel } from '../../usable/useVModel'
import { nextTick } from 'process'

interface Option {
  value: string | number
  label: string
}

type FormItemComponent =
  | 'input'
  | 'select'
  | 'checkbox'
  | 'checkbox-group'
  | 'radio'
  | 'date-picker'
  | 'toggle'
  | Component

/**
 * 表单项配置
 */
interface CFormItemConfig {
  /**
   * 表单项类型，对应需要渲染的组件
   */
  component?: FormItemComponent
  /**
   * 需要传递给组件的额外props
   */
  componentProps?: object
  /**
   * 对应表单数据字段名称
   */
  field: string
  /**
   * 表单项文案提示
   */
  label?: string
  /**
   * 验证规则
   */
  rules?: CRule[]
  /**
   * 选项数组，当component为select、radio、checkbox-group时生效
   */
  options?: Option[]
  /**
   * 项的自定义列宽
   */
  col?: number
}

interface CFormProps {
  /**
   * 表单项配置
   */
  items?: CFormItemConfig[]
  /**
   * 表单绑定值，用于<code>v-model</code>
   */
  modelValue?: object
  /**
   * 表单项提示文案长度
   * @default '100px'
   */
  labelWidth?: string
  /**
   * 每个表单项占用的列数
   * @default 6
   */
  col?: number
  /**
   * 文本排列方向，表现为flex-direction的对应值
   * @default 'row'
   */
  labelDirection?: LabelDirection
  /**
   * 文字对齐方式，表现为text-align的对应值
   * @default 'left'
   */
  labelAlign?: 'left' | 'center' | 'right'
  /**
   * 尺寸
   * @default 'md'
   */
  size?: CSize
  /**
   * 表单项间隔尺寸
   */
  gutterSize?: CSize

  /**
   * 是否在验证中，可用于<code>v-model:validating</code>绑定，在具有异步验证规则时可能会需要这个属性用作一些状态展示
   */
  validating?: boolean
}

const emit = defineEmits<{
  /**
   * 表单绑定值变化时触发
   * @arg {any} newModelValue 新的绑定值
   */
  (e: 'update:modelValue', newModelValue: object): void
  /**
   * 表单验证进行中状态变更触发
   * @arg {boolean} newValidating 新的验证状态
   */
  (e: 'update:validating', newValidating: boolean): void
}>()

const props = withDefaults(defineProps<CFormProps>(), {
  items: () => [],
  modelValue: () => ({}),
  labelWidth: undefined,
  col: undefined,
  labelDirection: undefined,
  size: undefined,
  gutterSize: 'md',
  labelAlign: undefined,
  validating: false,
})

const innerValue = useDefaultVModel(props, emit)
useFormProps(props)

// 决定渲染何种组件，默认渲染输入框
const getComponent = (component?: FormItemComponent) => {
  if (!component) return 'c-input'
  if (typeof component === 'string') {
    return `c-${component}`
  }
  return component
}

const errorStatus = ref<{
  [key: string]: {
    error: boolean
    message: string
  }
}>(
  props.items.reduce(
    (obj, { field }) => ({
      ...obj,
      [field]: {
        error: false,
        message: '',
      },
    }),
    {}
  )
)

provide(errorKey, errorStatus)
const validators: ((formData: any) => Promise<void>)[] = []
provide(validatorsKey, validators)
const validatingCount = ref(0)

const addOneValidate = () => {
  if (validatingCount.value === 0) {
    emit('update:validating', true)
  }
  validatingCount.value++
}

const reduceOneValidate = () => {
  validatingCount.value--
  if (validatingCount.value === 0) {
    emit('update:validating', false)
  }
}
const validate = () => {
  return new Promise<void>(resolve => {
    validators.forEach(validator => validator(innerValue.value))
    Promise.all(validators.map(validator => validator(innerValue.value))).then(
      () => {
        nextTick(() => {
          if (Object.values(errorStatus.value).every(({ error }) => !error)) {
            resolve()
          }
        })
      }
    )
  })
}
defineExpose({
  validate,
})
</script>
<template>
  <div
    :class="[
      'c-form',
      'c-row',
      'c-items-center',
      'c-wrap',
      `c-gutter-${gutterSize}`,
    ]"
  >
    <!-- @slot 默认插槽，会覆盖配置式生成的内容 -->
    <slot>
      <c-form-item
        v-for="item in items"
        :key="item.field"
        :label="item.label"
        :field="item.field"
        :col="item.col"
        :rules="item.rules"
        @validate-start="addOneValidate"
        @validate-end="reduceOneValidate"
      >
        <!-- 
          @slot  
          @name [field] - 表单项的自定义内容，field为表单项的field属性
        -->
        <slot :name="item.field">
          <Component
            :is="getComponent(item.component)"
            v-model="innerValue[item.field]"
            v-bind="item.componentProps"
          />
        </slot>
      </c-form-item>
    </slot>
  </div>
</template>
