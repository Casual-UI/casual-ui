import { inject, ref, computed, provide, onMounted } from 'vue'

type DefaultValueFunction = () => any

function isDefaultValueFunction(value: any): value is DefaultValueFunction {
  return typeof value === 'function'
}

export default <T>({
  propName,
  defaultValue,
  props,
}: {
  propName: string
  defaultValue: T | DefaultValueFunction
  props: any
}) => {
  const injectProp = inject(
    propName,
    ref(typeof defaultValue === 'function' ? undefined : defaultValue)
  )

  const provideProp = computed(() => {
    return props[propName] ? props[propName] : injectProp.value
  })

  provide(propName, provideProp)

  if (isDefaultValueFunction(defaultValue)) {
    onMounted(() => {
      injectProp.value = defaultValue()
    })
  }

  return provideProp
}
