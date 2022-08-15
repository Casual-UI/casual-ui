import { useState, useEffect } from 'react'
import {
  createNotificationGroups,
  NotificationGroups,
  Notification,
  PositionGroup,
} from 'casual-types'

let notificationListeners: any[] = []

const notifications: NotificationGroups = createNotificationGroups()

// global notification counter
// also the unique id
let notificationsCounter = 0

const notifyAll = () => {
  notificationListeners.forEach(listener =>
    listener(JSON.parse(JSON.stringify(notifications)))
  )
}
const closeByPositionGroupAndID = (
  positionGroup: PositionGroup,
  id: number
) => {
  const idx = notifications[positionGroup].items.findIndex(
    noItem => noItem.id === id
  )
  if (idx !== -1) {
    notifications[positionGroup].items.splice(idx, 1)
    notifyAll()
  }
}

const changeContentByPositionGroupAndID = (
  positionGroup: PositionGroup,
  id: number,
  newContent: Pick<
    Notification,
    'message' | 'title' | 'closeIcon' | 'theme' | 'timeout'
  >
) => {
  const idx = notifications[positionGroup].items.findIndex(
    noItem => noItem.id === id
  )
  if (idx !== -1) {
    notifications[positionGroup].items.splice(idx, 1, {
      ...notifications[positionGroup].items[idx],
      ...newContent,
    })
    notifyAll()
  }
}

const open = (
  {
    title,
    message,
    timeout = 3000,
    closeIcon = true,
    theme = 'primary',
    alignX = 'end',
    alignY = 'start',
  }: Omit<Notification, 'id'> = {
    timeout: 3000,
    theme: 'primary',
    alignX: 'end',
    alignY: 'start',
  }
) => {
  const id = ++notificationsCounter
  const positionKey = `${alignX} ${alignY}` as PositionGroup
  const newItem = {
    title,
    message,
    id,
    theme,
    closeIcon,
    alignX,
    alignY,
    timeout,
  }
  if (positionKey.endsWith('end')) {
    notifications[positionKey].items.unshift(newItem)
  } else {
    notifications[positionKey].items.push(newItem)
  }
  notifyAll()

  const close = () => closeByPositionGroupAndID(positionKey, id)
  let flag: NodeJS.Timeout
  if (timeout > 0) {
    flag = setTimeout(close, timeout)
  }
  return {
    close,
    changeContent: (
      content: Pick<
        Notification,
        'message' | 'title' | 'closeIcon' | 'theme' | 'timeout'
      >
    ) => {
      changeContentByPositionGroupAndID(positionKey, id, content)
      const { timeout } = content
      if (timeout && timeout > 0) {
        if (flag) {
          clearTimeout(flag)
          flag = setTimeout(close, timeout)
        }
      }
    },
  }
}
const useNotification = () => {
  const [innerNotifications, setNotifications] =
    useState<NotificationGroups>(notifications)

  useEffect(() => {
    notificationListeners.push(setNotifications)

    return () => {
      notificationListeners = notificationListeners.filter(
        listener => listener !== setNotifications
      )
    }
  }, [])

  return {
    open,
    closeByPositionGroupAndID,
    changeContentByPositionGroupAndID,
    notifications: innerNotifications,
  }
}

export default useNotification
