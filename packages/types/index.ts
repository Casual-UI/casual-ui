/**
 * 主题色
 */
type CTheme = 'primary' | 'secondary' | 'negative' | 'warning'

/**
 * 尺寸
 */
type CSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * 用于React中的插槽类型
 */
type CSlot = JSX.Element | string | JSX.Element[]

/**
 * 位置类型，可以类比于flex布局中的flex-start, center, flex-end
 */
type CPosition = 'start' | 'center' | 'end'

/**
 * 验证规则函数，可以返回Promise做异步验证
 */
type CRule = (
  v: any
) => string | false | Promise<string | false>

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

/**
 * 位置组合，格式为：'横轴位置 纵轴位置'
 */
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

/**
 * 用于默认v-model的基类型
 */
interface VModel<T> {
  modelValue: T
}

/**
 * 用于默认v-model的事件基类型
 */
interface EmitModel<T> {
  (e: 'update:modelValue', newValue: T): void
}

/**
 * label排列方向
 */
type CLabelDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

export type {
  CRule,
  CLabelDirection,
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