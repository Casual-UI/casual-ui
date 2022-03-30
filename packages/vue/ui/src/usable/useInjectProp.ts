import { inject, ref, computed, provide } from 'vue'

export default <T>({
  propName,
  defaultValue,
  props,
}: {
  propName: string
  defaultValue: T
  props: any
}) => {
  const injectProp = inject(propName, ref(defaultValue))

  const provideProp = computed(() => {
    return props[propName] ? props[propName] : injectProp.value
  })

  provide(propName, provideProp)

  return provideProp
}
