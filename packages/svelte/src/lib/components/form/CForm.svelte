<script context="module">
  /**
   * The errorStatus inject key. Example:
   *
   * ```ts
   * import { getContext } from 'svelte'
   * import { errorStatusKey } from 'casual-ui-svelte/components/form/CForm.svelte'
   * const errorStaus: ErrorStatus = getContext(errorStatusKey)
   * type ErrorStatus = Writable<Record<string, string | false>>
   * ```
   * @type {symbol}
   */
  export const errorStatusKey = Symbol('errorStatus')

  /**
   * The function to validate specify field. Example:
   *
   * ```ts
   * import { validateSomeFieldKey } from 'casual-ui-svelte/components/form/CForm.svelte'
   * import { getContext } from 'svelte'
   * const validateSomeField = getContext(validateSomeFieldKey)
   *
   * // At some proper time
   * validateSomeFiled?.('field')
   * ```
   */
  export const validateSomeFieldKey = Symbol('validateSomeField')

  /**
   * The function to clear specify field validate status. Example:
   *
   * ```ts
   * import { clearSomeFieldKey } from 'casual-ui-svelte/components/form/CForm.svelte'
   * import { getContext } from 'svelte'
   * const clearSomeField = getContext(clearSomeFieldKey)
   *
   * // At some proper time
   * clearSomeField?.('field')
   * ```
   */
  export const clearSomeFieldKey = Symbol('clearSomeField')
</script>

<script>
  import { useFormProps } from '$lib/hooks/useForm'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { tick } from 'svelte'
  /**
   * The whole form data
   * @type {Record<string, any>}
   */
  export let value = {}

  /**
   * The validators of each form item.
   * @type {Record<string, Array<(val: any) => string | false | Promise<string | false>>>}
   */
  export let rules = {}

  /**
   * The label width of whole form. Notice that the default value is `'80px'` instead of `undefined`.
   * @type {string=}
   */
  export let labelWidth = undefined

  /**
   * The col span of each form item. Total cols are 12. Notice that default value is `6` instead of `undefined`
   * @type {number=}
   */
  export let col = undefined

  /**
   * Label and form component arrangement direction.
   *
   * Notice that the defualt value is `'row'` instead of `undefined`.
   *
   * This prop use [CSS flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
   * @type {'row' | 'row-reverse' | 'column' | 'column-reverse'=}
   */
  export let labelDirection = undefined

  /**
   * The label itself arrangement direction.
   *
   * Notice that the default value is `'left'` instead of `undefined`
   *
   * This prop use [CSS text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
   * @type {'left' | 'center' | 'right'=}
   */
  export let labelAlign = undefined

  /**
   * The size of whole form.
   *
   * Notice that the default value is `'md'` instead of `undefined`.
   *
   * ::: tip TIP
   * This prop will affect all the components that holds the size props.
   * :::
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * The gutte size between label and form component. Notice that the default value is `'md'` instead of `undefined`.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let gutterSize = undefined

  /**
   * The falg that determine form is in validating or not.
   *
   * It will be set to `true` when the `validateAll` or `validateSomeField` method is called.
   *
   * It will be restore to `false` when all validations are over.
   *
   * @type {boolean}
   */
  export let validating = false

  const {
    contextGutterSize,
    contextSize,
    contextCol,
    contextLabelWidth,
    contextLabelAlign,
    contextLabelDirection,
  } = useFormProps({
    labelAlign,
    labelDirection,
    labelWidth,
    size,
    gutterSize,
    col,
  })

  $: {
    if (size) {
      $contextSize = size
    }
  }

  $: {
    if (gutterSize) {
      $contextGutterSize = gutterSize
    }
  }

  $: {
    if (col) {
      $contextCol = col
    }
  }

  $: {
    if (labelWidth) {
      $contextLabelWidth = labelWidth
    }
  }

  $: {
    if (labelAlign) {
      $contextLabelAlign = labelAlign
    }
  }

  $: {
    if (labelDirection) {
      $contextLabelDirection = labelDirection
    }
  }

  /**
   * @type {import('svelte/types/runtime/store').Writable<Record<string, false | string>>}
   */
  const errorStatus = writable(
    Object.keys(value).reduce(
      (obj, f) => ({
        ...obj,
        [f]: false,
      }),
      {}
    )
  )

  setContext(errorStatusKey, errorStatus)

  /**
   * Validate a single field
   * @param {string} f
   */
  const validateSomeField = async f => {
    const validators = rules[f]
    if (!validators) return
    for (let i = 0; i < validators.length; i++) {
      const validator = validators[i]
      const r = await validator(value[f])
      $errorStatus = {
        ...$errorStatus,
        [f]: r,
      }
      if (r) {
        break
      }
    }
  }

  /**
   * Clear a specified field validate status
   * @param {string} f
   */
  const clearSomeField = f => {
    $errorStatus = {
      ...$errorStatus,
      [f]: false,
    }
  }

  setContext(validateSomeFieldKey, validateSomeField)
  setContext(clearSomeFieldKey, clearSomeField)

  /**
   * Validate all fields
   */
  const validateAll = () =>
    new Promise(resolve => {
      validating = true
      const validatorPromises = Object.keys(rules).map(validateSomeField)
      Promise.all(validatorPromises)
        .then(() => {
          if (Object.values($errorStatus).every(v => !v)) {
            resolve(void 0)
          }
        })
        .finally(() => {
          validating = false
        })
    })

  /**
   * Clear all fields validate status
   */
  const clearAll = async () => {
    await tick()
    $errorStatus = Object.keys(value).reduce(
      (obj, f) => ({
        ...obj,
        [f]: false,
      }),
      {}
    )
  }

  export { validateAll, validateSomeField, clearAll, clearSomeField }
</script>

<div
  class={`c-form c-row c-items-center c-wrap c-gutter-${$contextGutterSize}`}
>
  <slot>
    <!-- TODO: generate form with items -->
  </slot>
</div>
