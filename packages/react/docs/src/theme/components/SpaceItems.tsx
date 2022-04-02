import React from 'react'
const SpaceItems = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element
}) => {
  return (
    <div className="c-row c-gutter-md c-items-center c-wrap">
      {Array.isArray(children)
        ? children.map((c, i) => <div key={i}>{c}</div>)
        : children}
    </div>
  )
}

export default SpaceItems
