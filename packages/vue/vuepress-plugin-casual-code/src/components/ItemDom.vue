<script
  setup
  lang="ts"
>
import { usePageLang } from '@vuepress/client'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value: any
    descWrap?: boolean
    nameFormatter?: (value: any) => string
    descFormatter?: (value: any) => string
  }>(),
  {
    descWrap: true,
    nameFormatter: (value: any) => value.name,
    descFormatter: (value: any) => value.description,
  }
)
const lang = usePageLang()

const descZh = computed(
  () =>
    props.value?.tags?.zh?.[0]?.description ||
    // @ts-ignore
    props.value?.tags?.find(tag => tag.title === 'zh')?.content
)

const isChinese = computed(() => lang.value === 'zh-CN')
</script>
<template>
  <div class="c-pt-sm">
    <div class="c-flex c-items-center c-gutter-sm c-wrap">
      <div>
        <c-tag
          size="xs"
          :label="nameFormatter(value)"
        />
      </div>
      <slot name="after-name" />
      <span
        v-if="!descWrap"
        class="description"
        v-html="descFormatter(value)"
      ></span>
    </div>
    <p
      v-if="descWrap"
      class="description"
    >
      <span
        class="description"
        v-html="isChinese ? descZh : descFormatter(value)"
      ></span>
    </p>
    <slot />
  </div>
</template>
<style
  lang="scss"
  scoped
>
.description {
  margin-bottom: 0;
}
</style>
