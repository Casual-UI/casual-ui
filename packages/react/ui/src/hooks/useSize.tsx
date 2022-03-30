import { CSize } from 'casual-types'
import { createContext, useContext, useMemo } from 'react'
const defaultSize: CSize = 'md'

const CSizeContext = createContext<CSize>(defaultSize)

const useSize = (size?: CSize) => {
  const contextSize = useContext(CSizeContext)

  return useMemo(() => (size ? size : contextSize), [size, contextSize])
}
export default useSize

export { CSizeContext }
