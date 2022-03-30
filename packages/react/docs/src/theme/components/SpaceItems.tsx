import React from 'react'
const SpaceItems = ({ children }: { children: JSX.Element[] }) => {
  return (
    <div className="c-row c-gutter-md c-items-center c-wrap">
      {children.map((c, i) => (
        <div key={i}>{c}</div>
      ))}
    </div>
  )
}

export default SpaceItems
