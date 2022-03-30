import { CTheme } from 'casual-types'

import useInjectProp from './useInjectProp'
export default (props: any) => {
  return {
    provideTheme: useInjectProp<CTheme>({
      props,
      propName: 'theme',
      defaultValue: 'primary',
    }),
  }
}
