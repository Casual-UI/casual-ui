<script
  setup
  lang="ts"
>
import usePosition from './usePosition'

interface CPopupProps {
  /**
   * 是否处于打卡状态
   */
  modelValue: boolean
  /**
   * 水平对齐方式
   */
  horizontalAlign?: 'start' | 'center' | 'end'
  /**
   * 垂直对齐方式
   */
  verticalAlign?: 'start' | 'center' | 'end'
  /**
   * 额外根样式类
   */
  additionClass?: string

  /**
   * 点击遮罩是否关闭弹出层
   */
  closeOnClickBackdrop?: boolean
}

const props = withDefaults(defineProps<CPopupProps>(), {
  horizontalAlign: undefined,
  verticalAlign: undefined,
  additionClass: '',
  closeOnClickBackdrop: true,
})

const emit = defineEmits<{
  /**
   * 弹出层展示状态切换触发
   */
  (e: 'update:modelValue', newValue: boolean): void
}>()

const { provideHorizontalAlign, provideVerticalAlign } = usePosition(props)
const onBackdropClick = () => {
  if (props.closeOnClickBackdrop) {
    console.log('close')
    emit('update:modelValue', false)
  }
}
</script>
<template>
  <div :class="['c-popup', { 'c-popup--show': modelValue }, additionClass]">
    <Transition name="c-dialog-backdrop">
      <div
        v-if="modelValue"
        class="c-popup--backdrop"
        @click="onBackdropClick"
      ></div>
    </Transition>
    <div
      :class="[
        'c-popup--content-wrapper',
        `c-items-${provideHorizontalAlign}`,
        `c-justify-${provideVerticalAlign}`,
      ]"
    >
      <div class="c-popup--content">
        <slot />
      </div>
    </div>
  </div>
</template>
