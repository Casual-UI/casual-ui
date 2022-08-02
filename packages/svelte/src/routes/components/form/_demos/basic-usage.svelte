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
</script>

<CForm value={{ name, gender, industry, birthday }}>
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
