// 比较两个对象是否相等(对象的key和内涵嵌套的对象也要全等)
import { isArray, isDate, isObject, isSymbol } from './is'

export function looseEqual(a, b) {
  if (a === b) return true

  let aValidType = isDate(a)
  let bValidType = isDate(b)
  if (aValidType || bValidType)
    return aValidType && bValidType ? a.getTime() === b.getTime() : false

  aValidType = isSymbol(a)
  bValidType = isSymbol(b)
  if (aValidType || bValidType) return a === b

  aValidType = isArray(a)
  bValidType = isArray(b)
  if (aValidType || bValidType) return aValidType && bValidType ? looseCompareArrays(a, b) : false

  aValidType = isObject(a)
  bValidType = isObject(b)
  if (aValidType || bValidType) {
    /* istanbul ignore if: this if will probably never be called */
    if (!aValidType || !bValidType) return false
    const aKeysCount = Object.keys(a).length
    const bKeysCount = Object.keys(b).length
    if (aKeysCount !== bKeysCount) return false
    for (const key in a) {
      const aHasKey = Object.prototype.hasOwnProperty.call(a, key)
      const bHasKey = Object.prototype.hasOwnProperty.call(b, key)
      if ((aHasKey && !bHasKey) || (!aHasKey && bHasKey) || !looseEqual(a[key], b[key])) {
        return false
      }
    }
  }
  return String(a) === String(b)
}

// 对比两个数组的是否相等情况
export function looseCompareArrays(a, b) {
  if (a?.length !== b?.length) return false
  let equal = true
  for (let i = 0; equal && i < a?.length; i++) {
    equal = looseEqual(a[i], b[i])
  }
  return equal
}

// 找出对象数组中跟值相等的对象下标(全量对比)
export function looseIndexOf(arr, val) {
  return arr.findIndex(item => looseEqual(item, val))
}
