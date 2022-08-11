<script setup lang="ts">
import dayjs from 'dayjs'
import {
  CIcon,
  CDatePanel,
  useVModel,
  useInjectSize,
  CInput,
  CDropdown,
  useDefaultVModel,
  CYearPanel,
  CMonthPanel,
  CDatePanelHeader,
} from 'casual-ui-vue'
import { toRefs, watch, ref, computed } from 'vue'
import type { CSize } from 'casual-types'
import { matCalendarToday } from '@quasar/extras/material-icons'
import useUnit from './useUnit'
import useValidator from '../useValidator'

type Unit = 'year' | 'month' | 'day'

interface ODatePickerProps {
  /**
   * Selected date. Can be used with <code>v-model</code>.
   * @zh 当前选中值，用于<code>v-model</code>绑定
   */
  modelValue?: Date | null
  /**
   * Selected date after formatted. Can be used with <code>v-model:formattedValue</code>.
   * @zh 格式化后的值，用于<code>v-model:formattedValue</code>绑定
   */
  formattedValue?: string
  /**
   * The selected date range. Can be used with <code>v-model:dateRange</code>.
   * @zh 选择日期范围时的值，用于<code>v-model:dateRage</code>绑定
   */
  dateRange?: [Date | null, Date | null]
  /**
   * The selected date range after formatted. Can be used with <code>v-model:formattedDateRange</code>.
   * @zh 格式化后的日期段值，用于<code>v-model:formattedDateRange</code>绑定
   */
  formattedDateRange?: [string, string]
  /**
   * The format template. Refer to <a href="https://day.js.org/docs/en/displaying/format#list-of-all-available-formats">day.js</a> for more information.
   * @zh 格式化模板，详情参考 <a href="https://day.js.org/docs/en/display/format#list-of-all-available-formats" target="_blank">Dayjs</a>
   */
  format?: string
  /**
   * Custom format function.
   * @zh 自定义格式化函数
   */
  formatter?: (origin: Date | null, format: string) => string
  /**
   * The size of date picker.
   * @zh 尺寸
   */
  size?: CSize
  /**
   * Determine whether to fold dropdown when date selected or not.
   * @zh 是否在选择后自动收起下拉
   */
  hideOnSelect?: boolean

  /**
   * Determine whether is range select or not.
   * @zh 是否使用日期段选择
   */
  range?: boolean

  /**
   * The placeholder of date picker.
   * @zh 预设文本
   */
  placeholder?: string
  /**
   * Determine whether is disabled or not.
   * @zh 是否禁用
   */
  disabled?: boolean
  /**
   * The select unit. Can be used with <code>v-model:unit</code>.
   * @zh 选择单位，可用于<code>v-model:unit</code>绑定
   */
  unit?: Unit
}

const props = withDefaults(defineProps<ODatePickerProps>(), {
  format: 'YYYY-MM-DD',
  formatter: (d: Date | null, f: string) => {
    if (!d) return ''
    return dayjs(d).format(f)
  },
  size: undefined,
  hideOnSelect: true,
  formattedValue: '',
  dateRange: () => [null, null],
  formattedDateRange: () => ['', ''],
  modelValue: () => new Date(),
  range: false,
  placeholder: '',
  disabled: false,
  unit: 'day',
})

const innerFormatter = (d: Date | null) => props.formatter(d, props.format)

const { provideSize: size } = useInjectSize(props)

const { formattedValue, dateRange, formattedDateRange } = toRefs(props)

const emit = defineEmits<{
  /**
   * Emit when selected date change.
   * @zh 用于日期单选时，当前选中日期值发生变化时触发
   * @arg {Date | null} newValue_zh - 新的选中日期值
   * @arg {Date | null} newValue - new date
   */
  (e: 'update:modelValue', newValue: Date | null): void
  /**
   * Emit when selected date formatted value change.
   * @zh 用于日期单选时，格式化后的值发生变化时触发
   * @arg {string} newFormattedValue_zh - 新的格式化后的值
   * @arg {string} newFormattedValue - new formatted value
   */
  (e: 'update:formattedValue', newFormattedValue: string): void

  /**
   * Emit when selected date range change.
   * @zh 日期段绑定值变化时触发
   * @arg {[Date | null, Date | null]} newDateRange_zh - 新的日期段绑定值
   * @arg {[Date | null, Date | null]} newDateRange - new date range
   */
  (e: 'update:dateRange', newDateRange: [Date | null, Date | null]): void
  /**
   * Emit when selected date range formatted value change.
   * @zh 日期段格式化之后的值变化时触发
   * @arg {[string, string]} newFormattedDateRange_zh - 新的日期段格式化之后的值
   * @arg {[string, string]} newFormattedDateRange - new formatted date range
   */
  (
    e: 'update:formattedDateRange',
    newFormattedDateRange: [string, string]
  ): void
  /**
   * Emit when select unit change.
   * @zh 单位变化时触发
   * @arg {Unit} newUnit - new unit
   * @arg {Unit} newUnit_zh - 新的单位
   */
  (e: 'update:unit', newUnit: Unit): void
}>()

