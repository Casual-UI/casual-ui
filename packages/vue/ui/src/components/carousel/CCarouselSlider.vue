<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue'
import type { Ref } from 'vue'
import {
  toNextKey,
  activeIndexKey,
  directionKey,
  intervalKey,
  slidesKey,
  timeoutKey,
  verticalKey,
  pauseOnHoverKey,
} from './CCarousel.vue'
import type { Direction } from './CCarousel.vue'
import { computed } from '@vue/reactivity'

const slides = inject<Ref<number[]>>(slidesKey, ref([]))
const activeIndex = inject<Ref<number>>(activeIndexKey, ref(0))
const direction = inject<Ref<Direction>>(directionKey, ref('forward'))
const interval = inject<Ref<number>>(intervalKey, ref(0))
const timeoutFlag = inject<Ref<any>>(timeoutKey, ref(null))
const vertical = inject<Ref<boolean>>(verticalKey, ref(false))
const toNext = inject<() => void>(toNextKey, () => {})
const pauseOnHover = inject<Ref<boolean>>(pauseOnHoverKey, ref(false))

const timeLeft = ref(Date.now())

const currentIndex = slides?.value.length || 0
slides?.value.push(currentIndex)

const onTransitionEnd = () => {
  if (interval.value && toNext) {
    if (timeoutFlag.value) {
      clearTimeout(timeoutFlag.value)
    }
    if (timeoutFlag) {
      timeLeft.value = Date.now()
      timeoutFlag.value = setTimeout(toNext, interval.value)
    }
  }
}

onMounted(() => {
  if (activeIndex.value === 0) {
    onTransitionEnd()
  }
})

const reverse = computed(() => direction.value === 'backward')

const transitionName = computed(() =>
  vertical.value
    ? reverse.value
      ? 'c-carousel-slider-vertical-reverse'
      : 'c-carousel-slider-vertical'
    : reverse.value
    ? 'c-carousel-slider-reverse'
    : 'c-carousel-slider'
)

const onMouseEnter = () => {
  if (pauseOnHover.value) {
    timeLeft.value = Date.now() - timeLeft.value
    if (timeoutFlag.value) {
      clearTimeout(timeoutFlag.value)
    }
  }
}
const onMouseLeave = () => {
  if (pauseOnHover.value && interval.value) {
    timeoutFlag.value = setTimeout(toNext, interval.value - timeLeft.value)
  }
}
</script>
<template>
  <Transition
    :name="transitionName"
    @after-enter="onTransitionEnd"
  >
    <div
      v-if="activeIndex === currentIndex"
      class="c-carousel--slider-item"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <!-- 
        @slot The content
        @zh 内容 
      -->
      <slot />
    </div>
  </Transition>
</template>
