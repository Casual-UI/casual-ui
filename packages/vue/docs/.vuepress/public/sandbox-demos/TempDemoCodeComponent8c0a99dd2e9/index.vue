<script setup>
import { ref } from 'vue'

const formData = ref({
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment'
})
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]
const industryOptions = [
  { label: 'IT', value: 'IT' },
  { label: 'Medical', value: 'Medical' },
  { label: 'Entertainment', value: 'Entertainment' },
  { label: 'Transportation', value: 'Transportation' }
]
</script>
<template>
  <c-form>
    <c-form-item label="姓名">
      <c-input v-model="formData.name" />
    </c-form-item>
    <c-form-item label="性别">
      <c-radio-group v-model="formData.gender" :options="genderOptions" />
    </c-form-item>
    <c-form-item label="生日">
      <c-date-picker v-model="formData.birthday" format="MMM DD, YYYY" />
    </c-form-item>
    <c-form-item label="行业">
      <c-select v-model="formData.industry" :options="industryOptions" />
    </c-form-item>
  </c-form>
</template>
