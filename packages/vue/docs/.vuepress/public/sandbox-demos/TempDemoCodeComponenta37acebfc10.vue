<template>
  <c-button
    label="打开通知"
    @click="
      $notify({
        title: '标题',
        message: '这是一条通过$notify打开的通知',
      })
    "
  />
</template>
