<script lang="ts">
  import CButton from '$lib/components/CButton.svelte'
  import { openNotification } from 'casual-ui-svelte'
</script>

<CButton
  label="Click to open notification"
  on:click={() =>
    openNotification({
      timeout: 0,
      title: 'Hi, there',
      message: "You've got a new notification",
    })}
/>
