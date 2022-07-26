import useContextProp from './useContextProp'

/**
 * The theme context key
 */
export const key = Symbol('c-theme')

/**
 * @param theme {'primary' | 'secondary' | 'warning' | 'negative'=}
 */
export default theme => useContextProp(key, theme, 'primary')
