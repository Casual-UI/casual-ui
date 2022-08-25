<script context="module" lang="ts">
  import Link from '$theme/Link.svelte'
  import Attention from '$theme/Attention.svelte'
  export const title = 'FormItem'
  export const apiPath = 'form/CFormItem'
</script>

<Attention type="primary" title="NOTICE">
  All the props that has the same name with <Link
    to="/components/form"
    label="CForm"
  /> would have a higher priority.
</Attention>

<p>
  It is recommended to use this component along with <Link
    to="/components/form"
    label="CForm"
  />
</p>
