<script context="module">
  export const errorStatusKey = Symbol('errorStatus')
  export const validatorsKey = Symbol('validators')
</script>

<script>
  import { useFormProps } from '$lib/hooks/useForm'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { tick } from 'svelte/types/runtime/internal/scheduler'

  /**
   * The whole form data
   * @type {object}
   */
  export let value

  /**
   * The label width of whole form
   * @type {string}
   */
  export let labelWidth = '100px'

  /**
   * The col span of each form item. Total cols are 12.
   * @type {number=}
   */
  export let col = undefined

  /**
   * Label and form component arrangement direction. This prop use [CSS flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)
   * @type {'row' | 'row-reverse' | 'column' | 'column-reverse'}
   */
  export let labelDirection = 'row'

  /**
   * The label itself arrangement direction. This prop use [CSS text-align](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
   * @type {'left' | 'center' | 'right'}
   */
  export let labelAlign = 'left'

  /**
   * The size of whole form. This prop will affect all the components that with the size props.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * The gutte size between label and form component
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let gutterSize = 'md'

  /**
   * The falg that determine form is in validating or not.
   * @type {boolean}
   */
  export let validating = false

  $: formProps = useFormProps({
    labelAlign,
    labelDirection,
    labelWidth,
    size,
    gutterSize,
    col,
  })

  const { contextGutterSize } = formProps

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

  /**
   * @type {import('svelte/types/runtime/store').Writable<((formData: any) => Promise<string | false> | string | false)[]>}
   */
  const validators = writable([])

  setContext(errorStatusKey, errorStatus)

  setContext(validatorsKey, validators)

  const validateAll = () =>
    new Promise(resolve => {
      Promise.all($validators.map(validator => validator(value))).then(() => {
        tick().then(() => {
          if (Object.values($errorStatus).every(v => !v)) {
            resolve(void 0)
          }
        })
      })
    })

  export { validateAll }
</script>

<div
  class={`c-form c-row c-items-center c-wrap c-gutter-${$contextGutterSize}`}
>
  <slot>
    <!-- TODO: generate form with items -->
  </slot>
</div>
