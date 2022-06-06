<script setup>
import { ref } from 'vue'
import { useNotifications } from 'casual-ui-vue'

const formData = ref({
  name: '',
  gender: '',
  birthday: null,
  industry: '',
  hobbies: []
})
const validating = ref(false)
const formItems = [
  {
    field: 'name',
    label: '姓名',
    rules: [
      v => !v ? '请输入姓名' : false
    ]
  },
  {
    label: '性别',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ]
    },
    rules: [
      v => v !== 'male' ? '只能选择Male！' : false
    ]
  },
  {
    label: '生日',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY'
    },
    rules: [
      v => !v ? '请选择日期' : false
    ]
  },
  {
    label: '行业',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' }
      ]
    },
    rules: [
      v => v !== 'IT' && v !== 'Entertainment' ? '只能选择IT或者Entertainment' : false
    ]
  },
  {
    label: '爱好',
    field: 'hobbies',
    component: 'checkbox-group',
    col: 12,
    componentProps: {
      options: [
        { label: '旅游', value: 'Travel' },
        { label: '健身', value: 'Work out' },
        { label: '美食', value: 'Food' },
        { label: '摇滚', value: 'Rock' },
        { label: '肝剧', value: 'TV Series' },
      ]
    },
    rules: [
      // 异步验证
      v => new Promise(resolve => {
        setTimeout(() => {
          resolve(v.length < 2 ? '请至少选择两项' : false)
        }, 3000)
      })
    ]
  }
]

const { open } = useNotifications()
const form = ref(null)
const doValidate = () => {
  form.value?.validate()
    .then(() => {
      open({
        title: '提示',
        message: '验证通过！'
      })
    })
}
const clearValidate = () => {
  form.value?.clearAll()
}
</script>
<template>
  <c-form
    ref="form"
    v-model="formData"
    v-model:validating="validating"
    :items="formItems"
    class="c-pa-md"
  />
  <div class="c-mt-xl">
    <c-button
      label="重置"
      outlined
      :loading="validating"
      class="c-mr-md"
      @click="clearValidate"
    />
    <c-button label="提交" :loading="validating" @click="doValidate" />
  </div>
</template>
