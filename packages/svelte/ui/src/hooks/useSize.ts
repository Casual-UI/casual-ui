import type { CSize } from 'casual-types'
import { getContext, hasContext } from 'svelte'

export default (size?: CSize) =>
  hasContext('c-size') ? (size ? size : getContext('c-size')) : 'md'
