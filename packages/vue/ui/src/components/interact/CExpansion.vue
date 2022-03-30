<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { CIcon } from 'casual-ui-vue'
import { matKeyboardArrowDown } from '@quasar/extras/material-icons'

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
}

const props = withDefaults(defineProps<CExpansionProps>(), {
  title: '',
  modelValue: true,
  icon: '',
})

const emit = defineEmits<{
  /**
   * 展开状态变化时触发
   */
  (e: 'update:modelValue', newValue: boolean): void
}>()

const innerExpandStatus = ref(true)
const bodyDom = ref<HTMLDivElement | null>(null)
const initialBodyHeight = ref('auto')

watch(
  () => props.modelValue,
  newValue => {
    innerExpandStatus.value = newValue
  }
)

watch(innerExpandStatus, newInnerExpandStatus => {
  emit('update:modelValue', newInnerExpandStatus)
})

const onHeaderClick = () => {
  innerExpandStatus.value = !innerExpandStatus.value
}

onMounted(() => {
  initialBodyHeight.value = `${bodyDom.value?.clientHeight}px`
  innerExpandStatus.value = props.modelValue
})

const realtimeBodyHeigh = computed(() =>
  innerExpandStatus.value ? initialBodyHeight.value : 0
)
</script>
<template>
  <div
    :class="['c-expansion', { 'c-expansion--expanded': innerExpandStatus }]"
    :style="`--casual-expansion-height:${realtimeBodyHeigh};`"
  >
    <div class="c-expansion--header" @click="onHeaderClick">
      <div v-if="icon || $slots.icon" class="c-expansion--icon">
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
          { 'c-expansion--arrow-expanded': innerExpandStatus },
        ]"
      >
        <!-- 
          @slot 自定义箭头 
            @binding {boolean} expand-status 当前展开状态
          -->
        <slot name="arrow" :expand-status="innerExpandStatus">
          <c-icon class="" :content="matKeyboardArrowDown" />
        </slot>
      </div>
    </div>
    <div ref="bodyDom" class="c-expansion--body">
      <!-- @slot 默认展开内容 -->
      <slot />
    </div>
  </div>
</template>
