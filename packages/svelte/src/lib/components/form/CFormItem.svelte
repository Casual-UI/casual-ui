<script context="module">
  export const hasErrorKey = Symbol('hasError')
  export const validateCurrentKey = Symbol('validateCurrent')
  export const clearCurrentKey = Symbol('clearCurrent')
</script>

<script>
  import { useFormProps } from '$lib/hooks/useForm'

  import { writable } from 'svelte/store'

  import {
    getContext,
    setContext,
  } from 'svelte/types/runtime/internal/lifecycle'
  import {
    clearSomeFieldKey,
    errorStatusKey,
    validateSomeFieldKey,
  } from './CForm.svelte'

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
   * The size of component in this form item.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * The gutter size of this form item.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let gutterSize = undefined

  /**
   * Determine current form item has error or not.
   * If has any error, the value is the error message.
   * @type {import('svelte/types/runtime/store').Writable<string | false>}
   */
  const hasError = writable(false)

  /**
   * @type {(f: string) => Promise<void>=}
   */
  const validateSomeField = getContext(validateSomeFieldKey)

  /**
   * @type {(f: string) => void=}
   */
  const clearSomeField = getContext(clearSomeFieldKey)

  const validateCurrent = () =>
    validateSomeField && field && validateSomeField(field)

  const clearCurrent = () => clearSomeField && field && clearSomeField(field)

  setContext(validateCurrentKey, validateCurrent)
  setContext(hasErrorKey, hasError)
  setContext(clearCurrentKey, clearCurrent)

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

  /**
   * @type {import('svelte/types/runtime/store').Writable<Record<string, false | string>>}
   */
  $: errorStatus = getContext(errorStatusKey)

  errorStatus.subscribe(err => {
    if (field) {
      $hasError = err[field]
    }
  })

  $: formProps = useFormProps({
    size,
    gutterSize,
    labelAlign,
    labelDirection,
    labelWidth,
    col,
  })

  const {
    contextSize,
    contextCol,
    contextLabelAlign,
    contextLabelWidth,
    contextLabelDirection,
  } = formProps
</script>

<div
  class={`c-form-item c-col-${$contextCol} c-${labelDirection} ${
    isLabelVertical ? 'c-items-start' : 'c-items-center'
  } ${hasError ? 'c-form-item--has-error' : ''}`}
>
  <div
    class={`c-form-item--label c-font-${size} c-m${getLabelMarginPosition(
      $contextLabelDirection
    )}-${$contextSize} c-text-${$contextLabelAlign}`}
    style={`width: ${$contextLabelWidth}`}
  >
    {label}
  </div>
  <div class="c-form-item--content-wrapper c-flex c-items-center">
    <!-- 
      The content of this form item. You can use built-in form components like CInput
     -->
    <slot />
  </div>
</div>
