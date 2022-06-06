<script setup>
import { ref } from 'vue'
const show = ref(false)

const toggleShow = () => {
  show.value = !show.value
}
</script>
<template>
  <div class="popups">
    <c-tooltip content="你好，世界">
      <c-button outlined rounded label="悬浮（默认）" />
    </c-tooltip>
    <c-tooltip trigger="click" content="你好，世界">
      <c-button rounded label="点击" />
    </c-tooltip>
    <div>
      <c-button label="手动" @click="toggleShow" />
      <c-tooltip v-model:show="show" trigger="manual" content="你好，世界">
        点击左侧按钮手动触发
      </c-tooltip>
    </div>
  </div>
</template>
<style scoped>
.popups {
  display: flex;
}
div + div {
  margin-left: 12px;
}

</style>
