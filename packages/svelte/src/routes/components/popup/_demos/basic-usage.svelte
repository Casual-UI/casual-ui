<script lang="ts">
  import { CButton, CPopup } from 'casual-ui-svelte'

  let show = false
</script>

<CButton label="Click me to show popup" on:click={() => (show = true)} />

<CPopup {show}>
  <div bg-white p-4 rounded-2 w-80>
    <div pb-4 border-b border-gray-3 flex justify-between items-center>
      <div font-bold>Some Title</div>
      <div
        i-material-symbols-close
        cursor-pointer
        hover:text-gray
        on:click={() => (show = false)}
      />
    </div>
    <div text-gray-6>
      <p>Some description</p>
    </div>
    <div flex justify-end>
      <CButton rounded label="A Button" />
    </div>
  </div>
</CPopup>
