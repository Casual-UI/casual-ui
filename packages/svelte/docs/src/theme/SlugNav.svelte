<script lang="ts">
  import { session } from '$app/stores'

  import { onMount } from 'svelte'

  import Link from './Link.svelte'
  import debounce from './utils/debounce'

  let scrollY: number

  let activeIdx = -1

  export let demos: any = []

  $: {
    scrollY

    computeActiveId()
  }

  const computeActiveId = debounce(() => {
    if (!targetPositions.length) return
    const baseTop = targetPositions[0][1] + 72
    for (let i = 0; i < targetPositions.length; i++) {
      const [, pos] = targetPositions[i]
      if (i < targetPositions.length - 1) {
        const [, nextPos] = targetPositions[i + 1]
        if (scrollY >= pos - baseTop && scrollY < nextPos - baseTop) {
          activeIdx = i + 1
          break
        }
      } else {
        if (scrollY >= pos) {
          activeIdx = i + 1
          break
        }
      }
    }
    if (activeIdx > 0) {
      window.history.pushState({}, '', `#${targetPositions[activeIdx - 1][0]}`)
    }
  })

  let targetPositions: [string, number][] = []

  const addtionItems = [
    {
      title: 'Props',
      name: 'props',
    },
  ]

  onMount(() => {
    computedTargetPositions()
  })

  export function computedTargetPositions() {
    targetPositions = (
      [...demos, ...addtionItems] as {
        name: string
        title: string
        comp: any
      }[]
    ).map<[string, number]>(
      ({ name }) => [name, document.getElementById(name)?.offsetTop ?? 0],
      []
    )
  }
</script>

<svelte:window bind:scrollY />

<ul m-o p-0 list-none fs-14 leading-7 border-l border-e9e9e9 relative>
  {#if activeIdx > 0}
    <div
      absolute
      left-0
      h-7
      w-full
      bg-primary
      bg-opacity-10
      border-l-2
      border-primary
      transition
      transition-top
      class="active-indicator"
      style={`top: calc(${activeIdx} * 1.75rem)`}
    />
  {/if}
  <li font-bold pl-4>On this page</li>
  {#each [...demos, ...addtionItems] as demo}
    <li pl-4>
      <Link to={`#${demo.name}`} computeActiveByPageUrl={false}>
        <div>
          {demo.title}
        </div>
      </Link>
    </li>
  {/each}
</ul>

<style>
  .active-indicator {
    transform: translateX(-1px);
  }
</style>
