<script
  setup
  lang="ts"
>
import type { CSize } from 'casual-types'
import useInjectSize from '../../usable/useInjectSize'

interface CInfoItemProps {
  /**
   * The icon. imported from @quasar/extras
   * @zh 图标，从@quasar/extras导入的图标
   */
  icon?: string
  /**
   * The title.
   * @zh 标题
   */
  title?: string
  /**
   * The subtitle.
   * @zh 子标题
   * @default ''
   */
  subtitle?: string

  /**
   * The align direction.
   * @zh 横向对齐方向，css的align-items属性
   */
  align?: 'start' | 'center' | 'end'

  /**
   * The align direction with icon and title.
   * @zh 图标的对齐方向，css的align-items属性
   */
  iconAlign?: 'start' | 'center' | 'end'
  /**
   * The Size of item.
   * @zh 尺寸，该值会影响标题、子标题、字体大小以及图标与标题间的间距
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
        <!-- 
          @slot Customize the icon content. 
          @zh 图标内容 -->
        <slot name="icon">
          <c-icon
            class="c-info-item--icon"
            v-if="icon"
            :content="icon"
          />
        </slot>
      </div>
      <div class="c-flex-grow">
        <!-- 
          @slot Customize the title content. 
          @zh 自定义标题内容 -->
        <slot name="title">
          <div class="c-info-item--title">
            {{ title }}
          </div>
        </slot>
        <!-- 
          @slot Customize the subtitle content. 
          @zh 自定义副标题内容 -->
        <slot name="subtitle">
          <div class="c-info-item--subtitle c-mt-sm">
            {{ subtitle }}
          </div>
        </slot>
      </div>
    </div>
    <!-- 
      @slot Customize the append content. 
      @zh 自定义尾部内容 -->
    <slot name="append"> </slot>
  </div>
</template>
