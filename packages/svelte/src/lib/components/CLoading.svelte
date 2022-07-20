<script>
  import { attributeAtom } from '../utils/attributeAtom'

  /**
   * The thickness of loading bar circle
   * @type {number}
   */
  export let thickness = 5

  /**
   * The color of loading
   * @type {string}
   */
  export let color = 'currentColor'

  /**
   * Custom styles
   * @type {string}
   */
  export let style = ''
</script>

<svg
  class="c-loading c-loading--mat"
  viewBox="25 25 50 50"
  width="1em"
  height="1em"
  {...attributeAtom($$restProps)}
  {style}
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
