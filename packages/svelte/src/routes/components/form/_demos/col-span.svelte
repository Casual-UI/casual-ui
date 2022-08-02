<script lang="ts">
  import {
    CForm,
    CFormItem,
    CInput,
    CSelect,
    CRadioGroup,
    CDatePicker,
    useFormProps,
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

  let col: 6 | 12 = 6
  const cols = [
    {
      label: '6',
      value: 6,
    },
    {
      label: '12',
      value: 12,
    },
  ]

  const { contextCol } = useFormProps()

  $: $contextCol, console.log($contextCol)
</script>

<CForm {col}>
  <CFormItem label="Col" col={12}>
    <CRadioGroup bind:value={col} options={cols} />
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
