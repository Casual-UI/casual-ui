declare module '*.vue' {
  import type { Component } from 'vue'
  const comp: Component
  export default comp
}

interface Window extends globalThis {
  monaco: any
}

declare namespace React.JSX {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    class?: any
    style?: CSSProperties | string
  }
  interface DetailedHTMLProps<T> {
    name?: string
    [key: string]: any
  }
  interface IntrinsicElements {
    [key: string]: any
  }
}
