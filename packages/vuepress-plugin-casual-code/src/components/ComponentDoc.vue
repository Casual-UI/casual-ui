<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { computed, Ref } from 'vue'
import { ComponentDoc, ParamType } from 'vue-docgen-api'

interface SlotDesc {
  name: string
  description: string
}

type DocType = 'props' | 'slots' | 'events' | 'methods'

interface CustomFrontmatter {
  docInfo: ComponentDoc
  customSlots: SlotDesc[]
  eventsNameWidth?: number
  propDefaultValueWidth?: number
}

const frontmatter = usePageFrontmatter() as unknown as Ref<CustomFrontmatter>

const { eventsNameWidth = '120px', propDefaultValueWidth = '100px' } =
  frontmatter.value

const inputAndReturnColumns = [
  { title: '入参', field: 'input' },
  { title: '返回', field: 'return' },
]

const baseColumns = [
  { title: '名称', field: 'name', width: '100px' },
  { title: '解释', field: 'description' },
]

const slotsColumns = [...baseColumns, { title: '绑定值', field: 'bindings' }]

const propsColumns = [
  ...baseColumns,
  { title: '类型', field: 'type' },
  { title: '是否必填', field: 'required', width: '80px' },
  { title: '默认值', field: 'defaultValue', width: propDefaultValueWidth },
]

const eventsColumns = [
  { title: '名称', field: 'name', width: eventsNameWidth },
  { title: '解释', field: 'description' },
]

const methodsColumns = [...baseColumns, ...inputAndReturnColumns]

withDefaults(
  defineProps<{
    type: DocType
  }>(),
  {
    type: 'props',
  }
)

const parseUnion = (elements: any[]) =>
  elements.reduce((str, t, idx) => `${str}${idx > 0 ? ' | ' : ''}${t.name}`, '')

const parseArrayElements = (elements: ParamType[], start = 'Array'): string => {
  if (['string', 'number'].includes(start)) return start
  if (start === 'union') {
    return parseUnion(elements)
  }
  return `${start}<${elements.reduce((str, { name, elements }) => {
    if (!elements) return `${str}${name}`
    if (elements.length > 1) {
      return `${str}${name}<${elements
        .map(ele => parseArrayElements(ele.elements || [], ele.name))
        .join(', ')}>`
    }
    return `${str}${name}`
  }, '')}>`
}

const slotsData = computed(() => {
  const { customSlots = [], docInfo = { slots: [] } } = frontmatter.value
  const { slots = [] } = docInfo
  return [...customSlots, ...slots].filter(s => s.description)
})

const getBindingItems = (val: any) => {
  if (!Array.isArray(val)) return []
  return val.map(bindingItem => ({ label: bindingItem.name, ...bindingItem }))
}
</script>

<template>
  <c-table
    v-if="type === 'props'"
    class="doc-table"
    :data="frontmatter.docInfo?.props || []"
    :columns="propsColumns"
    row-key="name"
  >
    <template #td-description="{ val }">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="val" />
    </template>
    <template #td-type="{ val }">
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
          <template v-if="i < val.elements.length - 1"> | </template>
        </template>
      </template>
      <template v-else-if="val?.name === 'Array'">
        <code>
          {{ parseArrayElements(val.elements) }}
        </code>
      </template>
    </template>
    <template #td-required="{ val }">
      <code>{{ val ? '是' : '否' }}</code>
    </template>
    <template #td-defaultValue="{ val }">
      <code>{{ val ? val.value : '' }}</code>
    </template>
  </c-table>
  <c-table
    v-if="type === 'slots'"
    class="doc-table"
    :data="slotsData"
    :columns="slotsColumns"
    row-key="name"
  >
    <template #td-description="{ val }">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="val" />
    </template>
    <template #td-bindings="{ val }">
      <c-list :items="getBindingItems(val)" size="xs">
        <template #item="{ item }">
          <code>{{ item.label }}: {{ item.type?.name }}</code
          >：
          <span>{{ item.description }}</span>
        </template>
      </c-list>
    </template>
  </c-table>
  <c-table
    v-if="type === 'events'"
    class="doc-table"
    :data="frontmatter.docInfo?.events || []"
    :columns="eventsColumns"
    row-key="name"
  >
    <template #td-description="{ val }">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="val"></div>
    </template>
  </c-table>
  <c-table
    v-if="type === 'methods'"
    class="doc-table"
    :data="frontmatter.docInfo?.methods || []"
    :columns="methodsColumns"
    row-key="name"
  >
  </c-table>
</template>
