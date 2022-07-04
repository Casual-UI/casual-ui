<script
  setup
  lang="ts"
>
import type { CSize } from 'casual-types'
import useInjectSize from '../../usable/useInjectSize'

interface CInfoItemProps {
  /**
   * 图标，<code>c-icon</code>的<code>content</code>属性
   */
  icon?: string
  /**
   * 标题
   */
  title?: string
  /**
   * 子标题
   * @default ''
   */
  subtitle?: string

  /**
   * 横向对齐方向，css的align-items属性
   */
  align?: 'start' | 'center' | 'end'

  /**
   * 图标的对齐方向，css的align-items属性
   */
  iconAlign?: 'start' | 'center' | 'end'
  /**
   * 尺寸，该值会影响标题、子标题、字体大小以及图标与标题间的间距
   */
  size?: CSize
}

const props = withDefaults(defineProps<CInfoItemProps>(), {
  title: '',
  subtitle: '',
  icon: '',
  align: 'center',
  iconAlign: 'start',
})

const { provideSize } = useInjectSize(props)
</script>
<template>
  <div
    class="c-info-item c-flex c-justify-between"
    :class="[`c-items-${align}`]"
  >
    <div
      class="c-flex c-flex-grow"
      :class="[`c-items-${iconAlign}`]"
    >
      <div :class="[`c-mr-${provideSize}`]">
        <!-- @slot 图标内容 -->
        <slot name="icon">
          <c-icon
            class="c-info-item--icon"
            v-if="icon"
            :content="icon"
          />
        </slot>
      </div>
      <div class="c-flex-grow">
        <!-- @slot 自定义标题内容 -->
        <slot name="title">
          <div class="c-info-item--title">
            {{ title }}
          </div>
        </slot>
        <!-- @slot 自定义副标题内容 -->
        <slot name="subtitle">
          <div class="c-info-item--subtitle c-mt-sm">
            {{ subtitle }}
          </div>
        </slot>
      </div>
    </div>
    <!-- @slot 自定义尾部内容 -->
    <slot name="append"> </slot>
  </div>
</template>
