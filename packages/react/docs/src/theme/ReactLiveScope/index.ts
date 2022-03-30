import React from 'react'
import * as CasualComponents from 'casual-ui-react'
import * as MdIcons from '@quasar/extras/material-icons'
import * as MdiV6Icons from '@quasar/extras/mdi-v6'
import SpaceItems from '../components/SpaceItems'

const ReactLiveScope = {
  React,
  ...React,
  ...CasualComponents,
  MdIcons,
  MdiV6Icons,
  SpaceItems,
}

export default ReactLiveScope
