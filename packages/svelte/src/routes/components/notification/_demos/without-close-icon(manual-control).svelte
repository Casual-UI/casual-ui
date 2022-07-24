<script lang="ts">
  import { CButton, openNotification } from 'casual-ui-svelte'

  let closeNotification: (() => void) | null

  const onClick = () => {
    if (!closeNotification) {
      const { close } = openNotification({
        title: 'Hi, there',
        message: 'This is a notification withuot close icon',
        closeIcon: false,
        timeout: 0,
      })
      closeNotification = close
    } else {
      closeNotification()
      closeNotification = null
    }
  }
</script>

<CButton
  theme={closeNotification ? 'negative' : 'primary'}
  label={`Click to ${closeNotification ? 'close' : 'open'} notification`}
  on:click={onClick}
/>
