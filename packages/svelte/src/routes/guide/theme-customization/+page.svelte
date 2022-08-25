<script lang="ts" context="module">
  throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  // export const title = 'Theme Customization'
</script>

<script lang="ts">
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

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
