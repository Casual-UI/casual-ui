<script>
  import { useFormProps } from '$lib/hooks/useForm'
  import useSize from '$lib/hooks/useSize'
  import CCheckbox from './CCheckbox.svelte'

  /**
   * Checkbox group current value. It is recommended to use `bind:value`.
   * @type {any[]}
   */
  export let value = []

  /**
   * The options array.
   * @type {Array<{ label: string; value: any; [k: string]: any }>}
   */
  export let options = []

  /**
   * The size of every item.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * The size of every item.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let gutterSize = undefined

  const { contextGutterSize } = useFormProps({ gutterSize })

  useSize(size)

  /**
   * @param {*} val
   */
  const onChange = val => {
    const idx = value.findIndex(v => v === val)
    if (idx === -1) {
      value = [...value, val]
    } else {
      value.splice(idx, 1)
      value = value
    }
  }
</script>

<div
  class={`c-checkbox-group c-row c-items-center c-wrap c-gutter-${$contextGutterSize}`}
>
  {#each options as op}
    <div>
      <CCheckbox
        label={op.label}
        checkedValue={op.value}
        value={value.find(v => v === op.value)}
        on:change={() => onChange(op.value)}
      />
    </div>
  {/each}
</div>
