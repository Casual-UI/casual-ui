import { ref, watch, toRefs } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
interface BaseVModelProps<T> {
  modelValue: T
}
interface BaseVModelEmit<T> {
  (e: 'update:modelValue', value: T): void
}

const useVModel = <T>(
  propValue: Ref<T>,
  defaultValue: T,
  emitFunction: (newInnerValue: UnwrapRef<T>) => void
) => {
  const innerValue = ref(defaultValue)

  watch(innerValue, emitFunction)

  watch(propValue, newPropValue => {
    innerValue.value = newPropValue as UnwrapRef<T>
  })

  return {
    innerValue,
  }
}

interface VModelHooks<T> {
  beforeEmit?: (newInnerValue: UnwrapRef<T>) => void
}

export const useDefaultVModel = <
  T,
  S extends BaseVModelEmit<T> = BaseVModelEmit<T>
>(
  props: Readonly<BaseVModelProps<T>>,
  emit: S,
  hooks?: VModelHooks<T>
) => {
  const { modelValue } = toRefs(props)
  const { innerValue } = useVModel(modelValue, modelValue.value, newValue => {
    if (hooks) {
      const { beforeEmit } = hooks
      beforeEmit?.(newValue)
    }
    emit('update:modelValue', newValue)
  })
  return innerValue
}

export default useVModel
