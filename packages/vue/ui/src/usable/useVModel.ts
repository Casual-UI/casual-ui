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

type UseDefaultVModel = <T, S extends BaseVModelEmit<T> = BaseVModelEmit<T>>(
  props: Readonly<BaseVModelProps<T>>,
  emit: S
) => Ref<T>

export const useDefaultVModel: UseDefaultVModel = <
  T,
  S extends BaseVModelEmit<T> = BaseVModelEmit<T>
>(
  props: Readonly<BaseVModelProps<T>>,
  emit: S
) => {
  const { modelValue } = toRefs(props)
  const { innerValue } = useVModel(modelValue, modelValue.value, newValue => {
    emit('update:modelValue', newValue)
  })
  return innerValue
}

export default useVModel
