<script lang="ts">
  export let size = '1em'
  export let thickness = 5
  export let color = 'currentColor'
</script>

<svg
  class="c-loading c-loading--mat"
  viewBox="25 25 50 50"
  width={size}
  height={size}
>
  <circle
    class="c-loading--path"
    cx="50"
    cy="50"
    r="20"
    fill="none"
    stroke={color}
    stroke-width={thickness}
    stroke-miterlimit="10"
  />
</svg>
