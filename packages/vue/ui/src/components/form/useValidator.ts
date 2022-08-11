import type { CRule } from 'casual-types'
import { inject, computed, type ComputedRef } from 'vue'
import { clearValidateKey, hasErrorKey, validateKey } from './CFormItem.vue'

interface UseValidatorReturn {
  /**
   * Determine current form item has error or not. string is the error message. false means no error.
   * @zh 当前表单项是否具有错误，若为string，则是具体的错误信息
   */
  hasError: ComputedRef<false | string>
  /**
   * The function to validate current form item.
   * @zh 当前表单项验证方法
   */
  validate: CRule
  /**
   * The function to clear current form item's validate result.
   * @zh 清除当前项验证结果
   */
  clearValidate: () => void
}

/**
 * Fetch current form item context.
 * @zh 获取当前表单项相关的验证方法、状态
 */
const useFormValidator: () => UseValidatorReturn = () => ({
  hasError: inject(
    hasErrorKey,
    computed(() => false)
  ),
  validate: inject(validateKey, () => false),
  clearValidate: inject(clearValidateKey, () => {
    // empty
  }),
})

export default useFormValidator

export type { UseValidatorReturn, CRule }
