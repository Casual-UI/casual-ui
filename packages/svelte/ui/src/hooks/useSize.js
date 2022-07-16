import { getContext, hasContext } from 'svelte'

export default size =>
  size ? size : hasContext('c-size') ? getContext('c-size') : 'md'
