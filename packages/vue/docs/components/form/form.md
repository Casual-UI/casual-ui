---
title: Form & Form Item
componentPath: form/CForm
additionalComponentPaths:
  - name: CFormItem
    path: form/CFormItem
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'

const formData = ref({
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment',
})
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]
const industryOptions = [
  { label: 'IT', value: 'IT' },
  { label: 'Medical', value: 'Medical' },
  { label: 'Entertainment', value: 'Entertainment' },
  { label: 'Transportation', value: 'Transportation' },
]
</script>
<template>
  <c-form>
    <c-form-item label="Name">
      <c-input v-model="formData.name" />
    </c-form-item>
    <c-form-item label="Gender">
      <c-radio-group
        v-model="formData.gender"
        :options="genderOptions"
      />
    </c-form-item>
    <c-form-item label="Birthday">
      <c-date-picker
        v-model="formData.birthday"
        format="MMM DD, YYYY"
      />
    </c-form-item>
    <c-form-item label="Industry">
      <c-select
        v-model="formData.industry"
        :options="industryOptions"
      />
    </c-form-item>
  </c-form>
</template>
```

### Use with Items Config

::: warning Attention
If use with items config. Make sure use Casual UI as global plugin.  
Or manually register all the form components
:::

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment',
})

const formItems = [
  { field: 'name', label: 'Name' },
  {
    label: 'Gender',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY',
    },
  },
  {
    label: 'Industry',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' },
      ],
    },
  },
]
</script>
<template>
  <c-form
    v-model="formData"
    :items="formItems"
  />
</template>
```

### Sizes

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment',
})

const formItems = [
  { field: 'name', label: 'Name' },
  {
    label: 'Gender',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY',
    },
  },
  {
    label: 'Industry',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' },
      ],
    },
  },
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
      :value="s"
    />
  </div>
  <c-form
    v-model="formData"
    :items="formItems"
    :size="size"
  />
</template>
```

### Gutter sizes

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment',
})

const formItems = [
  { field: 'name', label: 'Name' },
  {
    label: 'Gender',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY',
    },
  },
  {
    label: 'Industry',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' },
      ],
    },
  },
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
      :value="s"
    />
  </div>
  <c-form
    v-model="formData"
    :items="formItems"
    :gutter-size="size"
  />
</template>
```

### Label Direction

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  labelDirection: 'row',
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment',
})

const formItems = [
  {
    field: 'labelDirection',
    label: 'Label Direction',
    col: 12,
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'row', value: 'row' },
        { label: 'row-reverse', value: 'row-reverse' },
        { label: 'column', value: 'column' },
        { label: 'column-reverse', value: 'column-reverse' },
      ],
    },
  },
  { field: 'name', label: 'Name' },
  {
    label: 'Gender',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY',
    },
  },
  {
    label: 'Industry',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' },
      ],
    },
  },
]
</script>
<template>
  <c-form
    v-model="formData"
    :items="formItems"
    :label-direction="formData.labelDirection"
    label-width="120px"
  />
</template>
```

### Label Align

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
  industry: 'Entertainment',
})

const formItems = [
  {
    field: 'labelAlign',
    label: 'Label Align',
    col: 12,
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'left', value: 'left' },
        { label: 'center', value: 'center' },
        { label: 'right', value: 'right' },
      ],
    },
  },
  { field: 'name', label: 'Name' },
  {
    label: 'Gender',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY',
    },
  },
  {
    label: 'Industry',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' },
      ],
    },
  },
]
</script>
<template>
  <c-form
    v-model="formData"
    :items="formItems"
    :label-align="formData.labelAlign"
  />
</template>
```

### Label Width

```vue live
<script setup>
import { ref } from 'vue'
const formData = ref({
  labelWidth: '100px',
  name: 'Micheal Jackson',
  gender: 'male',
  birthday: new Date('August 29, 1958'),
  industry: 'Entertainment',
})

const formItems = [
  {
    field: 'labelWidth',
    label: 'Label Width',
    col: 12,
  },
  { field: 'name', label: 'Name' },
  {
    label: 'Gender',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY',
    },
  },
  {
    label: 'Industry',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' },
      ],
    },
  },
]
</script>
<template>
  <c-form
    v-model="formData"
    :items="formItems"
    :label-width="formData.labelWidth"
  />
</template>
```

### Col Span

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
  { field: 'name', label: 'Name' },
  {
    label: 'Gender',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY',
    },
  },
  {
    label: 'Industry',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' },
      ],
    },
  },
  {
    field: 'agree',
    component: 'checkbox',
    col: 12,
    componentProps: {
      label: 'Agree to agreement',
    },
  },
]
const col = ref(6)
const spans = [6, 12]
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
  <c-form
    v-model="formData"
    :items="formItems"
    :col="col"
  />
</template>
```

### Validation Basic

The form validation of Casual UI，need to used with `field` `rules` of CFOrmItem.  
`rules` is the validators. Each validator is a function that accept current value. And it need return `false | string | Promise<false | string>`.  
The meaning of this return:

- `false` means validation passed.
- `string` means validation failed and it's the error message
- `Promise` means a async validation and the result is the same with above

For example. This is a validator for some field is required.

```js
const rule = v => (v ? false : 'This field is required')
```

It's async validator would be like this:

```js
const asyncRule = v =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(v ? false : 'This field is required')
    }, 1000)
  })
```

### Validation Demo

```vue live
<script setup>
import { ref } from 'vue'
import { useNotifications } from 'casual-ui-vue'

