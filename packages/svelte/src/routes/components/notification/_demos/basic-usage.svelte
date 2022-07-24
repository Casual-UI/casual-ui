<script lang="ts">
  import { CButton, openNotification } from 'casual-ui-svelte'
</script>

<CButton
  label="Click to open notification"
  on:click={() =>
    openNotification({
      title: 'Hi, there',
      message: "You've got a new notification",
    })}
/>
