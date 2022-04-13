<script lang="ts" setup>
import type { CSize } from 'casual-types'
import { CItem, useInjectSize } from 'casual-ui-vue'
interface OItemProps {
  /**
   * 列表项
   */
  items?: any[]
  /**
   * 列表项的唯一键值
   */
  itemKey?: string
  /**
   * 是否可点击
   */
  clickable?: boolean
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 计算列表项是否处于激活态的函数
   */
  activeFn?: (item: any) => boolean
  /**
   * 是否展示分割线
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
   * 列表项点击时触发
   */
  (e: 'item-click', item: any): void
}>()

const { provideSize: size } = useInjectSize(props)
</script>
<template>
  <div :class="['c-list', { 'c-list--with-divider': divider }]">
    <!-- @slot 没有数据时自定义内容 -->
    <slot v-if="items.length === 0" name="empty">
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
          @slot 自定义列表项 
          @binding {any} item 当前列表项数据
        -->
        <slot name="item" v-bind="{ item }">
          {{ item.label }}
        </slot>
      </c-item>
    </template>
  </div>
</template>
