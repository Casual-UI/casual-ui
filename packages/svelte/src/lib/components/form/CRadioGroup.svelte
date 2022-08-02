<script>
  import { useFormProps, useValidator } from '$lib/hooks/useForm'
  import useSize from '$lib/hooks/useSize'
  import { tick } from 'svelte'
  import CRadio from './CRadio.svelte'

  /**
   * Current value. It is recommended to use `bind:value`.
   * @type {string | number=}
   */
  export let value = undefined

  /**
   * The options array.
   * @type {Array<{ label: string; value: string | number }>}
   */
  export let options = []

  /**
   * The size of all radios in this group.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * The gutter size between each radio.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let gutterSize = undefined

  /**
   * If this group is in a Form context. Set this prop to `true` will validate current field when selection change.
   * @type {boolean}
   */
  export let validateOnChange = true

  const { contextGutterSize } = useFormProps({ gutterSize })

  const { validateCurrent } = useValidator()

  const mayValidate = async () => {
    if (validateOnChange) {
      await tick()
      validateCurrent && validateCurrent()
    }
  }
  useSize(size)
</script>

<div class={`c-flex c-items-center c-wrap c-gutter-x-${$contextGutterSize}`}>
  {#each options as op}
    <div>
      <CRadio
        bind:value
        selectedValue={op.value}
        label={op.label}
        on:change={mayValidate}
      />
    </div>
  {/each}
</div>
