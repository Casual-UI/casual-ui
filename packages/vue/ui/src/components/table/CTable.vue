<script
  setup
  lang="ts"
>
import { provide } from 'vue'
import CTr from './CTr.vue'
import CTd from './CTd.vue'
import CTh from './CTh.vue'

interface TableColumn {
  title: string
  field: string
  width?: string
}
interface TableProps {
  /**
   * Determine the table has striped style or not.
   * @zh 是否为条纹表格
   */
  striped?: boolean
  /**
   * The columns config.
   * @zh 表格列配置
   */
  columns?: TableColumn[]
  /**
   * The table data.
   * @zh 表格数据
   */
  data?: Array<Record<string, string | number>>
  /**
   * The unique key of row.
   * @zh 行数据唯一键
   */
  rowKey?: string
}

const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  data: () => [],
  rowKey: 'id',
  striped: false,
})

provide('columns', props.columns)
</script>
<template>
  <div
    class="c-table"
    :class="[{ 'c-table--striped': striped }]"
  >
    <table class="c-table--table">
      <colgroup>
        <col
          v-for="{ field } in columns"
          :key="field"
        />
      </colgroup>
      <thead>
        <c-tr>
          <c-th
            v-for="{ field, title, width } in columns"
            :key="field"
            :width="width"
          >
            <slot
              :name="`th-${field}`"
              v-bind="{ field, title }"
            >
              {{ title }}
            </slot>
          </c-th>
        </c-tr>
      </thead>
      <tbody>
        <c-tr
          v-for="row in data"
          :key="row[rowKey]"
        >
          <c-td
            v-for="({ field, width }, idx) in columns"
            :key="field"
          >
            <!-- 
              @slot 
              @zh 自定义单元格
              @name td-[field] - Customize the field column content.
              @name_zh 自定义对应<code>field</code>单元格渲染
                @binding {any} row - row data
                @row_zh 当前行数据
                @binding {any} val - The cell value 
                @val_zh 当前单元格数据
                @binding {number} idx - The row index.
                @idx_zh 当前单元格所在行下标
                @binding {string} width - The column width.
                @width_zh 当前单元格所在列宽度
            -->
            <slot
              :name="`td-${field}`"
              v-bind="{ val: row[field], idx, row, width }"
            >
              {{ row[field] }}
            </slot>
          </c-td>
        </c-tr>
      </tbody>
    </table>
    <div
      v-if="data.length === 0"
      class="c-table--no-data"
    >
      No Data
    </div>
  </div>
</template>
