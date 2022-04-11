<script setup lang="ts">
import type { ParamType } from 'vue-docgen-api'

const parseUnion = (elements: any[]) =>
  elements.reduce((str, t, idx) => `${str}${idx > 0 ? ' | ' : ''}${t.name}`, '')

const parseArrayElements = (
  elements: ParamType[] | undefined,
  start = 'Array'
): string => {
  if (['string', 'number'].includes(start)) return start
  if (start === 'union') {
    return parseUnion(elements || [])
  }
  return `${start}<${(elements || []).reduce((str, { name, elements }) => {
    if (!elements) return `${str}${name}`
    if (elements.length > 1) {
      return `${str}${name}<${elements
        .map(ele => parseArrayElements(ele.elements || [], ele.name))
        .join(', ')}>`
    }
    return `${str}${name}`
  }, '')}>`
}

defineProps<{
  val: ParamType
}>()
</script>
<template>
  <div class="type-dom">
    <code
      v-if="
        ['string', 'boolean', 'number', 'object'].some(v => v === val?.name)
      "
      >{{ val.name }}</code
    >
    <template v-else-if="val?.name === 'union'">
      <template v-for="({ name }, i) in val.elements" :key="i">
        <code>
          {{ name }}
        </code>
        <template v-if="i < (val?.elements || []).length - 1"> | </template>
      </template>
    </template>
    <template v-else-if="val?.name === 'Array'">
      <code>
        {{ parseArrayElements(val.elements) }}
      </code>
    </template>
    <template v-else>
      <code>{{ val.name }}</code>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.type-dom {
  line-height: 18px;
}
</style>
