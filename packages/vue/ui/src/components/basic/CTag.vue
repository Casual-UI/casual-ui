<script setup lang="ts">
import { CSize, CTheme } from 'casual-types'
import { CIcon, useInjectSize, useInjectTheme } from 'casual-ui-vue'
import { matClose } from '@quasar/extras/material-icons'

interface CTagProps {
  /**
   * 标签内文字
   */
  label?: string
  /**
   * 主题
   */
  theme?: CTheme
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 是否为圆角
   */
  rounded?: boolean
  /**
   * 是否可关闭，设置为<code>true</code>会展示一个关闭图标
   */
  closeable?: boolean
}

const props = withDefaults(defineProps<CTagProps>(), {
  label: '',
  theme: undefined,
  size: undefined,
  rounded: false,
  closeable: false,
})

defineEmits<{
  /**
   * 点击关闭图标触发
   */
  (e: 'close'): void
}>()

const { provideTheme } = useInjectTheme(props)

const { provideSize: size } = useInjectSize(props)
</script>
<template>
  <div
    :class="[
      'c-tag',
      `c-tag--theme-${provideTheme}`,
      `c-h-${size}`,
      `c-font-${size}`,
      `c-px-${size}`,
      { [`c-rounded-${size}`]: rounded },
    ]"
  >
    <div class="c-tag--prefix">
      <!-- @slot 自定义前置内容 -->
      <slot name="prefix" />
    </div>
    <div class="c-tag--label">
      {{ label }}
    </div>
    <div
      v-if="closeable"
      :class="['c-tag--close-icon', `c-ml-xs`]"
      @click.stop="$emit('close')"
    >
      <c-icon :content="matClose" />
    </div>
  </div>
</template>
