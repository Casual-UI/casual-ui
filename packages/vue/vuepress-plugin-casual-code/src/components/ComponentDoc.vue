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

const inputAndReturnColumns = [
  { title: '入参', field: 'input' },
  { title: '返回', field: 'return' },
]

const baseColumns = [
  { title: '名称', field: 'name', width: '100px' },
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

const items = computed(() =>
  [
    { name: 'props' },
    { name: 'slots' },
    { name: 'events' },
    { name: 'methods' },
  ]
    .filter(item => {
      const arr = frontmatter.value.docInfo[item.name]
      return arr && arr.length > 0
    })
    .map(({ name }) => ({
      name: name.toUpperCase().slice(0, 1) + name.slice(1),
    }))
)
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
        <c-list :items="frontmatter.docInfo?.props || []" size="xs" divider>
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
        <c-list :items="frontmatter.docInfo?.slots || []" size="xs" divider>
          <template #item="{ item }">
            <ItemDom :value="item">
              <div v-if="item.bindings" class="c-pl-md">
                <b>绑定值</b>
                <c-list :items="item.bindings" divider>
                  <template #item="{ item: bItem }">
                    <ItemDom :value="bItem"></ItemDom>
                  </template>
                </c-list>
              </div>
            </ItemDom>
          </template>
        </c-list>
      </template>

      <template #body-Events>
        <c-list :items="frontmatter.docInfo?.events || []" size="xs" divider>
          <template #item="{ item }">
            <ItemDom :value="item">
              <div v-if="item.tags" class="c-pl-md">
                <b>入参</b>
                <c-list :items="item.tags" divider>
                  <template #item="{ item: pItem }">
                    <ItemDom :value="pItem" :desc-wrap="false">
                      <template #after-name>
                        <div>
                          <TypeDom :val="pItem.type" />
                        </div>
                      </template>
                    </ItemDom>
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
