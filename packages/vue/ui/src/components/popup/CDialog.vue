<script
  setup
  lang="ts"
>
import { CButton, CIcon, CPopup, useDefaultVModel } from 'casual-ui-vue'
import { toRefs, onMounted, onUnmounted, computed } from 'vue'
import { ionCloseOutline } from '@quasar/extras/ionicons-v5'
import usePosition from './usePosition'
import type { PositionGroup } from 'casual-types'

interface CDialogProps {
  /**
   * The open status of dialog. Can be used with <code>v-model</code>
   * @zh 对话框是否打开，可用于<code>v-model</code>绑定
   */
  modelValue: boolean
  /**
   * The title.
   * @zh 标题
   */
  title?: string
  /**
   * The dialog width.
   * @zh 宽度
   */
  width?: string
  /**
   * The body height. This doesn't contain the header and footer height.
   * @zh 对话框体高度
   */
  bodyHeight?: string
  /**
   * Determine whether the body content has a padding or not.
   * @zh 是否具有内容内边距
   */
  bodyPadding?: boolean
  /**
   * Determine whether the dialog have a rounded border or not.
   * @zh 是否表现为圆角
   */
  rounded?: boolean
  /**
   * Determine whether to show the close icon or not.
   * @zh 是否展示关闭图标
   */
  closeIcon?: boolean
  /**
   * The horizontal position of dialog.
   * @zh 水平对齐方式
   */
  horizontalAlign?: 'start' | 'center' | 'end'
  /**
   * The vertical position of dialog.
   * @zh 垂直对齐方式
   */
  verticalAlign?: 'start' | 'center' | 'end'
  /**
   * The custom class add to container.
   * @zh 自定义对话框DOM样式类
   */
  customClass?: string
  /**
   * The custom style add to container.
   * @zh 自定义对话框DOM样式
   */
  customStyle?: object
  /**
   * The custom body style add to content body.
   * @zh 自定义对话框内容样式类
   */
  customBodyStyle?: object
  /**
   * Determine whether to show the cancel button or not.
   * @zh 是否展示取消按钮
   */
  showCancelBtn?: boolean
  /**
   * The cancel button text.
   * @zh 取消按钮文字
   */
  cancelBtnLabel?: string
  /**
   * Determine whether to show the confirm button or not.
   * @zh 是否展示确认按钮
   */
  showConfirmBtn?: boolean
  /**
   * The confirm button text.
   * @zh 确认按钮文字
   */
  confirmBtnLabel?: string

  /**
   * Determine whether to exchange the dialog animation direction order.
   * @zh 是否交换动画的先后方向，初始为先横向展开，后纵向展开，设置为true，则先纵向展开，后横向展开
   */
  exchangeAnimationDirection?: boolean
  /**
   * Determine whether to close the dialog when ESC pressed or not.
   * @zh 是否在按下Esc按键后关闭对话框
   */
  closeOnEsc?: boolean

  /**
   * Determine whether to close the dialog when backdrop clicked or not.
   * @zh 点击遮罩是否关闭弹出层
   */
  closeOnClickBackdrop?: boolean
}

const props = withDefaults(defineProps<CDialogProps>(), {
  title: '',
  width: '40vw',
  bodyHeight: 'auto',
  bodyPadding: true,
  rounded: true,
  closeIcon: true,
  horizontalAlign: undefined,
  verticalAlign: undefined,
  customClass: '',
  customStyle: () => ({}),
  cancelBtnLabel: 'Cancel',
  confirmBtnLabel: 'Confirm',
  showCancelBtn: false,
  showConfirmBtn: false,
  exchangeAnimationDirection: false,
  customBodyStyle: () => ({}),
  closeOnEsc: true,
  closeOnClickBackdrop: true,
})

const { provideHorizontalAlign, provideVerticalAlign } = usePosition(props)

const emit = defineEmits<{
  /**
   * Emit when the open status change.
   * @zh 绑定值发生变化时触发
   */
  (e: 'update:modelValue', newValue: boolean): void
  /**
   * Emit when the dialog opened and transition animation is done.
   * @zh 对话框打开并且动画行为完成时触发
   */
  (e: 'opened'): void
}>()

const innerValue = useDefaultVModel(props, emit)

const listenKeyboard = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && innerValue.value && props.closeOnEsc) {
    innerValue.value = false
  }
}

onMounted(() => {
  window.addEventListener('keyup', listenKeyboard)
})

onUnmounted(() => {
  window.removeEventListener('keyup', listenKeyboard)
})

const onAfterEnter = () => emit('opened')
const roundedClass = computed(() => {
  const classMap = new Map<PositionGroup, string>([
    ['start start', `c-rounded-br-md`],
    ['start center', 'c-rounded-r-md'],
    ['start end', 'c-rounded-tr-md'],
    ['center start', 'c-rounded-b-md'],
    ['center center', 'c-rounded-md'],
    ['center end', 'c-rounded-t-md'],
    ['end start', 'c-rounded-bl-md'],
    ['end center', 'c-rounded-l-md'],
    ['end end', 'c-rounded-tl-md'],
  ])

  return (
    classMap.get(
      `${provideHorizontalAlign.value} ${provideVerticalAlign.value}` as PositionGroup
    ) || ''
  )
})
</script>
<template>
  <Teleport to="body">
    <c-popup
      v-model="innerValue"
      addition-class="c-popup--dialog"
      :close-on-click-backdrop="closeOnClickBackdrop"
    >
      <Transition
        :name="exchangeAnimationDirection ? 'c-dialog-reverse' : 'c-dialog'"
        @after-enter="onAfterEnter"
      >
        <div
          v-if="innerValue"
          :class="['c-dialog', rounded ? roundedClass : '', customClass]"
          :style="{
            width,
            ...customStyle,
          }"
        >
          <div class="c-dialog--header">
            <!-- 
              @slot Customize the header content.
              @zh 自定义对话框头部内容 -->
            <slot name="header">
              <!-- 
                @slot Customize the title content.
                @zh 自定义标题内容 -->
              <div class="c-dialog--title">
                <slot name="title">
                  {{ title }}
                </slot>
              </div>
              <div
                v-if="closeIcon"
                class="c-dialog--close-btn"
                @click="innerValue = false"
              >
                <!-- 
                  @slot Customize the close icon.
                  @zh 自定义关闭图标 -->
                <slot name="close-icon">
                  <c-icon :content="ionCloseOutline" />
                </slot>
              </div>
            </slot>
          </div>
          <div
            :class="['c-dialog--content', { 'c-px-md c-pb-md': bodyPadding }]"
            :style="{
              height: bodyHeight,
              ...customBodyStyle,
            }"
          >
            <!-- 
              @slot The dialog content.
              @zh 默认内容 -->
            <slot />
          </div>
          <div class="c-dialog--footer">
            <!-- 
              @slot Customize the footer content. 
              @zh 自定义对话框底部内容 -->
            <slot name="footer">
              <div class="c-row c-gutter-x-sm">
                <!-- 
                    @slot Customize the footer actions.
                    @zh 自定义底部操作按钮
                  -->
                <slot name="footer-actions">
                  <div class="c-row c-gutter-x-sm">
                    <div>
                      <c-button
                        v-if="showCancelBtn"
                        :label="cancelBtnLabel"
                        flat
                        :rounded="rounded"
                      />
                    </div>
                    <div>
                      <c-button
                        v-if="showConfirmBtn"
                        :label="confirmBtnLabel"
                        :rounded="rounded"
                      />
                    </div>
                  </div>
                </slot>
              </div>
            </slot>
          </div>
        </div>
      </Transition>
    </c-popup>
  </Teleport>
</template>
