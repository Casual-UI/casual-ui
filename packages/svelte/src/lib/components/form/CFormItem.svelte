<script>
  /**
   * The field of whole form data
   * @type {string=}
   */
  export let field = undefined

  /**
   * The label of each form item
   */
  export let label = ''

  /**
   * The label width of this form item. Notice that this prop will override the CForm's `labelWidth` prop
   * @type {string}
   */
  export let labelWidth = '100px'

  /**
   * This form item col span
   * @type {number=}
   */
  export let col = undefined

  /**
   * The label and form component arrangement direction of this form item
   * @type {'row' | 'row-reverse' | 'column' | 'column-reverse'=}
   */
  export let labelDirection = undefined

  /**
   * The label align of this form item
   * @type {'left' | 'center' | 'right'=}
   */
  export let labelAlign = undefined

  /**
   * The validators
   * @type {((v: any) => string | false | Promise<string | false>)[]}
   */
  export let rules = []

  /**
   * The size of component in this form item.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  let hasError = false

  $: isLabelVertical =
    labelDirection === 'column' || labelDirection === 'column-reverse'

  // @ts-ignore
  const getLabelMarginPosition = direction =>
    new Map([
      ['row', 'r'],
      ['row-reverse', 'l'],
      ['column', 'b'],
      ['column-reverse', 't'],
    ]).get(direction)
</script>

<div
  class={`c-form-item c-col-${col} c-${labelDirection} ${
    isLabelVertical ? 'c-items-start' : 'c-items-center'
  } ${hasError ? 'c-form-item--has-error' : ''}`}
>
  <div
    class={`c-form-item--label c-font-${size} c-m${getLabelMarginPosition(
      labelDirection
    )}-${size} c-text-${labelAlign}`}
    style={`width: ${labelWidth}`}
  >
    {label}
  </div>
  <div class="c-form-item--content-wrapper c-flex c-items-center">
    <!-- 
      The content of form item. You can use built-in form components like CInput
     -->
    <slot />
  </div>
</div>
