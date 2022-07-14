<script lang="ts">
  import { CButton } from 'casual-ui-svelte'
</script>

<div class="c-flex c-items-center c-gutter-md c-wrap">
  <div>
    <CButton label="A Primary (default) Button" />
  </div>
  <div>
    <CButton label="A Secondary Button" theme="secondary" />
  </div>
  <div>
    <CButton label="A Warning Button" theme="warning" />
  </div>
  <div>
    <CButton label="A Negative Button" theme="negative" />
  </div>
  <div>
    <CButton label="A Primary (default) Button" outlined />
  </div>
  <div>
    <CButton label="A Secondary Button" theme="secondary" outlined />
  </div>
  <div>
    <CButton label="A Warning Button" theme="warning" outlined />
  </div>
  <div>
    <CButton label="A Negative Button" theme="negative" outlined />
  </div>
</div>
