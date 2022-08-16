<script
  lang="ts"
  setup
>
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
  pauseFunctionsKey,
  resumeFunctionsKey,
  slidingKey,
  hoveringKey,
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
const pauses = inject<Array<() => void>>(pauseFunctionsKey, [])
const resumes = inject<Array<() => void>>(resumeFunctionsKey, [])
const sliding = inject(slidingKey, ref(false))
const hovering = inject(hoveringKey, ref(false))

let remain = interval.value
let start = Date.now()

const currentIndex = slides?.value.length || 0
slides?.value.push(currentIndex)

const onTransitionEnd = () => {
  remain = interval.value
  if (interval.value && toNext && !hovering.value) {
    if (timeoutFlag.value) {
      clearTimeout(timeoutFlag.value)
    }
    start = Date.now()
    timeoutFlag.value = setTimeout(toNext, interval.value)
  }
  sliding.value = false
}

const pause = () => {
  if (currentIndex !== activeIndex.value) return
  if (timeoutFlag.value) {
    clearTimeout(timeoutFlag.value)
    remain = interval.value - (Date.now() - start)
  }
}

const resume = () => {
  if (currentIndex !== activeIndex.value) return
  if (remain < 4) return
  if (remain === interval.value) {
    start = Date.now()
  }
  timeoutFlag.value = setTimeout(toNext, remain)
}

pauses.push(pause)
resumes.push(resume)

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
const onBeforeEnter = () => {
  sliding.value = true
}
</script>
<template>
  <Transition
    :name="transitionName"
    @before-enter="onBeforeEnter"
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
