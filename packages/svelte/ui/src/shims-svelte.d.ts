declare namespace svelte.JSX {
  import type { AttributifyAttributes } from '@unocss/preset-attributify'
  interface HTMLAttributes<T> extends AttributifyAttributes {
    [key: string]: any
  }
}
