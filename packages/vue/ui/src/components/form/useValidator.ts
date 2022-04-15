import type { CRule } from 'casual-types'
import { inject, computed, type ComputedRef } from 'vue'
import { clearValidateKey, hasErrorKey, validateKey } from './CFormItem.vue'

export default () => ({
  hasError: inject<ComputedRef<false | string>>(
    hasErrorKey,
    computed(() => false)
  ),
  validate: inject<CRule>(validateKey, () => false),
  clearValidate: inject<() => void>(clearValidateKey, () => {
    // empty
  }),
})
