import { writable } from 'svelte/store'

export const dark = writable<'on' | 'off'>('off')
