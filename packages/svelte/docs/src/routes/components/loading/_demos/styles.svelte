<script lang="ts">
  import CLoading from 'casual-ui-svelte/src/components/CLoading.svelte'
  import InlineCode from '../../_components/InlineCode.svelte'
</script>

<ul fs-14 leading-6>
  <li>
    Use CSS attribute <InlineCode>font-size</InlineCode>to set the loading size
  </li>
  <li>
    Use <InlineCode>thickness</InlineCode> prop to set the loading circle bar thickness
  </li>
  <li>
    Use CSS attribute <InlineCode>color</InlineCode>to set the loading color
  </li>
</ul>

<div flex gap-4 items-center>
  <CLoading style="font-size: 2em;color: pink;" />
  <CLoading style="font-size: 4em;color: cyan;" thickness={7} />
  <CLoading style="font-size: 8em;color: purple;" thickness={10} />
</div>
