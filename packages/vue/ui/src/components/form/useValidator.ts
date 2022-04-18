import type { CRule } from 'casual-types'
import { inject, computed, type ComputedRef } from 'vue'
import { clearValidateKey, hasErrorKey, validateKey } from './CFormItem.vue'

interface UseValidatorReturn {
  /**
   * 当前表单项是否具有错误，若为string，则是具体的错误信息
   */
  hasError: ComputedRef<false | string>
  /**
   * 当前表单项验证方法
   */
  validate: CRule
  /**
   * 清除当前项验证结果
   */
  clearValidate: () => void
}

/**
 * 获取当前表单项相关的验证方法、状态
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
