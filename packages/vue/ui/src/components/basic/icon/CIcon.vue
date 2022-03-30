<script setup lang="ts">
import { computed } from 'vue'
interface CIconProps {
  /**
   * svg内容，格式为<code>d[@@style][@@transform]|viewBox</code>
   */
  content: string
}

const props = defineProps<CIconProps>()

defineEmits<{
  /**
   * 点击事件触发
   */
  (e: 'click'): void
}>()

const svgInfo = computed(() => {
  const [def, viewBox = '0 0 24 24'] = props.content.split('|')
  const paths = def.split('&&').map(path => {
    const [d, style, transform] = path.split('@@')
    return {
      d,
      style,
      transform,
    }
  })
  return {
    viewBox,
    paths,
  }
})
</script>

<template>
  <span class="c-icon" @click="$emit('click')">
    <svg :viewBox="svgInfo.viewBox">
      <path
        v-for="{ d, style, transform } in svgInfo.paths"
        :key="d"
        v-bind="{
          d,
          style,
          transform,
        }"
      ></path>
    </svg>
  </span>
</template>
