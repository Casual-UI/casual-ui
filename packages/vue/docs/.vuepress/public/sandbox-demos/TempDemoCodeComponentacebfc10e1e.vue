<template>
  <c-tooltip position="right" trigger="click">
    <c-button label="点我" />
    <template #popup>
      <div class="custom-content">
        哇，可以使用任何元素作为自定义内容哦
        <c-button rounded outlined label="自定义按钮" />
      </div>
    </template>
  </c-tooltip>
</template>
<style scoped>
.custom-content {
  white-space: nowrap;
  background: #333;
  padding: 12px;
  color: #fff;
}
</style>
