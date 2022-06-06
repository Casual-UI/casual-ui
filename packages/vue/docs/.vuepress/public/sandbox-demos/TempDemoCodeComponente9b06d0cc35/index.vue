<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div>
      <c-input v-model="inputValue" placeholder="预设内容" />
    </div>
    <div>
      <c-input v-model="inputValue" type="password" placeholder="密码输入框" />
    </div>
    <div>
      <c-input v-model="inputValue" rounded placeholder="圆角输入框" />
    </div>
    <div>
      <c-input v-model="inputValue" disabled placeholder="禁用态" />
    </div>
  </div>
</template>
