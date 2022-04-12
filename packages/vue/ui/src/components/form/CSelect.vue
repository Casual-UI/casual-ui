<script setup lang="ts">
import {
  CTag,
  CList,
  useInjectSize,
  useVModel,
  CIcon,
  CInput,
  CDropdown,
} from 'casual-ui-vue'
import { matKeyboardArrowDown } from '@quasar/extras/material-icons'
import { watch, nextTick, computed, onMounted, ref, toRefs } from 'vue'

interface OOption {
  label: string
  value: string | number
  [key: string | number | symbol]: any
}

/**
 * 选择器值类型
 */
type CSelectModelValue = string | number | Array<string | number>

interface CSelectProps {
  /**
   * 预设文本
   */
  placeholder?: string
  /**
   * 尺寸
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * 选中值，用于<code>v-model</code>绑定
   */
  modelValue: CSelectModelValue
  /**
   * 选项
   */
  options?: OOption[]
  /**
   * 是否支持多选
   */
  multiple?: boolean
  /**
   * 内容是否可清除
   */
  clearable?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
}

const emit = defineEmits<{
  /**
   * 值变更触发，可用于<code>v-model</code>绑定
   * @arg {string | number | Array<string | number>} newValue - 新的绑定值
   */
  (e: 'update:modelValue', v: CSelectModelValue): void
}>()

const props = withDefaults(defineProps<CSelectProps>(), {
  placeholder: '',
  size: undefined,
  options: () => [],
  multiple: false,
  disabled: false,
})

const selectDom = ref<HTMLDivElement | null>(null)
const tagsContainer = ref<HTMLDivElement | null>(null)
const initialSelectDomHeight = ref(0)
const selectDomHeight = ref(-1)

const selectDomStyle = computed(() => {
  if (selectDomHeight.value < 1) return {}
  return {
    height: `${selectDomHeight.value}px`,
  }
})

onMounted(() => {
  initialSelectDomHeight.value = selectDom.value?.clientHeight || -1
})

const { provideSize } = useInjectSize(props)

const { modelValue, multiple } = toRefs(props)

const focused = ref(false)

const { innerValue } = useVModel<CSelectModelValue>(
  modelValue,
  modelValue.value,
  v => emit('update:modelValue', v)
)

const inputValue = ref(modelValue.value as string)

watch(
  innerValue,
  newInnerValue => {
    if (multiple.value) {
      nextTick(() => {
        const newHeight = tagsContainer.value?.clientHeight || -1
        if (newHeight > initialSelectDomHeight.value) {
          selectDomHeight.value = newHeight
          return
        }
        selectDomHeight.value = initialSelectDomHeight.value
      })

      return
    }
    inputValue.value =
      props.options.find(item => item.value === newInnerValue)?.label || ''
  },
  {
    deep: true,
  }
)

const selectedMultipleOptions = computed(() => {
  if (!multiple.value) return []
  return props.options.filter(op =>
    (innerValue.value as Array<any>).some(v => v === op.value)
  )
})

const realPlaceholder = computed(() => {
  if (!multiple.value) return props.placeholder
  return (innerValue.value as any[]).length > 0 ? '' : props.placeholder
})

const onItemClick = (item: any) => {
  if (multiple.value) {
    const selectedValues = innerValue.value as Array<any>
    const idx = selectedValues.findIndex(v => v === item.value)
    if (idx === -1) {
      selectedValues.push(item.value)
    } else {
      selectedValues.splice(idx, 1)
    }
    return
  }
  innerValue.value = item.value
  focused.value = false
}

const isItemActive = computed(() => (item: any) => {
  if (multiple.value) {
    return (innerValue.value as Array<any>).some(v => v === item.value)
  }
  return item.value === innerValue.value
})

const onClear = () => {
  if (multiple.value) {
    innerValue.value = []
    return
  }
  innerValue.value = ''
}

const onSelectClick = () => {
  if (props.disabled) return
  if (multiple.value) {
    focused.value = !focused.value
  }
}

const onArrowClick = () => {
  if (props.disabled) return
  if (!multiple.value) {
    focused.value = !focused.value
  }
}
</script>
<template>
  <c-dropdown v-model="focused" :disabled="disabled">
    <div
      ref="selectDom"
      :class="[
        'c-select',
        { 'c-select--focused': focused },
        `c-font-${provideSize}`,
        { 'c-select--disabled': disabled },
      ]"
      :style="selectDomStyle"
    >
      <div class="c-select--input-wrapper" @click="onSelectClick">
        <div
          v-if="multiple"
          :class="[
            'c-select--placeholder',
            `c-h-${provideSize}`,
            `c-px-${provideSize}`,
          ]"
        >
          {{ realPlaceholder }}
        </div>
        <c-input
          v-else
          v-model="inputValue"
          v-model:focused="focused"
          custom-color
          :suffix-divider="false"
          :placeholder="realPlaceholder"
          :auto-blur="false"
          :clearable="clearable"
          readonly
          :disabled="disabled"
          @clear="onClear"
        />
        <div
          :class="[
            'c-select--arrow',
            `c-mr-${provideSize}`,
            { 'c-select--arrow-show-options': focused },
          ]"
          @click.stop="onArrowClick"
        >
          <c-icon :content="matKeyboardArrowDown" />
        </div>
        <div
          v-if="multiple"
          ref="tagsContainer"
          :class="['c-select--multiple-tags', `c-px-sm`]"
        >
          <div v-for="{ label, value } in selectedMultipleOptions" :key="value">
            <c-tag
              :label="label"
              size="xs"
              rounded
              closeable
              @close="onItemClick({ label, value })"
            />
          </div>
        </div>
      </div>
    </div>
    <template #drop-content>
      <div :class="[`c-py-${provideSize}`]">
        <c-list
          :items="options"
          :active-fn="isItemActive"
          item-key="value"
          clickable
          @item-click="onItemClick"
        />
      </div>
    </template>
  </c-dropdown>
</template>
