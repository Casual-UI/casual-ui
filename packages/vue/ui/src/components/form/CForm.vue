<script lang="ts">
export const errorKey = Symbol('errorStatus')
</script>

<script setup lang="ts">
import useFormProps, { type LabelDirection } from './useFormProps'
import CFormItem from './CFormItem.vue'
import type { Component } from 'vue'
import { provide, ref } from 'vue'
import type { CRule, CSize } from 'casual-types'
import { useDefaultVModel } from '../../usable/useVModel'

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
}

const emit = defineEmits<{
  /**
   * 表单绑定值变化时触发
   */
  (e: 'update:modelValue', value: object): void
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

const errorStatus = ref(
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
