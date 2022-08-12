<script
  setup
  lang="ts"
>
import { useClickOutside } from 'casual-ui-vue'
import { ref, watch } from 'vue'
interface CTooltipProps {
  /**
   * The popup content.
   * @zh 弹出的内容文字
   */
  content?: string
  /**
   * The popup position.
   * @zh 弹出位置
   */
  position?:
    | 'top-left'
    | 'top-right'
    | 'top'
    | 'left-top'
    | 'left'
    | 'left-bottom'
    | 'bottom-left'
    | 'bottom'
    | 'bottom-right'
    | 'right-top'
    | 'right'
    | 'right-bottom'
  /**
   * The trigger method.
   * @zh 触发方式
   */
  trigger?: 'hover' | 'click' | 'manual'
  /**
   * The show status of tooltip. Can be used with <code>v-model:show</code>. And only working when the trigger is <code>'manual'</code>
   * @zh 是否展示弹出内容，可以使用<code>v-model:show</code>，仅在<code>trigger = 'manual'</code>时可用
   */
  show?: boolean
}

defineEmits<{
  /**
   * Emit when the show status change.
   * @zh 手动触发时使用，用于<code>v-model:show</code>绑定
   */
  (e: 'update:show', newShow: boolean): void
}>()

const props = withDefaults(defineProps<CTooltipProps>(), {
  content: '',
  position: 'top',
  trigger: 'hover',
  show: false,
})

const innerShow = ref(props.show)
const tooltipDom = ref<HTMLDivElement | null>(null)

watch(
  () => props.show,
  newShow => {
    innerShow.value = newShow
  }
)

const onMouseEnter = () => {
  if (props.trigger === 'hover') {
    innerShow.value = true
  }
}

const onMouseLeave = () => {
  if (props.trigger === 'hover') {
    innerShow.value = false
  }
}

if (props.trigger === 'click') {
  useClickOutside({
    elRef: tooltipDom,
    cbInside: () => {
      innerShow.value = !innerShow.value
    },
    cbOutside: () => {
      innerShow.value = false
    },
  })
}
</script>
<template>
  <div
    ref="tooltipDom"
    class="c-tooltip"
    :class="[{ 'c-tooltip--show': innerShow }]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="c-tooltip--trigger-content">
      <!-- 
        @slot The trigger content.
        @zh 默认内容，用于触发tooltip -->
      <slot />
    </div>
    <div
      class="c-tooltip--popper-content-wrapper"
      :class="[`c-tooltip--position-${position}`]"
      @click.stop
    >
      <!-- 
        @slot The popup content. Will override the content prop. 
        @zh 弹出层内容，如果设置了该插槽，会覆盖<code>content</code>属性 -->
      <slot name="popup">
        <div class="c-tooltip--popper-content">
          {{ content }}
        </div>
      </slot>
    </div>
  </div>
</template>
