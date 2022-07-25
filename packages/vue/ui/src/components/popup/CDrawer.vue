<script
  setup
  lang="ts"
>
import { computed } from 'vue'
import { useDefaultVModel } from '../../usable/useVModel'
import CDialog from './CDialog.vue'
import { ionCloseOutline } from '@quasar/extras/ionicons-v5'

interface Props {
  /**
   * 是否展示抽屉，用于<code>v-model</code>绑定
   */
  modelValue?: boolean
  /**
   * 抽屉弹出位置
   */
  position?: 'left' | 'top' | 'right' | 'bottom'
  /**
   * 抽屉的标题
   */
  title?: string
  /**
   * 抽屉的宽度，该属性仅在左右弹出抽屉时可用
   */
  width?: string
  /**
   * 抽屉的高度，该属性仅在上下弹出抽屉时可用
   */
  bodyHeight?: string

  /**
   * 点击遮罩是否关闭抽屉
   */
  closeOnClickBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  position: 'left',
  title: '',
  width: '20vw',
  bodyHeight: '20vh',
  closeOnClickBackdrop: true,
})

const emit = defineEmits<{
  /**
   * 抽屉展开状态变化时触发
   */
  (e: 'update:modelValue', newValue: boolean): void
}>()

const hMap = new Map([
  ['left', 'start'],
  ['top', 'center'],
  ['right', 'end'],
  ['bottom', 'center'],
])

const vMap = new Map([
  ['left', 'center'],
  ['top', 'start'],
  ['right', 'center'],
  ['bottom', 'end'],
])

const isLeftOrRight = computed(
  () => props.position === 'left' || props.position === 'right'
)

const innerValue = useDefaultVModel(props, emit)
</script>
<template>
  <CDialog
    v-model="innerValue"
    :title="title"
    :horizontal-align="hMap.get(position)"
    :vertical-align="vMap.get(position)"
    :exchange-animation-direction="isLeftOrRight"
    :width="isLeftOrRight ? width : '100vw'"
    :custom-style="isLeftOrRight ? { height: '100vh' } : {}"
    :body-height="!isLeftOrRight ? bodyHeight : 'auto'"
    :close-on-click-backdrop="closeOnClickBackdrop"
  >
    <template #title>
      <!-- @slot 自定义标题内容 -->
      <slot name="title"> {{ title }} </slot>
    </template>

    <template #close-icon>
      <!-- @slot 自定义关闭图标 -->
      <slot name="close-icon">
        <c-icon :content="ionCloseOutline" />
      </slot>
    </template>

    <!-- @slot 抽屉内容 -->
    <slot />
  </CDialog>
</template>
<style
  lang="scss"
  scoped
></style>
