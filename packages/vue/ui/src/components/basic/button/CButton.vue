<script
  lang="ts"
  setup
>
import { toRefs } from 'vue'
import { useSizeThemeClass, CLoading, useInjectTheme } from 'casual-ui-vue'
import type { CTheme, CSize } from 'casual-types'

interface CButtonProps {
  /**
   * The label text
   * @zh 按钮文案
   */
  label?: string
  /**
   * Determine whether the button is outlined or not.
   * @zh 是否表现为轮廓风格
   */
  outlined?: boolean
  /**
   * Determine whether the button is disabled or not.
   * @zh 是否为禁用态
   */
  disabled?: boolean
  /**
   * The size of button.
   * @zh 按钮尺寸
   */
  size?: CSize
  /**
   * Determine whether to have a rounded border or not.
   * @zh 是否现为圆角
   */
  rounded?: boolean
  /**
   * Determine whether to have a half circle border or not.
   * @zh 是否现为圆边
   */
  round?: boolean
  /**
   * Determine whether to display like a block element or not.
   * @zh 是否表现为块级
   */
  block?: boolean
  /**
   * The theme color of button.
   * @zh 主题
   */
  theme?: CTheme
  /**
   * Determine whether the button is in loading status or not.
   * @zh 是否处于加载中状态
   */
  loading?: boolean
  /**
   * Determine whether the button display as a icon button or not.
   * @zh 是否表现为图标按钮
   */
  icon?: boolean
  /**
   * Determine whether the button display a flat style or not.
   * @zh 是否为扁平按钮
   */
  flat?: boolean
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
  flat: false,
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
   * Emit when the button clicked.
   * @zh 点击事件触发
   */
  (e: 'click'): void
}>()
</script>
<template>
  <button
    :class="[
      'c-button',
      { 'c-button--flat': flat },
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
    <div class="c-button--focus-helper"></div>
    <div :class="['c-button--content-wrapper']">
      <!-- 
        @slot Default content. It will override the label prop.
        @zh 默认插槽，如果设置了该插槽，则会覆盖<code>label</code>内容
      -->
      <slot>
        {{ label }}
      </slot>
      <template v-if="loading">
        <span>&nbsp;</span>
        <!-- 
          @slot Customize the loading content.
          @zh 自定义加载状态动画 
        -->
        <slot name="loading">
          <c-loading />
        </slot>
      </template>
    </div>
  </button>
</template>
