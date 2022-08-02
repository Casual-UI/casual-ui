<script lang="ts">
  import InlineCode from '$theme/InlineCode.svelte'
  import {
    openNotification,
    CForm,
    CFormItem,
    CInput,
    CSelect,
    CRadioGroup,
    CDatePicker,
    CButton,
  } from 'casual-ui-svelte'

  let name = ''

  let gender = ''

  let industry = ''

  let birthday: Date | null = null

  const genderOptions = [
    {
      label: 'Male',
      value: 0,
    },
    {
      label: 'Female',
      value: 1,
    },
  ]

  const industryOptions = [
    { label: 'IT', value: 0 },
    { label: 'Medical', value: 1 },
    { label: 'Transport', value: 2 },
    { label: 'Education', value: 3 },
  ]

  let form: CForm

  const rules = {
    name: [(v: string) => (v ? false : 'Please enter name')],
    gender: [(v: any) => (v === '' ? 'Please select gender' : false)],
    birthday: [(v: any) => (v ? false : 'Please select birthday')],
    industry: [(v: any) => (v === '' ? 'Please select industry' : false)],
  }

  function onSubmit() {
    form.validateAll().then(() => {
      openNotification({
        title: 'Congratulations!',
        message: 'Form validation passed',
      })
    })
  }
  function onReset() {
    form.clearAll()
  }
</script>

<div class="c-mb-lg">
  To use validation the <InlineCode>value</InlineCode>, <InlineCode
    >rules</InlineCode
  > prop and CFormItem's <InlineCode>field</InlineCode> need to set
</div>
<CForm
  bind:this={form}
  value={{
    name,
    gender,
    birthday,
    industry,
  }}
  {rules}
>
  <CFormItem label="Name" field="name">
    <CInput bind:value={name} placeholder="Your name" />
  </CFormItem>
  <CFormItem label="Gender" field="gender">
    <CRadioGroup options={genderOptions} bind:value={gender} />
  </CFormItem>
  <CFormItem label="Birthday" field="birthday">
    <CDatePicker
      bind:value={birthday}
      format="MM/DD YYYY"
      placeholder="Your birthday"
    />
  </CFormItem>
  <CFormItem label="Industry" field="industry">
    <CSelect
      bind:value={industry}
      options={industryOptions}
      placheholder="Your industry"
    />
  </CFormItem>
</CForm>
<div class="c-flex c-justify-end c-mt-xl c-gutter-x-sm">
  <div>
    <CButton label="Reset" outlined on:click={onReset} />
  </div>
  <div>
    <CButton label="Submit" on:click={onSubmit} />
  </div>
</div>
