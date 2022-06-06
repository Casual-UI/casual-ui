<script setup>
import { ref } from 'vue'
const left = ref(false)
const top = ref(false)
const right = ref(false)
const bottom = ref(false)
</script>
<template>
  <c-dialog
    v-model="left"
    exchange-animation-direction
    title="左侧抽屉"
    :rounded="false"
    :custom-style="{
      height: '100vh'
    }"
    width="80vw"
    vertical-align="center"
    horizontal-align="start">
    内容
  </c-dialog>
  <c-dialog
    v-model="right"
    exchange-animation-direction
    title="右侧抽屉"
    :rounded="false"
    width="80vw"
    :custom-style="{
      height: '100vh'
    }"
    vertical-align="center"
    horizontal-align="end">
    内容
  </c-dialog>
  <c-dialog
    v-model="top"
    title="顶部抽屉"
    :rounded="false"
    width="100vw"
    vertical-align="start"
    horizontal-align="center">
    内容
  </c-dialog>
  <c-dialog
    v-model="bottom"
    title="底部抽屉"
    :rounded="false"
    width="100vw"
    vertical-align="end"
    horizontal-align="center">
    内容
  </c-dialog>
  <div class="c-row c-items-center c-wrap c-gutter-md">
    <div>
      <c-button label="打开左侧抽屉" @click="left = true" />
    </div>
    <div>
      <c-button label="打开顶部抽屉" @click="top = true" />
    </div>
    <div>
      <c-button label="打开右侧抽屉" @click="right = true" />
    </div>
    <div>
      <c-button label="打开底部抽屉" @click="bottom = true" />
    </div>
  </div>
</template>
