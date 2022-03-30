<script setup lang="ts">
interface CTdProps {
  width?: string
}

withDefaults(defineProps<CTdProps>(), {
  width: 'auto',
})
</script>
<template>
  <td class="c-table--td" :style="{ width }">
    <slot />
  </td>
</template>
