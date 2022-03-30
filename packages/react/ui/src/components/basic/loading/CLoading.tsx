import React from 'react'
import useLoadingSize from './useLoadingSize'

interface CLoadingProps {
  /**
   * 尺寸
   */
  size?: string
  /**
   * 厚度
   */
  thickness?: number
  /**
   * 颜色
   */
  color?: string
}

const CLoading = ({
  size,
  thickness = 5,
  color = 'currentColor',
}: CLoadingProps) => {
  return (
    <svg
      className="o-loading o-loading--mat"
      viewBox="25 25 50 50"
      {...useLoadingSize(size)}
    >
      <circle
        className="o-loading--path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeMiterlimit="10"
      ></circle>
    </svg>
  )
}

export default CLoading

export type { CLoadingProps }
