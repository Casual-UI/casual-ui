<script
  lang="ts"
  setup
>
import { inject, onMounted } from 'vue'
import type { Ref } from 'vue'
import {
  toNextKey,
  activeIndexKey,
  directionKey,
  intervalKey,
  slidesKey,
  timeoutKey,
  verticalKey,
} from './CCarousel.vue'
import type { Direction } from './CCarousel.vue'
import { computed } from '@vue/reactivity'

const slides = inject<Ref<number[]>>(slidesKey)
const activeIndex = inject<Ref<number>>(activeIndexKey)
const direction = inject<Ref<Direction>>(directionKey)
const interval = inject<Ref<number>>(intervalKey)
const timeoutFlag = inject<Ref<any>>(timeoutKey)
const vertical = inject<Ref<boolean>>(verticalKey)
const toNext = inject<() => void>(toNextKey)

const currentIndex = slides?.value.length || 0
slides?.value.push(currentIndex)

const onTransitionEnd = () => {
  if (interval?.value && toNext) {
    if (timeoutFlag?.value) {
      clearTimeout(timeoutFlag.value)
    }
    if (timeoutFlag) {
      timeoutFlag.value = setTimeout(toNext, interval.value)
    }
  }
}

onMounted(() => {
  if (activeIndex?.value === 0) {
    onTransitionEnd()
  }
})

const reverse = computed(() => direction?.value === 'backward')

const transitionName = computed(() =>
  vertical?.value
    ? reverse.value
      ? 'c-carousel-slider-vertical-reverse'
      : 'c-carousel-slider-vertical'
    : reverse.value
    ? 'c-carousel-slider-reverse'
    : 'c-carousel-slider'
)
</script>
<template>
  <Transition
    :name="transitionName"
    @after-enter="onTransitionEnd"
  >
    <div
      v-if="activeIndex === currentIndex"
      class="c-carousel--slider-item"
    >
      <!-- 
        @slot The content
        @zh 内容 
      -->
      <slot />
    </div>
  </Transition>
</template>
