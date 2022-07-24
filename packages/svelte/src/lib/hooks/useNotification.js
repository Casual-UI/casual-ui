import { get, writable } from 'svelte/store'

/**
 * @type {*}
 */
const notifications = writable({
  'start start': {
    x: 'start',
    y: 'start',
    items: [],
  },
  'start center': {
    x: 'start',
    y: 'center',
    items: [],
  },
  'start end': {
    x: 'start',
    y: 'end',
    items: [],
  },
  'center start': {
    x: 'center',
    y: 'start',
    items: [],
  },
  'center center': {
    x: 'center',
    y: 'center',
    items: [],
  },
  'center end': {
    x: 'center',
    y: 'end',
    items: [],
  },
  'end start': {
    x: 'end',
    y: 'start',
    items: [],
  },
  'end center': {
    x: 'end',
    y: 'center',
    items: [],
  },
  'end end': {
    x: 'end',
    y: 'end',
    items: [],
  },
})

let notificationCounter = 0

/**
 *
 * @param {*} positionGroup
 * @param {number} id
 */
const closeByPositionGroupAndID = (positionGroup, id) => {
  const idx = get(notifications)[positionGroup].items.findIndex(
    // @ts-ignore
    noItem => noItem.id === id
  )
  if (idx !== -1) {
    // @ts-ignore
    notifications.update(group => {
      group[positionGroup].items.splice(idx, 1)
      return group
    })
  }
}

/**
 *
 * @param {*} positionGroup
 * @param {*} id
 * @param {*} newContent
 */
const changeContentByPositionGroupAndID = (positionGroup, id, newContent) => {
  const idx = get(notifications)[positionGroup].items.findIndex(
    // @ts-ignore
    noItem => noItem.id === id
  )
  if (idx !== -1) {
    // @ts-ignore
    notifications.update(group => {
      group[positionGroup].items.splice(idx, 1, {
        ...group[positionGroup].items[idx],
        ...newContent,
      })
      return group
    })
  }
}

/**
 *
 * @param {*} params
 * @returns
 */
const open = (
  {
    title,
    message,
    timeout = 3000,
    theme = 'primary',
    alignX = 'end',
    alignY = 'start',
    closeIcon = true,
  } = {
    timeout: 3000,
    theme: 'primary',
    alignX: 'end',
    alignY: 'start',
  }
) => {
  const id = notificationCounter++

  /**
   * @type {*}
   */
  const positionKey = `${alignX} ${alignY}`
  const newItem = {
    title,
    message,
    timeout,
    id,
    theme,
    alignX,
    alignY,
    closeIcon,
  }

  // @ts-ignore
  notifications.update(group => {
    if (positionKey.startsWith('end')) {
      group[positionKey].items.unshift(newItem)
    } else {
      group[positionKey].items.push(newItem)
    }
    return group
  })

  const close = () => closeByPositionGroupAndID(positionKey, id)

  /**
   * @type {NodeJS.Timeout}
   */
  let flag

  if (timeout && timeout > 0) {
    flag = setTimeout(close, timeout)
  }

  /**
   *
   * @param {*} content
   */
  const changeContent = content => {
    changeContentByPositionGroupAndID(positionKey, id, content)
    const { timeout } = content
    if (timeout && timeout > 0) {
      if (flag) {
        clearTimeout(flag)
        flag = setTimeout(close, timeout)
      }
    }
  }

  return { close, changeContent }
}

export {
  open,
  closeByPositionGroupAndID,
  notifications,
  changeContentByPositionGroupAndID,
}
