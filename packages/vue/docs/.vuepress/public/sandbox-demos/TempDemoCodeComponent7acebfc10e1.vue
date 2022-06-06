<template>
  <div class="tooltips">
    <c-tooltip position="left" content="一些tooltip信息">
      <c-button label="左侧" />
    </c-tooltip>
    <c-tooltip content="一些tooltip信息">
      <c-button label="上方（默认）" />
    </c-tooltip>
    <c-tooltip position="bottom" content="一些tooltip信息">
      <c-button label="下方" />
    </c-tooltip>
    <c-tooltip position="right" content="一些tooltip信息">
      <c-button label="右侧" />
    </c-tooltip>
  </div>
</template>
<style scoped>
.tooltips {
  display: flex;
}
.tooltips>div {
  margin-right: 12px;
}
</style>
