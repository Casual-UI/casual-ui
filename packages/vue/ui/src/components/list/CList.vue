<script
  lang="ts"
  setup
>
import type { CSize } from 'casual-types'
import { CItem, useInjectSize } from 'casual-ui-vue'
interface OItemProps {
  /**
   * The items config.
   * @zh 列表项
   */
  items?: any[]
  /**
   * The unique key of item.
   * @zh 列表项的唯一键值
   */
  itemKey?: string
  /**
   * Determine whether the list items are clickable or not.
   * @zh 是否可点击
   */
  clickable?: boolean
  /**
   * The size of list.
   * @zh 尺寸
   */
  size?: CSize
  /**
   * The function to determine whether the item is in active or not.
   * @zh 计算列表项是否处于激活态的函数
   */
  activeFn?: (item: any) => boolean
  /**
   * Determine whether to show divider or not.
   * @zh 是否展示分割线
   */
  divider?: boolean
}

const props = withDefaults(defineProps<OItemProps>(), {
  items: () => [],
  itemKey: 'id',
  clickable: false,
  size: undefined,
  activeFn: () => false,
  divider: false,
})

defineEmits<{
  /**
   * Emit when the the item is clicked. Only working when the clickable is true.
   * @zh 列表项点击时触发，仅在clickable设置为true时可用
   */
  (e: 'item-click', item: any): void
}>()

const { provideSize: size } = useInjectSize(props)
</script>
<template>
  <div :class="['c-list', { 'c-list--with-divider': divider }]">
    <!-- 
      @slot Customize the content for no data.
      @zh 没有数据时自定义内容 -->
    <slot
      v-if="items.length === 0"
      name="empty"
    >
      <div :class="['c-list--empty', `c-px-${size}`]">No Data</div>
    </slot>
    <template v-else>
      <c-item
        v-for="item in items"
        :key="item[itemKey]"
        :clickable="clickable"
        :active="activeFn(item)"
        @click="$emit('item-click', item)"
      >
        <!-- 
          @slot Customize the item content. 
          @zh 自定义列表项 
          @binding {any} item The item config.
          @item_zh 当前列表项数据
          @binding {boolean} isActive Determine whether the item is in active status or not.
          @isActive_zh 当前项是否处于激活态
          @binding {boolean} clickable Determine whether the item is clickable or not.
          @clickable_zh 当前项是否可点击
        -->
        <slot
          name="item"
          v-bind="{ item, clickable, isActive: activeFn(item) }"
        >
          {{ item.label }}
        </slot>
      </c-item>
    </template>
  </div>
</template>
