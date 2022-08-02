<script lang="ts">
  import {
    CForm,
    CFormItem,
    CInput,
    CSelect,
    CRadioGroup,
    CDatePicker,
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

  let size: 'xs' | 'sm' | 'md' | 'xl' | 'lg' = 'md'
  const sizes = [
    {
      label: 'xs',
      value: 'xs',
    },
    {
      label: 'sm',
      value: 'sm',
    },
    {
      label: 'md',
      value: 'md',
    },
    {
      label: 'lg',
      value: 'lg',
    },
    {
      label: 'xl',
      value: 'xl',
    },
  ]
</script>

<CForm gutterSize={size}>
  <CFormItem label="Gutter size" col={12}>
    <CRadioGroup bind:value={size} options={sizes} />
  </CFormItem>
  <CFormItem label="Name">
    <CInput bind:value={name} placeholder="Your name" />
  </CFormItem>
  <CFormItem label="Gender">
    <CRadioGroup options={genderOptions} bind:value={gender} />
  </CFormItem>
  <CFormItem label="Birthday">
    <CDatePicker
      bind:value={birthday}
      format="MM/DD YYYY"
      placeholder="Your birthday"
    />
  </CFormItem>
  <CFormItem label="Industry">
    <CSelect
      bind:value={industry}
      options={industryOptions}
      placheholder="Your industry"
    />
  </CFormItem>
</CForm>
