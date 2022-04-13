---
title: 表单&表单项
componentPath: form/CForm
additionalComponentPaths:
  - name: CFormItem
    path: form/CFormItem
---

### 配置式

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment'
})

const formItems = [
  { field: 'name', label: '姓名' },
  {
    label: '性别',
    field: 'gender',
    component: 'radio',
    options: [
      { label: 'Female', value: 'female' },
      { label: 'Male', value: 'male' },
    ]
  },
  {
    label: '生日',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY'
    }
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
    }
  }
]
</script>
<template>
  <c-form v-model="formData" :items="formItems" />
</template>
```

### 尺寸

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment'
})

const formItems = [
  { field: 'name', label: '姓名' },
  {
    label: '性别',
    field: 'gender',
    component: 'radio',
    options: [
      { label: 'Female', value: 'female' },
      { label: 'Male', value: 'male' },
    ]
  },
  {
    label: '生日',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY'
    }
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
    }
  }
]
const size = ref('md')
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
</script>
<template>
  <div class="c-row c-gutter-md c-items-center">
    <c-radio
      v-for="s in sizes"
      :key="s"
      v-model="size"
      :size="s"
      :label="s"
      :value="s" />
  </div>
  <c-form v-model="formData" :items="formItems" :size="size" />
</template>
```

### label方向

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment'
})

const formItems = [
  { field: 'name', label: '姓名' },
  {
    label: '性别',
    field: 'gender',
    component: 'radio',
    options: [
      { label: 'Female', value: 'female' },
      { label: 'Male', value: 'male' },
    ]
  },
  {
    label: '生日',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY'
    }
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
    }
  }
]
const direction = ref('row')
const directions = ['row', 'row-reverse', 'column', 'column-reverse']
</script>
<template>
  <div class="c-row c-gutter-md c-items-center">
    <c-radio
      v-for="d in directions"
      :key="d"
      v-model="direction"
      :label="d"
      :value="d" />
  </div>
  <c-form v-model="formData" :items="formItems" :label-direction="direction" />
</template>
```