const formData = ref({
  name: '',
  gender: '',
  birthday: null,
  industry: '',
  hobbies: [],
})
const validating = ref(false)
const formItems = [
  {
    field: 'name',
    label: 'Name',
    rules: [v => (!v ? 'Please input name' : false)],
  },
  {
    label: 'Gender',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
    rules: [v => (v !== 'male' ? 'Can only select male！' : false)],
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY',
    },
    rules: [v => (!v ? 'Please select birthday' : false)],
  },
  {
    label: 'Industry',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' },
      ],
    },
    rules: [
      v =>
        v !== 'IT' && v !== 'Entertainment'
          ? 'Can only be IT or Entertainment'
          : false,
    ],
  },
  {
    label: 'Hobbies',
    field: 'hobbies',
    component: 'checkbox-group',
    col: 12,
    componentProps: {
      options: [
        { label: 'Travel', value: 'Travel' },
        { label: 'Work out', value: 'Work out' },
        { label: 'Food', value: 'Food' },
        { label: 'Rock', value: 'Rock' },
        { label: 'TV Series', value: 'TV Series' },
      ],
    },
    rules: [
      // Async validator
      v =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve(v.length < 2 ? 'At least check two' : false)
          }, 3000)
        }),
    ],
  },
]

const { open } = useNotifications()
const form = ref(null)
const doValidate = () => {
  form.value?.validate().then(() => {
    open({
      title: 'Notice',
      message: 'All validations passed！',
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
      label="Reset"
      outlined
      :loading="validating"
      class="c-mr-md"
      @click="clearValidate"
    />
    <c-button
      label="Submit"
      :loading="validating"
      @click="doValidate"
    />
  </div>
</template>
```

### Customize Form Item

Use `#[field]` dynamic slot to customize some form item.  
Every `#[field]` slot have these bindings: `{ validate, clearValidate, hasError }`

- `validate` is a function to validate current item
- `clearValidate` is a function to clear current item validate status
- `hasError` is the error status, can be a string or a `false`, string is the error message and `false` means no error

```vue live
<script setup>
import { ref } from 'vue'
import { useNotifications } from 'casual-ui-vue'
const formData = ref({
  name: '',
  gender: '',
  birthday: null,
  industry: '',
  customField: '',
})

const formItems = [
  {
    field: 'name',
    label: 'Name',
    rules: [v => (!v ? 'Please enter name' : false)],
  },
  {
    label: 'Gender',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
    rules: [v => (v !== 'male' ? 'Can only be male' : false)],
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY',
    },
    rules: [v => (!v ? 'Please select birthday' : false)],
  },
  {
    label: 'Industry',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' },
      ],
    },
    rules: [
      v =>
        v !== 'IT' && v !== 'Entertainment'
          ? 'Can only be IT or Entertainment'
          : false,
    ],
  },
  {
    label: 'Custom Field',
    field: 'customField',
    rules: [
      v => (v === 'custom value' ? false : 'Can only input “custom value”'),
    ],
  },
]
const { open } = useNotifications()
const form = ref(null)
const doValidate = () => {
  form.value?.validate().then(() => {
    open({
      title: 'Notice',
      message: 'All validations are passed!',
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
      label="Reset"
      outlined
      :loading="validating"
      class="c-mr-md"
      @click="clearAll"
    />
    <c-button
      label="Submit"
      :loading="validating"
      @click="doValidate"
    />
  </div>
</template>
```

### Customize Form Component <Badge>Advanced</Badge>

Use [`useValidator`](/usable/useFormValidator.html#usevalidator-api) API to fetch current form item context

<c-tabs v-model="activeTab" :items="[{ name: 'CustomInput.vue' }, { name: 'Usage' }]">
  <template #body-CustomInput.vue>

@[code vue](./CustomInput.vue)

  </template>
  <template #body-Usage>

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
  customField: '',
})

const formItems = [
  {
    field: 'name',
    label: 'Name',
    rules: [v => (!v ? 'Please enter name' : false)],
  },
  {
    label: 'Gender',
    field: 'gender',
    component: 'radio-group',
    componentProps: {
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
    rules: [v => (v !== 'male' ? 'Can only be male' : false)],
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'date-picker',
    componentProps: {
      format: 'MMM DD, YYYY',
    },
    rules: [v => (!v ? 'Please select birthday' : false)],
  },
  {
    label: 'Industry',
    field: 'industry',
    component: 'select',
    componentProps: {
      options: [
        { label: 'IT', value: 'IT' },
        { label: 'Medical', value: 'Medical' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Transportation', value: 'Transportation' },
      ],
    },
    rules: [
      v =>
        v !== 'IT' && v !== 'Entertainment'
          ? 'Can only be IT or Entertainment'
          : false,
    ],
  },
  {
    label: 'Custom Component',
    field: 'customField',
    component: CustomInput,
    rules: [
      v => {
        return v === 'custom value' ? false : 'Can only input “custom value”'
      },
    ],
  },
]
const { open } = useNotifications()
const form = ref(null)
const doValidate = () => {
  form.value?.validate().then(() => {
    open({
      title: 'Notice',
      message: 'All validations are passed!',
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
    col="12"
    label-align="right"
    label-width="140px"
    v-model="formData"
    :items="formItems"
    class="c-pa-md"
  />
  <div class="c-mt-xl">
    <c-button
      label="Reset"
      outlined
      :loading="validating"
      class="c-mr-md"
      @click="clearAll"
    />
    <c-button
      label="Submit"
      :loading="validating"
      @click="doValidate"
    />
  </div>
</template>
```

  </template>
</c-tabs>

::: danger Attention
All the form item's props which has the same name with form will override the form's value.  
It's useful when you want to a special item to have different styles.
:::

<script setup>
import { ref } from 'vue'
const activeTab = ref('CustomInput.vue')
</script>
