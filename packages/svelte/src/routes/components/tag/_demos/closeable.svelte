<script lang="ts">
  import { CTag, openNotification } from 'casual-ui-svelte'

  function onClose() {
    openNotification({
      title: 'Hi, there',
      theme: 'secondary',
      message: "You've clicked the close icon",
    })
  }
</script>

<CTag label="A closeable tag" theme="secondary" closeable on:close={onClose} />
