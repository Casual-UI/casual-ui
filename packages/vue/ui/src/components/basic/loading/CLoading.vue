<script
  setup
  lang="ts"
>
interface LoadingProps {
  /**
   * The thickness
   * @zh 厚度
   */
  thickness?: number
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
    width="1em"
    height="1em"
  >
    <circle
      class="c-loading--path"
      cx="50"
      cy="50"
      r="20"
      fill="none"
      stroke="currentColor"
      :stroke-width="thickness"
      stroke-miterlimit="10"
    ></circle>
  </svg>
</template>
