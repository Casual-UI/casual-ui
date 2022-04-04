<script setup lang="ts">
import { CSize } from 'casual-types'
import { useInjectSize } from 'casual-ui-vue'
import { watch, onMounted, ref, nextTick } from 'vue'

interface CItem {
  name: string
  title?: string
  icon?: string
}

interface CTabProps {
  /**
   * 当前激活的tab
   */
  modelValue: string
  /**
   * 标签项
   */
  items: CItem[]
  /**
   * 尺寸
   */
  size?: CSize
}

const props = withDefaults(defineProps<CTabProps>(), {
  items: () => [],
  size: undefined,
})

const emit = defineEmits<{
  /**
   * 当前激活项发生变化时触发
   */
  (e: 'update:modelValue', newModelValue: string): void
}>()

const { provideSize: realSize } = useInjectSize(props)

const isForward = ref(true)

const header = ref<HTMLDivElement | null>(null)

const updateModelValue = (newModelValue: string) => {
  const currentIdx = props.items.findIndex(
    item => item.name === props.modelValue
  )
  const newIdx = props.items.findIndex(item => item.name === newModelValue)
  if (newIdx < currentIdx) {
    isForward.value = true
  } else {
    isForward.value = false
  }
  emit('update:modelValue', newModelValue)
}

const activeBarLeft = ref('0')
const activeBarWidth = ref('0')

const setActiveBarStatus = () => {
  const activeItem = header.value?.querySelector<HTMLDivElement>(
    '.c-tabs--header-item-active'
  )
  if (!activeItem) return
  activeBarLeft.value = `${activeItem.offsetLeft}px`
  activeBarWidth.value = `${activeItem.offsetWidth}px`
}

onMounted(() => {
  setActiveBarStatus()
})

watch(
  () => props.modelValue,
  () => {
    nextTick(setActiveBarStatus)
  }
)
</script>
<template>
  <div class="c-tabs">
    <div ref="header" class="c-tabs--header c-row c-items-center">
      <div
        v-for="tabItem in items"
        :key="tabItem.name"
        :class="[
          'c-tabs--header-item',
          `c-h-${realSize}`,
          `c-font-${realSize}`,
          `c-px-${realSize}`,
          {
            'c-tabs--header-item-active': tabItem.name === modelValue,
          },
        ]"
        @click="updateModelValue(tabItem.name)"
      >
        <slot :name="`header-${tabItem.name}`">
          <span>
            {{ tabItem.title ? tabItem.title : tabItem.name }}
          </span>
          <span v-if="tabItem.icon">
            {{ tabItem.icon }}
          </span>
        </slot>
      </div>
      <div
        class="c-tabs--header-active-bar"
        :style="{
          left: activeBarLeft,
          width: activeBarWidth,
        }"
      ></div>
    </div>
    <div class="c-tabs--body">
      <transition-group
        :name="isForward ? 'c-date-panel' : 'c-date-panel-reverse'"
      >
        <div
          :key="modelValue"
          :class="['c-tabs--body-item', `c-pa-${realSize}`]"
        >
          <slot :name="`body-${modelValue}`" />
        </div>
      </transition-group>
    </div>
  </div>
</template>
