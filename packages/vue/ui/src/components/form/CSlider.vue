<script
  setup
  lang="ts"
>
import { useBEM } from '../../usable/useBEM'
import { ref } from 'vue'
import useInjectSize from '../../usable/useInjectSize'
import { useDefaultVModel } from '../../usable/useVModel'

interface Props {
  /**
   * The current value.
   * @zh 当前值
   */
  modelValue?: number
  /**
   * The min value.
   * @zh 最小值
   */
  min?: number
  /**
   * The max value.
   * @zh 最大值
   */
  max?: number
  /**
   * The step.
   * @zh 步进单位
   */
  step?: number
  /**
   * The size
   * @zh 尺寸
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * The theme color.
   * @zh 主题色
   */
  theme?: 'primary' | 'secondary' | 'warning' | 'negative'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 20,
  min: 0,
  max: 100,
  step: 1,
  theme: 'primary',
  size: undefined,
})

const emit = defineEmits<{
  /**
   * Emit when the current value change.
   * @zh 当前值发生变化时触发
   */
  (e: 'update:modelValue', newValue: number): void
}>()

const innerValue = useDefaultVModel(props, emit)

const { provideSize } = useInjectSize(props)

const left = ref('0')

computedLeft()

function computedLeft() {
  left.value = `${(100 * (innerValue.value - props.min)) / props.max}%`
}
</script>
<template>
  <div
    :class="
      useBEM('slider', {
        [theme]: true,
        [provideSize]: true,
      })
    "
  >
    <div class="c-slider--track"></div>
    <div>
      <c-tooltip
        :content="innerValue"
        class="c-slider--thumb"
        :style="{
          left,
        }"
      >
      </c-tooltip>
    </div>
  </div>
</template>
