import { CSlot } from 'casual-types'
import React from 'react'
interface OTdProps {
  width?: string
  children?: CSlot
}

const OTd = ({ children, width = 'auto' }: OTdProps) => {
  return (
    <td className="c-table--td" style={{ width }}>
      {children}
    </td>
  )
}

export default OTd
