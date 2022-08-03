<script>
  /**
   * The width of cell.
   * @type {string}
   */
  export let width = 'auto'
</script>

<td class="c-table--td" style={`width: ${width};`}>
  <slot />
</td>
