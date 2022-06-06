<template>
  <c-button label="加载中" loading>
    <template #loading>
      <c-loading-audio />
    </template>
  </c-button>
  <c-button
    label="加载中"
    loading
    outlined
    round>
    <template #loading>
      <c-loading-dot />
    </template>
  </c-button>
  <c-button
    label="加载中"
    outlined
    rounded
    loading>
    <template #loading>
      <c-loading-bar />
    </template>
  </c-button>
</template>
