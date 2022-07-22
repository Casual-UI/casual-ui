<script>
  import CDialog from './CDialog.svelte'

  /**
   * The drawer shown status. It is recommended to use
   * @type {boolean}
   */
  export let show = false

  /**
   * The drawer position
   * @type {'left' | 'top' | 'right' | 'bottom'}
   */
  export let position = 'left'

  /**
   * The title of drawer
   */
  export let title = ''

  /**
   * The width of drawer. This prop will only be used when the drawer'position is left or right.
   * @type {string}
   */
  export let width = '20vw'

  /**
   * The content height of drawer. This prop will only be used when the drawer'position is top or left.
   * @type {string=}
   */
  export let bodyHeight = '20vh'

  /**
   * If set to `true`. The popup would be hidden when click the backdrop.
   *
   * This prop is the same as [CPopup](/components/popup)
   */
  export let closeOnClickBackdrop = false

  /**
   * @type {Map<string, 'start' | 'center' | 'end'>}
   */
  const hMap = new Map([
    ['left', 'start'],
    ['top', 'center'],
    ['right', 'end'],
    ['bottom', 'center'],
  ])

  /**
   * @type {Map<string, 'start' | 'center' | 'end'>}
   */
  const vMap = new Map([
    ['left', 'center'],
    ['top', 'start'],
    ['right', 'center'],
    ['bottom', 'end'],
  ])

  $: isLeftOrRight = position === 'left' || position === 'right'
</script>

<CDialog
  {title}
  bind:show
  exchangeAnimationDirection={isLeftOrRight}
  horizontalAlign={hMap.get(position)}
  verticalAlign={vMap.get(position)}
  width={!isLeftOrRight ? '100vw' : width}
  customStyle={isLeftOrRight ? 'height: 100vh;' : ''}
  bodyHeight={!isLeftOrRight ? bodyHeight : undefined}
  {closeOnClickBackdrop}
>
  <!-- The same as [CDialog](/components/dialog) -->
  <slot name="title" slot="title">
    {title}
  </slot>

  <!-- The same as [CDialog](/components/dialog) -->
  <slot slot="close-icon" name="close-icon">
    <div i-majesticons-close />
  </slot>

  <!-- The content of drawer -->
  <slot />
</CDialog>
