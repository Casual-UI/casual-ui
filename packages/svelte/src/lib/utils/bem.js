import clsx from './clsx'

/**
 * Change camel case to kebab
 * @param {string} str
 */
const camelToKebab = str =>
  str
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter
    })
    .join('')

/**
 * @param base {string}
 * @param condition {Record<string, any>}
 */
export default (base, condition) =>
  clsx(
    `c-${base}`,
    ...Object.entries(condition).map(
      ([k, v]) => v && `c-${base}--${camelToKebab(k)}`
    )
  )
