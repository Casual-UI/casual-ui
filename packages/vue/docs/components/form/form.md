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

### 表单项间隔尺寸

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
  <c-form v-model="formData" :items="formItems" :gutter-size="size" />
</template>
```

### label方向&label宽度

编辑下方的label宽度以及label方向，即可实时查看效果

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  labelWidth: 60,
  labelDirection: 'row',
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment'
})

const formItems = [
  {
    field: 'labelWidth',
    label: 'label宽度',
    col: 12
  },
  {
    field: 'labelDirection',
    label: 'label方向',
    component: 'radio',
    col: 12,
    options: [
      { label: 'row', value: 'row' },
      { label: 'row-reverse', value: 'row-reverse' },
      { label: 'column', value: 'column' },
      { label: 'column-reverse', value: 'column-reverse' },
    ]
  },
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
  <c-form
    v-model="formData"
    :items="formItems"
    :label-direction="formData.labelDirection"
    :label-width="`${formData.labelWidth}px`" />
</template>
```

### 自定义项列宽

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment',
  agree: false,
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
        { label: 'Transportation', value: 'Transportation' },
      ]
    }
  },
  {
    field: 'agree',
    component: 'checkbox',
    col: 12,
    componentProps: {
      label: '勾选即同意XXX协议',
    },
  }
]
const col = ref(6)
const spans = [2, 3, 4, 6, 12]
</script>
<template>
  <div class="c-row c-gutter-md c-items-center">
    <c-radio
      v-for="s in spans"
      :key="s"
      v-model="col"
      :label="s"
      :value="s" />
  </div>
  <c-form v-model="formData" :items="formItems" :col="col" />
</template>
```

::: tip 提示
表单项的`col`配置可以覆盖表单整体的`col`配置，比如在上面的示例中，同意协议表单项始终使用`12`，即始终占一整行
:::