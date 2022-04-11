import {
  NotificationGroups,
  PositionGroup,
  Notification,
  createNotificationGroups,
} from 'casual-types'
import { useScreen } from 'casual-ui-vue'
import { reactive, Plugin } from 'vue'

let notificationsCounter = 0
const notifications = reactive<NotificationGroups>(createNotificationGroups())

const closeByPositionGroupAndID = (
  positionGroup: PositionGroup,
  id: number
) => {
  const idx = notifications[positionGroup].items.findIndex(
    noItem => noItem.id === id
  )
  if (idx !== -1) {
    notifications[positionGroup].items.splice(idx, 1)
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
  }
}

const open = (
  {
    title,
    message,
    timeout = 3000,
    closeIcon = true,
    theme = 'primary',
    alignX = (() => {
      const { is: { mobile } } = useScreen()
      return mobile() ? 'center' : 'end'
    })(),
    alignY = 'start',
  }: Partial<Notification> = {
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

const useNotifications = () => ({
  open,
  closeByPositionGroupAndID,
  notifications,
  changeContentByPositionGroupAndID,
})

const NotificationPlugin: Plugin = {
  install(app) {
    app.config.globalProperties.$notify = open
  },
}

export default NotificationPlugin

export { useNotifications }
