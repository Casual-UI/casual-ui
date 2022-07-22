import { writable } from 'svelte/store'

const notifications = writable([])

let notificationCounter = 0

/**
 * @params {import('')}
 */
const open = (
  { title = '', timeout, theme, x, y } = {
    timeout: 3000,
    theme: 'primary',
    x: 'end',
    y: 'start',
  }
) => {}
