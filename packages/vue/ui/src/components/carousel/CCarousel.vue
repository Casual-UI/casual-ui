<script lang="ts">
export const slidesKey = Symbol('slides')
export const activeIndexKey = Symbol('activeIndex')
export const directionKey = Symbol('direction')
export const verticalKey = Symbol('vertical')
export const intervalKey = Symbol('interval')
export const timeoutKey = Symbol('timeout')
export const toNextKey = Symbol('toNext')

export type Direction = 'forward' | 'backward'
</script>
<script
  setup
  lang="ts"
>
import { computed, provide, ref, toRefs } from 'vue'
import CButton from '../basic/button/CButton.vue'
import CIcon from '../basic/icon/CIcon.vue'
import {
  outlinedNavigateBefore,
  outlinedNavigateNext,
} from '@quasar/extras/material-icons-outlined'

interface Props {
  /**
   * 当前激活项下标，可使用<code>v-model</code>绑定
   */
  modelValue?: number
  /**
   * 轮播容器高度
   */
  height?: string
  /**
   * 轮播主题，该值会指示器以及箭头控制器主题色
   */
  theme?: 'primary' | 'secondary' | 'warning' | 'negative'
  /**
   * 自动播放时间间隔，单位为毫秒. 设置大于0时会开启自动播放
   */
  interval?: number
  /**
   * 指示器水平方向的位置
   */
  indicatorsPositionHorizontal?: 'start' | 'center' | 'end'
  /**
   * 指示器垂直方向的位置
   */
  indicatorsPositionVertical?: 'start' | 'center' | 'end'
  /**
   * 指示器排列方式
   */
  indicatorsAlignDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  /**
   * 是否为纵向过渡
   */
  vertical?: boolean
  /**
   * 是否为循环播放
   */
  infinity?: boolean
  /**
   * 箭头控制器展示时机
   */
  arrowTiming?: 'always' | 'hover' | 'never'
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  height: '300px',
  theme: 'primary',
  interval: 0,
  indicatorsPositionHorizontal: 'center',
  indicatorsPositionVertical: 'end',
  indicatorsAlignDirection: 'row',
  vertical: false,
  infinity: false,
  arrowTiming: 'always',
})
const emit = defineEmits<{
  (e: 'update:modelValue', newIndex: number): void
}>()
const slides = ref([])
const direction = ref<Direction>('forward')
const timeoutFlag = ref(null)

const { modelValue, vertical, interval } = toRefs(props)

provide(slidesKey, slides)
provide(activeIndexKey, modelValue)
provide(directionKey, direction)
provide(verticalKey, vertical)
provide(intervalKey, interval)
provide(timeoutKey, timeoutFlag)

const showArrow = ref(props.arrowTiming === 'always')

const onContainerMouseEnter = () => {
  if (props.arrowTiming === 'hover') {
    showArrow.value = true
  }
}
const onContainerMouseLeave = () => {
  if (props.arrowTiming === 'hover') {
    showArrow.value = false
  }
}

const toIndex = (idx: number) => {
  if (idx < props.modelValue) {
    if (idx >= 0) {
      direction.value = 'backward'
      emit('update:modelValue', idx)
      return
    }
    if (props.infinity) {
      direction.value = 'backward'
      emit('update:modelValue', slides.value.length - 1)
    }
    return
  }
  if (idx > props.modelValue) {
    if (idx < slides.value.length) {
      direction.value = 'forward'
      emit('update:modelValue', idx)
      return
    }
    if (props.infinity) {
      direction.value = 'forward'
      emit('update:modelValue', 0)
    }
  }
}
const toPrev = () => toIndex(props.modelValue - 1)
const toNext = () => toIndex(props.modelValue + 1)

const showPrev = computed(
  () => showArrow.value && (props.infinity || props.modelValue > 0)
)
const showNext = computed(
  () =>
    showArrow.value &&
    (props.infinity || props.modelValue < slides.value.length - 1)
)

provide(toNextKey, toNext)

defineExpose({
  toIndex,
  toPrev,
  toNext,
})
</script>
<template>
  <div
    :class="['c-carousel', { 'c-carousel--vertical': vertical }]"
    :style="{
      height,
    }"
    @mouseenter="onContainerMouseEnter"
    @mouseleave="onContainerMouseLeave"
  >
    <div
      :class="[
        'c-carousel--indicators',
        'c-flex',
        `c-items-${indicatorsPositionVertical}`,
        `c-justify-${indicatorsPositionHorizontal}`,
      ]"
    >
      <div
        :class="[
          'c-carousel--indicators-container',
          'c-gutter-sm',
          'c-flex',
          `c-${indicatorsAlignDirection}`,
        ]"
      >
        <!-- 自定义指示器内容 -->
        <slot name="indicators">
          <div
            v-for="(_, i) in slides"
            :key="i"
          >
            <div
              :class="[
                'c-carousel--indicator-item',
                `c-carousel--indicator-item--${theme}`,
                { 'c-carousel--indicator-item--active': i === modelValue },
              ]"
              @click="toIndex(i)"
            ></div>
          </div>
        </slot>
      </div>
    </div>

    <Transition name="c-carousel-control">
      <div
        v-if="showPrev"
        class="c-carousel--control c-carousel--control--prev"
        @click="toPrev"
      >
        <!-- @slot 自定义向前箭头控制器内容 -->
        <slot name="control-prev">
          <c-button
            icon
            flat
            :theme="theme"
          >
            <c-icon :content="outlinedNavigateBefore" />
          </c-button>
        </slot>
      </div>
    </Transition>

    <Transition name="c-carousel-control">
      <div
        v-if="showNext"
        class="c-carousel--control c-carousel--control--next"
        @click="toNext"
      >
        <!-- @slot 自定义向后箭头控制器内容 -->
        <slot name="control-next">
          <c-button
            icon
            flat
            :theme="theme"
          >
            <c-icon :content="outlinedNavigateNext" />
          </c-button>
        </slot>
      </div>
    </Transition>

    <div class="c-carousel--sliders">
      <!-- @slot 轮播内容，推荐使用<code>c-carousel-slider</code> -->
      <slot />
    </div>
  </div>
</template>
