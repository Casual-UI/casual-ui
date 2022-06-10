<script
  lang="ts"
  setup
>
import { toRefs } from 'vue'
import { useSizeThemeClass, CLoading, useInjectTheme } from 'casual-ui-vue'
import type { CTheme, CSize } from 'casual-types'

interface CButtonProps {
  /**
   * 按钮文案
   */
  label?: string
  /**
   * 是否表现为轮廓风格
   */
  outlined?: boolean
  /**
   * 是否为禁用态
   */
  disabled?: boolean
  /**
   * 按钮尺寸
   */
  size?: CSize
  /**
   * 是否现为圆角
   */
  rounded?: boolean
  /**
   * 是否现为圆边
   */
  round?: boolean
  /**
   * 是否表现为块级
   */
  block?: boolean
  /**
   * 主题
   */
  theme?: CTheme
  /**
   * 是否处于加载中状态
   */
  loading?: boolean
  /**
   * 是否表现为图标按钮
   */
  icon?: boolean
}

const props = withDefaults(defineProps<CButtonProps>(), {
  label: '',
  loading: false,
  outlined: false,
  round: false,
  rounded: false,
  disabled: false,
  block: false,
  size: 'md',
  theme: undefined,
  icon: false,
})

const { size } = toRefs(props)

const { provideTheme: theme } = useInjectTheme(props)

const sizeThemeClasses = useSizeThemeClass({
  size,
  theme,
  prefix: 'c-button',
})

defineEmits<{
  /**
   * 点击事件触发
   */
  (e: 'click'): void
}>()
</script>
<template>
  <button
    :class="[
      'c-button',
      { 'c-button--outlined': outlined },
      { 'c-button--round': round },
      rounded ? `c-rounded-${size}` : '',
      { 'c-button--block': block },
      { 'c-button--loading': loading },
      { 'c-button--icon': icon },
      `c-font-${size}`,
      `c-h-${size}`,
      `c-px-${size}`,
      ...sizeThemeClasses,
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <div :class="['c-button--content-wrapper']">
      <!-- @slot 默认插槽，如果设置了该插槽，则会覆盖<code>label</code>内容 -->
      <slot>
        {{ label }}
      </slot>
      <template v-if="loading">
        <span>&nbsp;</span>
        <!-- @slot 自定义加载状态动画 -->
        <slot name="loading">
          <c-loading />
        </slot>
      </template>
    </div>
  </button>
</template>
