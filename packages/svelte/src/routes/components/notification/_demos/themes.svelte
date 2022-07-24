<script lang="ts">
  import { CButton, openNotification } from 'casual-ui-svelte'

  function openWithTheme(
    theme: 'primary' | 'secondary' | 'warning' | 'negative' = 'primary'
  ) {
    openNotification({
      title: 'Hi, there',
      message: "You've got a new notification",
      theme,
    })
  }
</script>

<CButton label="Primary (default)" on:click={() => openWithTheme()} />

<CButton
  label="Secondary"
  theme="secondary"
  on:click={() => openWithTheme('secondary')}
/>
<CButton
  label="Warning"
  theme="warning"
  on:click={() => openWithTheme('warning')}
/>
<CButton
  label="Negative"
  theme="negative"
  on:click={() => openWithTheme('negative')}
/>
