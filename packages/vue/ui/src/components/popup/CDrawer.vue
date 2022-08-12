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
   * The drawer shown status. Can be used with <code>v-model</code>.
   * @zh 是否展示抽屉，用于<code>v-model</code>绑定
   */
  modelValue?: boolean
  /**
   * The position of drawer.
   * @zh 抽屉弹出位置
   */
  position?: 'left' | 'top' | 'right' | 'bottom'
  /**
   * The title.
   * @zh 抽屉的标题
   */
  title?: string
  /**
   * The width of drawer. This is only working when the drawer is left or right.
   * @zh 抽屉的宽度，该属性仅在左右弹出抽屉时可用
   */
  width?: string
  /**
   * The height of drawer. This is only working when the drawer is top or bottom.
   * @zh 抽屉的高度，该属性仅在上下弹出抽屉时可用
   */
  bodyHeight?: string

  /**
   * Determine whether to close the drawer when backdrop clicked or not.
   * @zh 点击遮罩是否关闭抽屉
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
   * Emit when the open status change.
   * @zh 抽屉展开状态变化时触发
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
      <!-- 
        @slot Customize the title content
        @zh 自定义标题内容 -->
      <slot name="title"> {{ title }} </slot>
    </template>

    <template #close-icon>
      <!-- 
        @slot Customize the close icon
        @zh 自定义关闭图标 -->
      <slot name="close-icon">
        <c-icon :content="ionCloseOutline" />
      </slot>
    </template>

    <!-- 
      @slot The drawer content. 
      @zh 抽屉内容 -->
    <slot />
  </CDialog>
</template>
