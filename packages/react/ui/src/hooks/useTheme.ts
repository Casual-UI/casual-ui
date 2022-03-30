import { CTheme } from 'casual-types'
import { createContext, useContext, useMemo } from 'react'
const defaultTheme: CTheme = 'primary'

const CThemeContext = createContext<CTheme>(defaultTheme)

const useTheme = (theme?: CTheme) => {
  const contextTheme = useContext(CThemeContext)

  return useMemo(() => (theme ? theme : contextTheme), [theme, contextTheme])
}
export default useTheme

export { CThemeContext }
