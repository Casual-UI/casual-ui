/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}
declare namespace svelte.JSX {
  import type { AttributifyAttributes } from '@unocss/preset-attributify'
  interface HTMLAttributes<T> extends AttributifyAttributes {
    [key: string]: any
  }
}

interface Window extends globalThis {
  MonacoEnvironment: any
  monaco: any
}

declare module 'markdown-it-container' {
  const mic: any
  export default mic
}
