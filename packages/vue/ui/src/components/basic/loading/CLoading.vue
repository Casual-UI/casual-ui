<script setup lang="ts">
interface LoadingProps {
  /**
   * 尺寸
   */
  size?: string
  /**
   * 厚度
   */
  thickness?: number
  /**
   * 颜色
   */
  color?: string
}

withDefaults(defineProps<LoadingProps>(), {
  size: '1em',
  thickness: 5,
  color: 'currentColor',
})
</script>
<template>
  <svg
    class="c-loading c-loading--mat"
    viewBox="25 25 50 50"
    :width="size"
    :height="size"
  >
    <circle
      class="c-loading--path"
      cx="50"
      cy="50"
      r="20"
      fill="none"
      :stroke="color"
      :stroke-width="thickness"
      stroke-miterlimit="10"
    ></circle>
  </svg>
</template>
