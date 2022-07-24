<script lang="ts">
  import { CButton, openNotification } from 'casual-ui-svelte'

  const onClick = () => {
    const { changeContent } = openNotification({
      title: 'Hi, there',
      message: "You've got a new notification",
      timeout: 10000,
    })
    setTimeout(() => {
      changeContent({
        title: 'Hi, there',
        message: 'Message changed!',
        theme: 'secondary',
      })
    }, 3000)

    setTimeout(() => {
      changeContent({
        title: 'Hi, there',
        message: 'Message changed again!',
        theme: 'warning',
      })
    }, 6000)

    setTimeout(() => {
      changeContent({
        title: 'Hi, there',
        message: 'About to close notification',
        theme: 'negative',
      })
    }, 9000)
  }
</script>

<CButton label="Click to open notification" on:click={onClick} />
