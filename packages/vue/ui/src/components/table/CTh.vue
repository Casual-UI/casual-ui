<script lang="ts" setup>
interface OTdProps {
  width?: string
}

withDefaults(defineProps<OTdProps>(), {
  width: 'auto',
})
</script>
<template>
  <th class="c-table--th" :style="{ width }">
    <slot />
  </th>
</template>
