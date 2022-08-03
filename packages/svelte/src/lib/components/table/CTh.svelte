<script>
  /**
   * The width of th.
   * @type {string}
   */
  export let width = 'auto'
</script>

<th class="c-table--td" style={`width: ${width};`}>
  <slot />
</th>
