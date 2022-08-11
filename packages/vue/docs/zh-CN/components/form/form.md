---
title: 表单&表单项
componentPath: form/CForm
additionalComponentPaths:
  - name: CFormItem
    path: form/CFormItem
---

### 基础使用

```vue live
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
```

### 配置式

::: warning 注意
如果使用配置式，请确保全局使用了CasualUI，或者你也可以全局手动注册所有的表单相关组件
:::

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
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ]
    }
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
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ]
    }
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
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ]
    }
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

### label排列方向、宽度、对齐方式

编辑下方的label相关属性，查看实时效果

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  labelWidth: 100,
  labelDirection: 'row',
  labelAlign: 'left',
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
    col: 12,
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'row', value: 'row' },
        { label: 'row-reverse', value: 'row-reverse' },
        { label: 'column', value: 'column' },
        { label: 'column-reverse', value: 'column-reverse' },
      ]
    }
  },
  {
    field: 'labelAlign',
    label: 'label对齐方式',
    col: 12,
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'left', value: 'left' },
        { label: 'center', value: 'center' },
        { label: 'right', value: 'right' },
      ]
    }
  },
  { field: 'name', label: '姓名' },
  {
    label: '性别',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ]
    }
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
    :label-width="`${formData.labelWidth}px`"
    :label-align="formData.labelAlign"
  />
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
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ]
    }
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
      :value="s"
    />
  </div>
  <c-form v-model="formData" :items="formItems" :col="col" />
</template>
```

### 表单验证 & 异步验证 & 验证状态

Casual UI 的表单验证，需要配合`field`、`rules`属性  
`rules`为验证函数数组，每个验证函数为一个函数，该函数接受当前表单项对应值，返回：  
`false | string | Promise<false | string>`，返回含义如下：

- 返回`false`则代表验证通过无错误
- 回`string`则代表有错误，并且返回值为具体的错误信息
- 返回`Promise`则代表异步验证，内容也是`false`或者具体的`string`类型错误信息

假设你想定义一个验证是否必填的验证规则，可以这样写:

```js
const rule = v => (v ? false : '该项是必填的')
```

它的等价异步逻辑大概是这样：

```js
const asyncRule = v =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(v ? false : '该项是必填的')
    }, 1000)
  })
```

同时，在下面的示例中：  
爱好(hobbies)一栏，具有异步验证规则

```vue live
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
```

### 自定义表单项

通过`#[field]`插槽来自定义某个表单项，并且通过`{ validate, clearValidate, hasError }`来自定义触发验证、清除验证的调用时机，以及错误状态的样式表现

```vue live
<script setup>
import { ref } from 'vue'
import { useNotifications } from 'casual-ui-vue'
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
    rules: [
      v => v === 'custom value' ? false : '只能输入“custom value”'
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
    v-model:validating="validating"
    :items="formItems"
    class="c-pa-md"
  >
    <template #customField="{ validate, clearValidate, hasError }">
      <input
        v-model="formData.customField"
        :style="{ color: hasError ? 'red' : 'inherit' }"
        @blur="validate"
        @focus="clearValidate"
      />
    </template>
  </c-form>
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
```

### 自定义表单组件<Badge>高级</Badge>

自写组件，可以使用[`useValidator`](/usable/useFormValidator.html#usevalidator-api)获取当前表单项所处表单验证上下文，从而自定义验证方法、清除验证状态调用时机，以及错误状态的样式表现

<c-tabs v-model="activeTab" :items="[{ name: 'CustomInput.vue' }, { name: '使用' }]">
  <template #body-CustomInput.vue>

@[code vue](./CustomInput.vue)
  
  </template>
  <template #body-使用>

```vue live
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
```

  </template>
</c-tabs>




::: tip 提示
表单项的所有与表单整体同名的配置可以覆盖表单整体的配置
:::


<script setup>
import { ref } from 'vue'
const activeTab = ref('CustomInput.vue')
</script>