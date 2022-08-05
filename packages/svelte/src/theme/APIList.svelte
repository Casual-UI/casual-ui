<script lang="ts">
  import Description from './Description.svelte'

  import Doc from './Doc.svelte'
  import InlineCode from './InlineCode.svelte'
  import VariableName from './VariableName.svelte'

  export let title = ''

  export let id: string

  export let apiList: Array<any> = []

  export let isSlot = false

  export let isProp = false
</script>

<Doc {title} {id} hideSandboxIcon pb-2 hideEditIcon>
  {#if apiList.length}
    <ul m-0 fs-14>
      {#each apiList as { defaultValue, name, type, description, params }}
        <li mb-4>
          <div flex items-center flex-wrap>
            <VariableName>
              {name}
            </VariableName>
            {#if isProp}
              <div mx-2>
                <InlineCode>
                  {type?.text}
                </InlineCode>
              </div>
              <span>default: <InlineCode>{defaultValue}</InlineCode></span>
            {/if}
            <Description>
              {@html description}
            </Description>
          </div>
          {#if isSlot && params && params.length}
            <p><b>Bindings:</b></p>
            <ul>
              {#each params as param}
                <li mb-4>
                  <VariableName>
                    {param.name}
                  </VariableName>
                  <InlineCode>
                    {param.type.text}
                  </InlineCode>
                  <Description>
                    {@html param.description}
                  </Description>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  {:else}
    <div text-t-2 px-4 pb-4 dark:text-8c8c8c>No data</div>
  {/if}
</Doc>
