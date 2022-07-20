import clsx from './clsx'

/**
 * @param base {string}
 * @param condition {Record<string, any>}
 */
export default (base, condition) =>
  clsx(
    `c-${base}`,
    ...Object.entries(condition).map(([k, v]) => v && `c-${base}--${k}`)
  )
