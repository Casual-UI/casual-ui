<script setup lang="ts">
import { useClickOutside } from 'casual-ui-vue'
import { ref, watch } from 'vue'
interface CTooltipProps {
  /**
   * 弹出的内容文字，如果设置了<code>popup</code>插槽，则会覆盖该项
   */
  content?: string
  /**
   * 弹出位置
   */
  position?: 'top' | 'right' | 'left' | 'bottom'
  /**
   * 触发方式
   */
  trigger?: 'hover' | 'click' | 'manual'
  /**
   * 是否展示弹出内容，用于<code>trigger = 'manual'</code>时
   */
  show?: boolean
}

defineEmits<{
  /**
   * 手动触发时使用，用于<code>v-model:show</code>绑定
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
      <!-- @slot 默认内容，用于触发tooltip -->
      <slot />
    </div>
    <div
      class="c-tooltip--popper-content-wrapper"
      :class="[`c-tooltip--position-${position}`]"
      @click.stop
    >
      <!-- @slot 弹出层内容，如果设置了该插槽，会覆盖<code>content</code>属性 -->
      <slot name="popup">
        <div class="c-tooltip--popper-content">
          {{ content }}
        </div>
      </slot>
    </div>
  </div>
</template>
