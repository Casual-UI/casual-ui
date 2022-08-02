<script>
  import useClickOutside from '$lib/hooks/useClickOutside'

  import { useValidator } from '$lib/hooks/useForm'
  import useSize from '$lib/hooks/useSize'
  import bem from '$lib/utils/bem'
  import clsx from '$lib/utils/clsx'
  import { onMount, tick } from 'svelte'
  import CDropdown from '../CDropdown.svelte'
  import CList from '../CList.svelte'
  import CTag from '../CTag.svelte'
  import CInput from './CInput.svelte'

  /**
   * The placeholder text. Same as [CInput](/components/CInput)
   * @type {string}
   */
  export let placheholder = ''

  /**
   * The size of select. Notice that default value is `'md'` instead of `undefined`
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * The selected value(s).
   * @type {*}
   */
  export let value = ''

  /**
   * The select options
   * @type {{ label: string; value: string | number; [key: string]: any }[]}
   */
  export let options = []

  /**
   * Determine the select can select muliple choices
   */
  export let multiple = false

  /**
   * Determine whether the select has a clear icon when selected selection is not empty
   * @type {boolean}
   */
  export let clearable = false

  /**
   * Determine whether the select is diabled or not.
   * @type {boolean}
   */
  export let disabled = false

  /**
   * Determine whether the select has a rounded border or not.
   * @type {boolean}
   */
  export let rounded = false

  /**
   * Determine whether validate current form item on dropdown fold.
   * @type {boolean}
   */
  export let validateOnFold = true

  /**
   * @type {HTMLDivElement}
   */
  let selectDom

  /**
   * @type {HTMLDivElement}
   */
  let tagsContainer

  if (multiple && !Array.isArray(value)) {
    value = []
  }

  let inputValue = value

  let focused = false

  let selectDomHeight = -1

  let initialSelectDomHeight = -1

  $: contextSize = useSize(size)

  $: realPlaceholder = multiple
    ? value.length > 0
      ? ''
      : placheholder
    : placheholder

  $: selectDomStyle = selectDomHeight < 0 ? '' : `height:${selectDomHeight}px`

  $: selectedMultipleOptions = !multiple
    ? []
    : options.filter(op => value.some((/** @type {any} */ v) => v === op.value))

  const { hasError, clearCurrent, validateCurrent } = useValidator()

  const onSelectClick = () => {
    if (disabled) return
    if (multiple) {
      focused = !focused
    }
  }

  const onClear = () => {
    if (multiple) {
      value = []
      return
    }
    value = ''
  }

  const onArrowClick = () => {
    if (disabled) return
    if (!multiple) {
      focused = !focused
    }
  }

  /**
   *
   * @param {object} item
   * @param {string} item.label
   * @param {string | number} item.value
   */
  const onItemClick = item => {
    if (multiple && Array.isArray(value)) {
      const idx = value.findIndex((/** @type {any} */ v) => v === item.value)
      if (idx === -1) {
        value = [...value, item.value]
      } else {
        value.splice(idx, 1)
        value = value
      }
      return
    }
    value = item.value
    focused = false
  }

  $: isItemActive = (/** @type {{ value: any; }} */ item) => {
    if (multiple && Array.isArray(value)) {
      return value.some((/** @type {any} */ v) => v === item.value)
    }
    return item.value === value
  }

  const clickOutside = useClickOutside({
    cbOutside: () => {
      if (!focused) return
      focused = false
      if (validateOnFold && validateCurrent) {
        validateCurrent()
      }
    },
  })

  const recomputedSelectHeight = async () => {
    if (multiple && tagsContainer) {
      await tick()
      const newHeight = tagsContainer.clientHeight
      if (newHeight > initialSelectDomHeight) {
        selectDomHeight = newHeight
        return
      }
      selectDomHeight = initialSelectDomHeight
      return
    }
    const target = options.find(item => item.value === value)
    inputValue = target ? target.label : ''
  }

  $: {
    value
    recomputedSelectHeight()
  }

  onMount(() => {
    initialSelectDomHeight = selectDom.clientHeight
  })
</script>

<CDropdown manual bind:show={focused} {disabled}>
  <div
    bind:this={selectDom}
    class={clsx(
      bem('select', {
        disabled,
        focused,
        rounded,
        hasError: $hasError,
      }),
      rounded && `c-rounded-${$contextSize}`
    )}
    use:clickOutside
  >
    <div
      class="c-select--input-wrapper"
      style={selectDomStyle}
      on:click={onSelectClick}
    >
      {#if multiple}
        <div
          class={`c-select--placeholder c-font-${$contextSize} c-h-${$contextSize} c-px-${$contextSize}`}
        >
          {realPlaceholder}
        </div>
      {:else}
        <CInput
          bind:focused
          value={inputValue}
          {disabled}
          {clearable}
          placeholder={realPlaceholder}
          suffixDivider={false}
          customColor
          validateTrigger="manual"
          autoBlur={false}
          readonly
          on:clear={onClear}
        />
      {/if}
      <div
        class={clsx(
          'c-select--arrow',
          `c-mr-${$contextSize}`,
          focused && 'c-select--arrow-show-options'
        )}
        on:click|stopPropagation={onArrowClick}
      >
        <div i-ph-caret-down-light class="c-icon" />
      </div>
      {#if multiple}
        <div bind:this={tagsContainer} class="c-select--multiple-tags c-px-sm">
          {#each selectedMultipleOptions as { label, value }}
            <div>
              <CTag
                {label}
                size="xs"
                rounded
                closeable
                on:close={() => onItemClick({ label, value })}
              />
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <div slot="drop-content" class={`c-py-${$contextSize}`}>
    <CList
      items={options}
      activeFn={isItemActive}
      clickable
      on:item-click={e => onItemClick(e.detail)}
    />
  </div>
</CDropdown>
