<script lang="ts">
  import Attention from '$theme/Attention.svelte'
  import { CInput } from 'casual-ui-svelte'

  let value = ''
</script>

<div class="c-flex c-gutter-md c-wrap">
  <div>
    <CInput {value} placeholder="xs" size="xs" />
  </div>
  <div>
    <CInput {value} placeholder="sm" size="sm" />
  </div>
  <div>
    <CInput {value} placeholder="md (default)" />
  </div>
  <div>
    <CInput {value} placeholder="lg" size="lg" />
  </div>
  <div>
    <CInput {value} placeholder="xl" size="xl" />
  </div>
  <div>
    <CInput {value} placeholder="xs" rounded size="xs" />
  </div>
  <div>
    <CInput {value} placeholder="sm" size="sm" rounded />
  </div>
  <div>
    <CInput {value} placeholder="md (default)" rounded />
  </div>
  <div>
    <CInput {value} placeholder="lg" size="lg" rounded />
  </div>
  <div>
    <CInput {value} placeholder="xl" size="xl" rounded />
  </div>
</div>
