<script lang="ts">
  import { CCheckbox } from 'casual-ui-svelte'

  let checked = false
</script>

<div class="c-flex c-gutter-x-md c-wrap">
  <div>
    <CCheckbox bind:value={checked} label="Agree to our agreement" />
  </div>
  <div>
    <CCheckbox bind:value={checked}>
      <p slot="label">
        Click to our <a
          href="https://github.com/Blackman99/casual-ui"
          target="_blank">github repository</a
        >
      </p>
    </CCheckbox>
  </div>
</div>
