<script setup lang="ts">
import { useNotifications } from 'casual-ui-vue'
const props = defineProps<{
  icons: {
    [name: string]: string
  }
  iconDirectory: string
}>()

const { open } = useNotifications()

const copyImport = (name: string) => {
  navigator.clipboard.writeText(
    `import { ${name} } from '@quasar/extras/${props.iconDirectory}'`
  )
  open({
    title: '通知',
    message: 'import代码复制成功！',
  })
}

const copyDom = (name: string) => {
  navigator.clipboard.writeText(`<c-icon :content="${name}" />`)
  open({
    title: '通知',
    message: 'DOM代码复制成功！',
  })
}
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap icons-previewer">
    <div v-for="(iconStr, name) in icons" :key="name" class="c-col-2">
      <div class="item">
        <c-tooltip>
          <div class="c-column c-items-center icon-wrapper">
            <c-icon :content="iconStr" />
            <span class="icon-name">
              {{ name }}
            </span>
          </div>
          <template #popup>
            <div class="tip-content">
              <c-button
                size="xs"
                label="复制import代码"
                outlined
                @click="copyImport(name as string)"
              />
              <c-button
                size="xs"
                label="复制dom代码"
                outlined
                class="c-mt-sm"
                @click="copyDom(name as string)"
              />
            </div>
          </template>
        </c-tooltip>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.icons-previewer {
  font-size: 48px;
  .item {
    background-clip: border-box;
    padding: 8px;
    cursor: pointer;
    &:hover {
      background-color: var(--casual-primary);
      color: #fff;
    }
    :deep(.c-tooltip) {
      width: 100%;
    }
    .icon-name {
      font-size: 12px;
      margin-top: 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      text-align: center;
    }
    .icon-wrapper {
      width: 100%;
    }
    .tip-content {
      border-radius: 3px;
      display: flex;
      padding: 8px;
      flex-direction: column;
      white-space: nowrap;
      background-color: var(--casual-tooltip-bg);
    }
  }
}
</style>
