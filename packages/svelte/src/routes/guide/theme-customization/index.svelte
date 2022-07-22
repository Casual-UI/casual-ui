<script lang="ts" context="module">
  export const title = 'Theme Customization'
</script>

<script lang="ts">
  import Attention from '$theme/Attention.svelte'
  import Link from '$theme/Link.svelte'

  export let scssCodeHTML = ''
</script>

<Attention mb-4>
  <p>
    Use <Link
      label="CSS3 Variables"
      to="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"
      external
    /> to customize your own theme colors <br />
    All of the variables shown below can be override by user
  </p>
</Attention>
{@html scssCodeHTML}
