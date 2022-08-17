<script lang="ts">
export const slidesKey = Symbol('slides')
export const activeIndexKey = Symbol('activeIndex')
export const directionKey = Symbol('direction')
export const verticalKey = Symbol('vertical')
export const intervalKey = Symbol('interval')
export const timeoutKey = Symbol('timeout')
export const toNextKey = Symbol('toNext')
export const slidingKey = Symbol('sliding')
export const hoveringKey = Symbol('hovering')
export const pauseFunctionsKey = Symbol('pauses')
export const resumeFunctionsKey = Symbol('resumes')

export type Direction = 'forward' | 'backward'
</script>
<script
  setup
  lang="ts"
>
import { computed, nextTick, onMounted, provide, ref, toRefs } from 'vue'
import CButton from '../basic/button/CButton.vue'
import CIcon from '../basic/icon/CIcon.vue'
import {
  outlinedNavigateBefore,
  outlinedNavigateNext,
} from '@quasar/extras/material-icons-outlined'

interface Props {
  /**
   * The current active index (from 0). Can used with <code>v-model</code>
   * @zh 当前激活项下标，可使用<code>v-model</code>绑定
   */
  modelValue?: number
  /**
   * The height of container.
   * @zh 轮播容器高度
   */
  height?: string
  /**
   * The theme color. It will affect the indicators and controls' color.
   * @zh 轮播主题，该值会指示器以及箭头控制器主题色
   */
  theme?: 'primary' | 'secondary' | 'warning' | 'negative'
  /**
   * The autoplay interval. If set to a value larger than 0. Autoplay will be set.
   * @zh 自动播放时间间隔，单位为毫秒. 设置大于0时会开启自动播放
   */
  interval?: number
  /**
   * The indicators' horizontal position.
   * @zh 指示器水平方向的位置
   */
  indicatorsPositionHorizontal?: 'start' | 'center' | 'end'
  /**
   * The indicators' vertical position.
   * @zh 指示器垂直方向的位置
   */
  indicatorsPositionVertical?: 'start' | 'center' | 'end'
  /**
   * The indicators align direction.
   * @zh 指示器排列方式
   */
  indicatorsAlignDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  /**
   * Determine whether the transition is vertical or not.
   * @zh 是否为纵向过渡
   */
  vertical?: boolean
  /**
   * Determine whether the sliders can be toggled infinity or not.
   * @zh 是否为循环播放
   */
  infinity?: boolean
  /**
   * The arrow control shown timing.
   * @zh 箭头控制器展示时机
   */
  arrowTiming?: 'always' | 'hover' | 'never'
  /**
   * Determine whether to pause transition count down when the slider is hovering.
   * @zh 是否在鼠标悬停时暂停过渡倒计时
   */
  pauseOnHover?: boolean
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
  pauseOnHover: true,
})
const emit = defineEmits<{
  (e: 'update:modelValue', newIndex: number): void
}>()
const slides = ref([])
const direction = ref<Direction>('forward')
const timeoutFlag = ref(null)

const { modelValue, vertical, interval, pauseOnHover } = toRefs(props)

const pauses: Array<() => void> = []
const resumes: Array<() => void> = []

provide(slidesKey, slides)
provide(activeIndexKey, modelValue)
provide(directionKey, direction)
provide(verticalKey, vertical)
provide(intervalKey, interval)
provide(timeoutKey, timeoutFlag)
provide(pauseFunctionsKey, pauses)
provide(resumeFunctionsKey, resumes)

const showArrow = ref(props.arrowTiming === 'always')

const hovering = ref(false)
const sliding = ref(false)

provide(slidingKey, sliding)
provide(hoveringKey, hovering)

const onContainerMouseEnter = () => {
  hovering.value = true
  if (props.arrowTiming === 'hover') {
    showArrow.value = true
  }
  if (props.pauseOnHover) {
    pauses.forEach(p => p())
  }
}
const onContainerMouseLeave = () => {
  hovering.value = false

  if (props.arrowTiming === 'hover') {
    showArrow.value = false
  }
  if (props.pauseOnHover) {
    resumes.forEach(r => r())
  }
}

const indicatorsAnimationPlayState = computed(() =>
  (props.pauseOnHover && hovering.value) || sliding.value ? 'paused' : 'running'
)

const toIndex = (idx: number) => {
  const updateIndex = (i: number) => {
    nextTick(() => {
      emit('update:modelValue', i)
    })
  }
  if (idx < props.modelValue) {
    if (idx >= 0) {
      direction.value = 'backward'
      updateIndex(idx)
      return
    }
    if (props.infinity) {
      direction.value = 'backward'
      updateIndex(slides.value.length - 1)
    }
    return
  }
  if (idx > props.modelValue) {
    if (idx < slides.value.length) {
      direction.value = 'forward'
      updateIndex(idx)
      return
    }
    if (props.infinity) {
      direction.value = 'forward'
      updateIndex(0)
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

onMounted(() => {
  resumes.forEach(r => r())
})

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
        <!-- 
          @slot Customize the indicators content. 
          @zh 自定义指示器内容 
        -->
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
            >
              <div class="c-carousel--indicator-item--bg" />
              <div
                class="c-carousel--indicator-item--progress-bar"
                :style="
                  i === modelValue && interval
                    ? {
                        animationPlayState: indicatorsAnimationPlayState,
                        animationDuration: `${interval}ms`,
                      }
                    : {}
                "
              />
            </div>
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
        <!-- 
          @slot Customize the to previous control arrow. 
          @zh 自定义向前箭头控制器内容 
        -->
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
        <!-- 
          @slot Customize the to next control arrow. 
          @zh 自定义向后箭头控制器内容 
        -->
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
      <!-- 
        @slot The content of carousel. It is recommended to use <code>c-carousel-slider</code>.
        @zh 轮播内容，推荐使用<code>c-carousel-slider</code>
      -->
      <slot />
    </div>
  </div>
</template>
