import clsx from 'clsx'

export default (base: string, condition: Record<string, any>) =>
  clsx(
    `c-${base}`,
    ...Object.entries(condition).map(([k, v]) => v && `c-${base}--${k}`)
  )
