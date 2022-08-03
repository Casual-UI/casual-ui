<script>
  import { useValidator } from '$lib/hooks/useForm'
  import useSize from '$lib/hooks/useSize'
  import bem from '$lib/utils/bem'
  import clsx from '$lib/utils/clsx'
  import { createEventDispatcher } from 'svelte'
  import CLoading from '../CLoading.svelte'

  const dispatch = createEventDispatcher()

  /**
   * The input value. It is recommended to use `bind:value`.
   * @type {string | number}
   */
  export let value = ''

  /**
   * Determine the input disabled status.
   * @type {boolean}
   */
  export let disabled = false

  /**
   * The size of input. Notice that the default value is `md` not `undefined`.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}q
   */
  export let size = undefined

  /**
   * The placeholder of input dom.
   * @type {string=}
   */
  export let placeholder = ''

  /**
   * Determine whether the input has a rounded border or not.
   * ::: tip TIP
   * Notice that rounded border size will be along with input `size` prop.
   * :::
   * @type {boolean}
   */
  export let rounded = false

  /**
   * Determien whether the input is in loading status or not.
   */
  export let loading = false

  /**
   * Determine the input has a clear icon which can be clicked to clear the input value.
   * @type {boolean}
   */
  export let clearable = false

  /**
   * Determine whether the input is readonly or not.
   */
  export let readonly = false

  /**
   * Determine whether the input has a divider between prefix content and value or not.
   * @type {boolean}
   */
  export let prefixDivider = true

  /**
   * Determine whether the input has a divider between suffix content and value or not.
   * @type {boolean}
   */
  export let suffixDivider = true

  /**
   * Determine whethter the input is focused or not. It is recommended to use `bind:focus`
   * * @type {boolean}
   */
  export let focused = false

  /**
   * Dose input auto blur.
   * @type {boolean}
   */
  export let autoBlur = true

  /**
   * The type of input.
   * @type {'text' | 'password'}
   */
  export let type = 'text'

  /**
   * If set to `true`. The input will not change its' border, background, text color when focused , hover or blur. <br /> It is useful when you want to customize the input color style.
   * @type {boolean}
   */
  export let customColor = false

  /**
   * The validate timing of input. It is only used when CInput is used in CForm and CFormItem context.
   * @type {'change' | 'blur' | 'focus' | 'manual'}
   */
  export let validateTrigger = 'blur'

  /**
   * Determine whether the input would clear validate status when focused or not.
   * @type {boolean}
   */
  export let clearValidateOnFocus = true

  const { hasError, clearCurrent, validateCurrent } = useValidator()

  const contextSize = useSize(size)

  /**
   * @type {HTMLInputElement}
   */
  let inputDom

  const focusInput = () => {
    inputDom && inputDom.focus()
  }

  const onFocus = () => {
    if (clearValidateOnFocus) {
      clearCurrent && clearCurrent()
    }
    focused = true
  }

  const onBlur = () => {
    if (autoBlur) {
      focused = false
    }
    if (validateTrigger === 'blur') {
      validateCurrent && validateCurrent()
    }
  }

  const onClearIconClick = () => {
    value = ''
    /**
     * Clear icon click emit.
     */
    dispatch('clear')
  }
</script>

<div
  class={clsx(
    bem('input', {
      customColor,
      focused,
      disabled,
      readonly,
      loading,
      hasError: $hasError,
    }),
    `c-font-${$contextSize}`,
    rounded && `c-rounded-${$contextSize}`,
    `c-h-${$contextSize}`,
    `c-px-${$contextSize}`
  )}
>
  <div class="c-input--content-wrapper">
    <div
      class={clsx(
        'c-input--prefix',
        prefixDivider && 'c-input--prefix-with-divider',
        $$slots.prefix && 'c-pr-sm c-input--prefix-with-content'
      )}
      on:click={focusInput}
    >
      <!-- Customize prefix content -->
      <slot name="prefix" />
    </div>
    <div class="c-input--input-wrapper">
      {#if type === 'text'}
        <input
          bind:this={inputDom}
          bind:value
          type="text"
          class={clsx($$slots.prefix && 'c-pl-sm', $$slots.suffix && 'c-pr-sm')}
          {placeholder}
          {disabled}
          readonly={readonly || loading}
          on:focus={onFocus}
          on:blur={onBlur}
        />
      {/if}
    </div>
    {#if clearable}
      <div
        class={clsx(
          'c-input--clear-icon',
          $$slots.suffix || (loading && 'c-mr-sm'),
          value && 'c-input--clear-icon-show'
        )}
        on:click|stopPropagation={onClearIconClick}
      >
        <div i-mdi-close-circle-outline />
      </div>
    {/if}

    <div
      class={clsx(
        'c-input--suffix',
        suffixDivider && 'c-input--suffix-with-divider',
        $$slots.suffix && 'c-pl-sm c-input--suffix-with-content'
      )}
      on:click={focusInput}
    >
      <div class={clsx(loading && 'c-mr-sm')}>
        <!-- Customize suffix content -->
        <slot name="suffix" />
      </div>
      <!-- Customize loading content -->
      <slot name="loading">
        {#if loading}
          <CLoading />
        {/if}
      </slot>
    </div>
  </div>
</div>
