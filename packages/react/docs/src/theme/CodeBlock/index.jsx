/* eslint-disable react/prop-types */
import React from 'react'
import Playground from '@theme/Playground'
import ReactLiveScope from '@theme/ReactLiveScope'
import CodeBlock from '@theme-init/CodeBlock'

const withLiveEditor = Component => {
  function WrappedComponent(props) {
    if (props.live) {
      return (
        <div className="custom-wrapper">
          <Playground scope={ReactLiveScope} {...props} />
        </div>
      )
    }

    return <Component {...props} />
  }

  return WrappedComponent
}

export default withLiveEditor(CodeBlock)
