import type { CSize } from 'casual-types'

import useInjectProp from './useInjectProp'
export default (props: any) => {
  return {
    provideSize: useInjectProp<CSize>({
      props,
      propName: 'size',
      defaultValue: 'md',
    }),
  }
}