const { validate } = useValidator()

const innerUnit = useUnit(emit, props)

const innerValue = useDefaultVModel(props, emit)

const { innerValue: innerFormattedValue } = useVModel(
  formattedValue,
  innerFormatter(innerValue.value),
  newValue => {
    emit('update:formattedValue', newValue)
  }
)

const { innerValue: innerRange } = useVModel<[Date | null, Date | null]>(
  dateRange,
  dateRange.value,
  newRange => {
    emit('update:dateRange', newRange)
  }
)

const { innerValue: innerFormattedRangeValue } = useVModel(
  formattedDateRange,
  formattedDateRange.value,
  newFormattedRange => {
    emit('update:formattedDateRange', newFormattedRange)
  }
)

// 侦听单选值更改后，改变格式化后的值
watch(innerValue, newDate => {
  innerFormattedValue.value = innerFormatter(newDate)
})

watch(innerRange, newRange => {
  const [start, end] = newRange
  innerFormattedRangeValue.value = [innerFormatter(start), innerFormatter(end)]
})

const show = ref(false)

// 输入框里展示的值
const displayValue = computed(() => {
  if (props.range) {
    const [start, end] = innerFormattedRangeValue.value
    if (!start && !end) return ''
    return `${start} - ${end}`
  }
  return innerFormattedValue.value
})

const year = ref(innerValue.value?.getFullYear() || new Date().getFullYear())
const month = ref(innerValue.value?.getMonth() || new Date().getMonth())
const yearRange = ref<[number, number]>([year.value, year.value + 11])
const transitionName = ref('c-date-panel')
const initialUnit = innerUnit.value
const onDateSet = () => {
  if (props.hideOnSelect) {
    show.value = false
  }
}
const onUpdateUnit = (newUnit: Unit) => {
  if (newUnit === 'day') {
    transitionName.value = 'c-date-panel'
  } else if (newUnit === 'year') {
    transitionName.value = 'c-date-panel-reverse'
  } else {
    if (innerUnit.value === 'day') {
      // day to month
      transitionName.value = 'c-date-panel-reverse'
    } else {
      // year to month
      transitionName.value = 'c-date-panel'
    }
  }
  innerUnit.value = newUnit
}
const onMonthSet = (newDate: Date | null) => {
  month.value = newDate?.getMonth() || 0
  if (initialUnit === 'day') {
    onUpdateUnit('day')
    return
  }
  onDateSet()
}

const onYearSet = (newDate: Date | null) => {
  year.value = newDate?.getFullYear() || 0
  if (initialUnit === 'year') {
    onDateSet()
    return
  }
  onUpdateUnit('month')
}
const datePickerContainer = ref<HTMLDivElement | null>(null)

const onModelValueChange = (newValue: Date | null) => {
  if (!newValue) {
    validate(innerValue)
  }
}
</script>
<template>
  <div
    ref="datePickerContainer"
    :class="[
      'c-date-picker',
      `c-font-${size}`,
      `c-date-picker--size-${size}`,
      { 'c-date-picker--disabled': disabled },
    ]"
  >
    <c-dropdown
      v-model="show"
      :width-within-parent="false"
      :disabled="disabled"
      @update:model-value="onModelValueChange"
    >
      <c-input
        :model-value="displayValue"
        readonly
        :placeholder="placeholder"
        :disabled="disabled"
        clearable
        validate-trigger="manual"
        @clear="
          () => {
            innerValue = null
            innerRange = [null, null]
            validate(innerValue)
          }
        "
      >
        <template #suffix>
          <c-icon :content="matCalendarToday" />
        </template>
      </c-input>
      <template #drop-content>
        <c-date-panel-header
          v-model:year="year"
          v-model:month="month"
          v-model:yearRange="yearRange"
          :unit="innerUnit"
          :unit-switchable="!range"
          @update:unit="onUpdateUnit"
        />
        <div
          class="c-date-picker--panel-wrapper"
          :class="[`c-px-${size}`, `c-pb-${size}`]"
        >
          <transition-group :name="transitionName">
            <c-date-panel
              v-if="innerUnit === 'day'"
              key="day"
              v-model="innerValue"
              v-model:dateRange="innerRange"
              :formatted-date-range="innerFormattedRangeValue"
              :range="range"
              :year="year"
              :month="month"
              @update:model-value="onDateSet"
            />
            <c-month-panel
              v-else-if="innerUnit === 'month'"
              key="month"
              v-model="innerValue"
              :year="year"
              @update:model-value="onMonthSet"
            />
            <c-year-panel
              v-else-if="innerUnit === 'year'"
              key="year"
              v-model="innerValue"
              :year-range="yearRange"
              @update:model-value="onYearSet"
            />
          </transition-group>
        </div>
      </template>
    </c-dropdown>
  </div>
</template>
