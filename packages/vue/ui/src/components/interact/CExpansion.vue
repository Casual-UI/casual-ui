<script
  setup
  lang="ts"
>
import { ref, onMounted, computed } from 'vue'
import { CIcon } from 'casual-ui-vue'
import { matKeyboardArrowDown } from '@quasar/extras/material-icons'
import { useDefaultVModel } from '../../usable/useVModel'

interface CExpansionProps {
  /**
   * 图标
   */
  icon?: string
  /**
   * 标题
   */
  title?: string
  /**
   * 是否展开，用于<code>v-model</code>默认绑定
   */
  modelValue?: boolean
  /**
   * 是否反向展开，如果设置为<code>true</code>则会从上方展开
   */
  reverse?: boolean
}

const props = withDefaults(defineProps<CExpansionProps>(), {
  title: '',
  modelValue: false,
  icon: '',
  reverse: false,
})

const emit = defineEmits<{
  /**
   * 展开状态变化时触发
   */
  (e: 'update:modelValue', newValue: boolean): void
}>()

const bodyDom = ref<HTMLDivElement | null>(null)
const initialBodyHeight = ref('auto')
const innerValue = ref(true)

useDefaultVModel(props, emit)

const onHeaderClick = () => {
  innerValue.value = !innerValue.value
}

onMounted(() => {
  initialBodyHeight.value = `${bodyDom.value?.clientHeight}px`
  innerValue.value = props.modelValue
})

const realtimeBodyHeigh = computed(() =>
  innerValue.value ? initialBodyHeight.value : 0
)

const setHeight = (h: number) => {
  initialBodyHeight.value = `${h}px`
}

defineExpose({
  setHeight,
})
</script>
<template>
  <div
    :class="['c-expansion', { 'c-expansion--expanded': innerValue }]"
    :style="`--casual-expansion-height:${realtimeBodyHeigh};`"
  >
    <div
      v-if="reverse"
      ref="bodyDom"
      class="c-expansion--body"
    >
      <!-- @slot 默认展开内容 -->
      <slot v-bind="{ setHeight }" />
    </div>
    <div
      class="c-expansion--header"
      @click.stop="onHeaderClick"
    >
      <div
        v-if="icon || $slots.icon"
        class="c-expansion--icon"
      >
        <!-- @slot 自定义图标 -->
        <slot name="icon">
          <c-icon :content="icon" />
        </slot>
      </div>
      <div class="c-expansion--title">
        <!-- @slot 自定义标题 -->
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        :class="[
          'c-expansion--arrow',
          { 'c-expansion--arrow-expanded': innerValue },
        ]"
      >
        <!-- 
          @slot 自定义箭头 
            @binding {boolean} expand-status 当前展开状态
          -->
        <slot
          name="arrow"
          :expand-status="innerValue"
        >
          <c-icon
            class=""
            :content="matKeyboardArrowDown"
          />
        </slot>
      </div>
    </div>
    <div
      v-if="!reverse"
      ref="bodyDom"
      class="c-expansion--body"
    >
      <!-- @slot 默认展开内容 -->
      <slot v-bind="{ setHeight }" />
    </div>
  </div>
</template>
