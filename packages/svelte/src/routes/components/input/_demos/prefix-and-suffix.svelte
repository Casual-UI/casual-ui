<script lang="ts">
  import { CInput } from 'casual-ui-svelte'

  let value = ''
</script>

<div class="c-wrap c-flex c-gutter-md c-items-center">
  <div>
    <CInput rounded {value} placeholder="With prefix">
      <svelte:fragment slot="prefix">+234</svelte:fragment>
    </CInput>
  </div>

  <div>
    <CInput rounded {value} placeholder="With suffix">
      <svelte:fragment slot="suffix">@gmail.com</svelte:fragment>
    </CInput>
  </div>

  <div>
    <CInput rounded {value} placeholder="With prefix and suffix">
      <svelte:fragment slot="prefix">to:</svelte:fragment>
      <svelte:fragment slot="suffix">@gmail.com</svelte:fragment>
    </CInput>
  </div>

  <div>
    <CInput
      rounded
      {value}
      placeholder="No divider"
      prefixDivider={false}
      suffixDivider={false}
    >
      <svelte:fragment slot="prefix">to:</svelte:fragment>
      <svelte:fragment slot="suffix">@gmail.com</svelte:fragment>
    </CInput>
  </div>
</div>
