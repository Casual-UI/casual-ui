<script>
  import { useHorizontal, useVertical } from '$lib/hooks/usePosition'
  import clsx from '$lib/utils/clsx'
  import CPopup from './CPopup.svelte'
  import CButton from './CButton.svelte'
  import { onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  /**
   * Determine the dialog is shown or not. It's recommended to use `bind:show`
   * @type {boolean}
   */
  export let show = false

  /**
   * The title of the dialog
   * @type {string}
   */
  export let title = ''

  /**
   * The width of the whole dialog. Can be any logical HTML unit. For example: `'200px'` `'20vw'`
   * @type {string}
   */
  export let width = '40vw'

  /**
   * The body height of the dialog, which doesn't contain the header and the footer that action buttons in.
   * @type {string}
   */
  export let bodyHeight = 'auto'

  /**
   * Determine the body has a padding or not
   * @type {boolean}
   */
  export let bodyPadding = true

  /**
   * Determine the dialog has a rounded border or not
   */
  export let rounded = true

  /**
   * Determine the close icon is shown or not
   * @type {boolean}
   */
  export let closeIcon = true

  /**
   * The horizontal align position.
   *
   * ::: tip TIP
   * CDialog is implemented based on [CPopup](/components/popup)
   *
   * So, this prop and `verticalAlign` prop below is the same with CPopup
   * :::
   *
   * @type {'start' | 'center' | 'end' | undefined}
   */
  export let horizontalAlign = undefined

  /**
   * See above
   * @type {'start' | 'center' | 'end' | undefined}
   */
  export let verticalAlign = undefined

  /**
   * Customize class names
   * @type {string}
   */
  export let customClass = ''

  /**
   * Customize styles
   * @type {string}
   */
  export let customStyle = ''

  /**
   * Customize body styles
   * @type {string}
   */
  export let customBodyStyle = ''

  /**
   * Determine the whether cancel button is shown or not
   * @type {boolean}
   */
  export let showCancelBtn = false

  /**
   * The cancel button label
   * @type {string}
   */
  export let cancelBtnLabel = 'Cancel'

  /**
   * Determine the whether confirm button is shown or not
   * @type {boolean}
   */
  export let showConfirmBtn = false

  /**
   * The confirm button label
   * @type {string}
   */
  export let confirmBtnLabel = 'Confirm'

  /**
   * Exchange the animation order.
   *
   * The origin animation order is horizontal first then the vertical
   *
   * If set to `true`, the dialog animation will excute vertical first then the horizontal
   */
  export let exchangeAnimationDirection = false

  /**
   * Close the dialog when the Esc key pressed
   * @type {boolean}
   */
  export let closeOnEsc = true

  $: hAlign = useHorizontal(horizontalAlign)
  $: vAlign = useVertical(verticalAlign)

  $: roundedClass = new Map([
    ['start start', `c-rounded-br-md`],
    ['start center', 'c-rounded-r-md'],
    ['start end', 'c-rounded-tr-md'],
    ['center start', 'c-rounded-b-md'],
    ['center center', 'c-rounded-md'],
    ['center end', 'c-rounded-t-md'],
    ['end start', 'c-rounded-bl-md'],
    ['end center', 'c-rounded-l-md'],
    ['end end', 'c-rounded-tl-md'],
  ]).get(`${$hAlign} ${$vAlign}`)

  $: enterClassName = exchangeAnimationDirection
    ? 'c-dialog-reverse-enter-active'
    : 'c-dialog-enter-active'
  $: leaveClassName = exchangeAnimationDirection
    ? 'c-dialog-reverse-leave-active'
    : 'c-dialog-leave-active'

  /**
   * @param {*} node
   * @param {*} params
   */
  const dialog = (node, params) => {
    if (params.out) {
      return {
        delay: 0,
        duration: 0,
      }
    }
    return {
      delay: 0,
      duration: 300,
    }
  }

  let inTransition = false
  let outTransition = false

  /**
   *
   * @param {*} e
   */
  const listenKeyboard = e => {
    if (e.key === 'Escape' && show && closeOnEsc) {
      show = false
    }
  }
  onMount(() => {
    window.addEventListener('keyup', listenKeyboard)
    return () => {
      window.removeEventListener('keyup', listenKeyboard)
    }
  })
</script>

<CPopup bind:show customClass="c-popup--dialog">
  {#if show}
    <div
      in:dialog
      out:dialog={{ out: true }}
      on:introstart={() => (inTransition = true)}
      on:introend={() => {
        inTransition = false
        /**
         * Emit when the open transition is done
         */
        dispatch('opened')
      }}
      on:outrostart={e => {
        // @ts-ignore
        e.target && e.target.classList.add(leaveClassName)
      }}
      on:outroend={e => {
        // @ts-ignore
        e.target && e.target.classList.add('c-dialog-exit')
      }}
      class={clsx(
        'c-dialog',
        rounded && roundedClass,
        inTransition && enterClassName,
        outTransition && leaveClassName,
        customClass
      )}
      style:width
      style={customStyle}
    >
      <div class="c-dialog--header">
        <!-- 
          Customize the header content  
          This slot can override the title prop and the default close icon 
        -->
        <slot name="header">
          <div class="c-dialog--title">
            <!-- Customize the title content. This slot can override the title prop -->
            <slot name="title">
              {title}
            </slot>
          </div>
          {#if closeIcon}
            <div
              class="c-dialog--close-btn"
              on:click={() => {
                show = false
              }}
            >
              <!-- Customize the close icon -->
              <slot name="close-icon">
                <div i-majesticons-close />
              </slot>
            </div>
          {/if}
        </slot>
      </div>
      <div
        class={clsx('c-dialog--content', bodyPadding && 'c-px-md c-pb-md')}
        style={customBodyStyle}
        style:height={bodyHeight}
      >
        <!-- The default content of dialog -->
        <slot />
      </div>
      <div class="c-dialog--footer">
        <!-- 
          Customize footer content of dialog 
          This slot would override the confirm and cancel button 
        -->
        <slot name="footer">
          <div class="c-row c-gutter-x-sm">
            <!-- Customize the footer actions -->
            <slot name="actions">
              <div>
                {#if showCancelBtn}
                  <CButton
                    label={cancelBtnLabel}
                    outlined
                    {rounded}
                    on:click={() => {
                      /**
                       * Emit when the default cancel button clicked
                       */
                      dispatch('cancel')
                    }}
                  />
                {/if}
              </div>
              <div>
                {#if showConfirmBtn}
                  <CButton
                    label={confirmBtnLabel}
                    {rounded}
                    on:click={() => {
                      /**
                       * Emit when the default confirm button clicked
                       */
                      dispatch('confirm')
                    }}
                  />
                {/if}
              </div>
            </slot>
          </div>
        </slot>
      </div>
    </div>
  {/if}
</CPopup>
