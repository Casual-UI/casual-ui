<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client'
import { computed, ref, Ref } from 'vue'
import { ComponentDoc } from 'vue-docgen-api'
import TypeDom from './TypeDom.vue'
import ItemDom from './ItemDom.vue'

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

const { eventsNameWidth = '120px' } = frontmatter.value

const inputAndReturnColumns = [
  { title: '入参', field: 'input' },
  { title: '返回', field: 'return' },
]

const baseColumns = [
  { title: '名称', field: 'name', width: '100px' },
  { title: '解释', field: 'description' },
]

const slotsColumns = [...baseColumns, { title: '绑定值', field: 'bindings' }]

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

const slotsData = computed(() => {
  const { customSlots = [], docInfo = { slots: [] } } = frontmatter.value
  const { slots = [] } = docInfo
  return [...customSlots, ...slots].filter(s => s.description)
})

const getBindingItems = (val: any) => {
  if (!Array.isArray(val)) return []
  return val.map(bindingItem => ({ label: bindingItem.name, ...bindingItem }))
}

const items = [
  { name: 'Props' },
  { name: 'Slots' },
  { name: 'Events' },
  { name: 'Methods' },
]
const activeTab = ref('Props')
</script>

<template>
  <div class="doc-api-container">
    <c-tabs
      v-model="activeTab"
      :items="items"
      :body-style="{ maxHeight: '30vh', overflow: 'auto' }"
    >
      <template #body-Props>
        <c-list :items="frontmatter.docInfo?.props || []" size="xs">
          <template #item="{ item }">
            <ItemDom :value="item">
              <template #after-name>
                <div>
                  <TypeDom :val="item.type" />
                </div>
                <div>
                  <c-tag
                    v-if="item.required"
                    rounded
                    size="xs"
                    theme="secondary"
                    label="必填"
                  />
                  <span v-else>
                    默认值：<code>{{ item.defaultValue?.value }}</code>
                  </span>
                </div>
              </template>
            </ItemDom>
          </template>
        </c-list>
      </template>

      <template #body-Slots>
        <c-list :items="frontmatter.docInfo?.slots || []" size="xs">
          <template #item="{ item }">
            <ItemDom :value="item">
              <div v-if="item.bindings" class="c-pl-md">
                <b>绑定值</b>
                <c-list :items="item.bindings">
                  <template #item="{ item: bItem }">
                    <ItemDom :value="bItem"></ItemDom>
                  </template>
                </c-list>
              </div>
            </ItemDom>
          </template>
        </c-list>
      </template>
    </c-tabs>
  </div>
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
<style scoped lang="scss">
.doc-api-container {
  background-color: var(--casual-table-bg);
  p {
    line-height: 2em;
  }
}
</style>
