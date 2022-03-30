/**
 * 主题色
 */
type CTheme = 'primary' | 'secondary' | 'negative' | 'warning'

type CSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type CSlot = JSX.Element | string | JSX.Element[]

type CPosition = 'start' | 'center' | 'end'

interface Notification {
  title?: string
  message?: string
  closeIcon?: boolean
  theme?: CTheme
  timeout: number
  alignX?: CPosition
  alignY?: CPosition
  id: number
}

type PositionGroup =
  | 'start start'
  | 'start center'
  | 'start end'
  | 'center start'
  | 'center center'
  | 'center end'
  | 'end start'
  | 'end center'
  | 'end end'

type NotificationGroups = {
  [key in PositionGroup]: {
    x: CPosition
    y: CPosition
    items: Notification[]
  }
}

export const createNotificationGroups: () => NotificationGroups = () => ({
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

interface VModel<T> {
  modelValue: T
}

interface EmitModel<T> {
  (e: 'update:modelValue', newValue: T): void
}

export type {
  CSlot,
  CTheme,
  CSize,
  CPosition,
  Notification,
  PositionGroup,
  NotificationGroups,
  VModel,
  EmitModel
}