<script lang="ts">
  import { CButton, openNotification } from 'casual-ui-svelte'
</script>

<CButton
  label="Click to open notification"
  on:click={() =>
    openNotification({
      title: 'Hi, there',
      message: 'This is a notification withuot close icon',
      timeout: 0,
    })}
/>
