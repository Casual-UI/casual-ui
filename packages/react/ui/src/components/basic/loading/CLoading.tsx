import React from 'react'
import useLoadingSize from './useLoadingSize'
import { CSSProperties } from 'react'

interface CLoadingProps {
  /**
   * 厚度
   */
  thickness?: number
  /**
   * Customize style
   * @zh 自定义样式
   */
  style?: CSSProperties
}

const CLoading = ({ thickness = 5, style }: CLoadingProps) => {
  return (
    <svg
      className="c-loading c-loading--mat"
      viewBox="25 25 50 50"
      style={style}
    >
      <circle
        className="c-loading--path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth={thickness}
        strokeMiterlimit="10"
      ></circle>
    </svg>
  )
}

export default CLoading

export type { CLoadingProps }
