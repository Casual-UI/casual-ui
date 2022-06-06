declare module '*.vue' {
  import type { Component } from 'vue'
  const comp: Component
  export default comp
}

interface Window extends globalThis {
  CodeMirror: any
}
