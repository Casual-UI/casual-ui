<script setup>
import { ref } from 'vue'
import { useNotifications } from 'casual-ui-vue'
import CustomInput from '@doc/components/form/CustomInput.vue'

const formData = ref({
  name: '',
  gender: '',
  birthday: null,
  industry: '',
  customField: ''
})

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
    label: '自定义项',
    field: 'customField',
    component: CustomInput,
    rules: [
      v => {
        return v === 'custom value' ? false : '只能输入“custom value”'
      }
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
const clearAll = () => {
  form.value?.clearAll()
}
const validating = ref(false)
</script>
<template>
  <c-form
    ref="form"
    v-model="formData"
    :items="formItems"
    class="c-pa-md"
  />
  <div class="c-mt-xl">
    <c-button
      label="重置"
      outlined
      :loading="validating"
      class="c-mr-md"
      @click="clearAll"
    />
    <c-button label="提交" :loading="validating" @click="doValidate" />
  </div>
</template>
