import { CSlot } from 'casual-types'
import React from 'react'
interface OTdProps {
  width?: string
  children?: CSlot
}
const CTh = ({ children, width = 'auto' }: OTdProps) => {
  return (
    <th className="c-table--th" style={{ width }}>
      {children}
    </th>
  )
}

export default CTh
