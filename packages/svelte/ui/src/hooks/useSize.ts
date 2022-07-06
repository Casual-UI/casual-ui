import type { CSize } from 'casual-types'
import { getContext, hasContext } from 'svelte'

export default (size?: CSize) =>
  size ? size : hasContext('c-size') ? getContext('c-size') : 'md'
