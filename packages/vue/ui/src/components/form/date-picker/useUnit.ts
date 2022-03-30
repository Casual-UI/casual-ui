import { useVModel } from 'casual-ui-vue'
import { Ref, toRefs } from 'vue'

type Unit = 'year' | 'month' | 'day'

interface BaseUnitProps {
  unit?: Unit
}

interface BaseUnitEmit {
  (e: 'update:unit', unit: Unit): void
}

export default <
  T extends BaseUnitEmit = BaseUnitEmit,
  S extends BaseUnitProps = BaseUnitProps
>(
  emit: T,
  props: Readonly<S>
) => {
  const { unit } = toRefs(props)
  const { innerValue: innerUnit } = useVModel(
    unit as Ref<Unit>,
    (unit as Ref<Unit>).value,
    newUnit => {
      emit('update:unit', newUnit)
    }
  )

  return innerUnit
}

export type { Unit }
