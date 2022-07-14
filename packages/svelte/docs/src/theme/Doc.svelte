<script lang="ts">
  import { CExpansion } from 'casual-ui-svelte'
  import defaultDocCode from './defaultDocCode'
  import Link from './Link.svelte'

  export let code = defaultDocCode
  export let component: any
  export let title = ''
  export let id = ''
</script>

<div border-e9e9e9 border-1 rounded-2 bg-white mb-6 {id}>
  <div
    flex
    justify-between
    items-center
    bg-f9f9f9
    rounded-t-2
    pt-4
    px-4
    text-5
    font-bold
    pb-5
  >
    <Link to={`#${id}`}>
      {title}
    </Link>
  </div>
  <div p-4>
    <svelte:component this={component} />
  </div>
  <CExpansion title="Expand/Fold Code">
    <div>
      {@html code}
    </div>
    <div i-vscode-icons-file-type-svelte slot="icon" />
  </CExpansion>
</div>
