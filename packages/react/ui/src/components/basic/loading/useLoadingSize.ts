import { useMemo } from 'react'
const useLoadingSize = (size = '1em') => {
  const sizeValue = useMemo(
    () => ({
      style: {
        fontSize: size,
      },
    }),
    [size]
  )
  return sizeValue
}
export default useLoadingSize
