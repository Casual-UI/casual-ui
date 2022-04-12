import { useInjectSize, useInjectProp } from 'casual-ui-vue'

export default (props: any) => {
  return {
    size: useInjectSize(props),
    labelWidth: useInjectProp({
      propName: 'labelWidth',
      defaultValue: '100px',
      props,
    }),
    col: useInjectProp({
      propName: 'col',
      defaultValue: 3,
      props,
    }),
  }
}
