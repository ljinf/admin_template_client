export const objectToString = Object.prototype.toString

export const toTypeString = value => objectToString.call(value)
const hasOwnProperty = Object.prototype.hasOwnProperty

// 返回原型对象
export const toRawType = value => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1)
}

// 判断是否为数字
export const isNumber = val => typeof val === 'number'

// 判断是否是string
export const isString = val => typeof val === 'string'

// 判断是否是symbol
export const isSymbol = val => typeof val === 'symbol'

// 判断是否是object
export const isObject = val => val !== null && typeof val === 'object'

// 判断是否为数组
export const isArray = Array.isArray

// 判断是否是function
export const isFunction = val =>
  toTypeString(val) === '[object Function]' || toTypeString(val) === '[object AsyncFunction]'

// 判断是否是promise
export const isPromise = val => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch)
}

// 判断是否是set
export const isSet = val => toTypeString(val) === '[object Set]'

// 判断是否是map
export const isMap = val => toTypeString(val) === '[object Map]'

// 判断是否是date
export const isDate = val => toTypeString(val) === '[object Date]'

// 判断是否是RegExp
export const isRegExp = val => toTypeString(val) === '[object RegExp]'

// 判断是否是对象
export const isPlainObject = val => toTypeString(val) === '[object Object]'

// 判断对象里是否存在某属性
export const hasOwn = (obj, key) => hasOwnProperty.call(obj, key)

// 字符串转数字
export const looseToNumber = val => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

// 字符串转数字
export const toNumber = val => {
  const n = isString(val) ? Number(val) : NaN
  return isNaN(n) ? val : n
}

// 判断是否是外链
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
