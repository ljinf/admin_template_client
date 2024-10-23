/**
 * Created by Jorken on 23/05/21.
 */

import dayjs from 'dayjs'
import CryptoJS from 'crypto-js'
import { isObject } from './general'

// 防抖函数
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 深拷贝
export function deepClone(target, map = new Map()) {
  // 非引用类型
  if (!isObject(target)) return target
  // 循环引用
  if (map.get(target)) return map.get(target)
  // 函数
  if (target instanceof Function) {
    return function () {
      return target.apply(this, arguments)
    }
  }
  // 日期
  if (target instanceof Date) return new Date(target)
  // 正则
  if (target instanceof RegExp) return new RegExp(target.source, target.flags)
  // 数组、对象
  let targetClone = Array.isArray(target) ? [] : {}
  map.set(target, targetClone)
  Object.keys(target).forEach(key => {
    if (typeof target[key] === 'object') {
      targetClone[key] = deepClone(target[key], map)
    } else {
      targetClone[key] = target[key]
    }
  })
  return targetClone
}

// 基础类型数据的数组去重
export function uniqueArray(arr) {
  return Array.from(new Set(arr))
}

// 判断元素是否有class
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

// 给元素添加class
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

// 移除元素的class
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// 切换元素的class
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

// 格式化日期
export function formatDate(time) {
  const timeNumArr = time && time.toString().split('')
  timeNumArr.splice(4, 0, '-')
  timeNumArr.splice(7, 0, '-')
  return timeNumArr.join('')
}

// 格式化unix时间
export function formatUnixTime(time) {
  return time ? dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss') : '--'
}

// 当天的起始时间戳
export function startStamp(date) {
  const timeStamp = date ? dayjs(date).startOf('day').valueOf() : Date.now()
  return Number(timeStamp)
}

// 当天的结束时间戳
export function endStamp(date) {
  const timeStamp = date ? dayjs(date).endOf('day').valueOf() : Date.now()
  return Number(timeStamp)
}

// 格式化文件路径
export function resolveUrl(originUrl) {
  const baseUrl = process.env.VUE_APP_BASE_URL
  if (originUrl.startsWith('http://') || originUrl.startsWith('https://')) {
    return originUrl
  } else {
    return baseUrl + originUrl
  }
}

// dataUrl转为File
export function dataUrltoFile(dataUrl, fileName) {
  var arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type: mime })
}

// url转base64
export function urlToBase64(url) {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.onload = function () {
      let canvas = document.createElement('canvas')
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight
      // 将图片插入画布并开始绘制
      canvas.getContext('2d').drawImage(image, 0, 0)
      // result
      let result = canvas.toDataURL('image/png')
      resolve(result)
    }
    image.setAttribute('crossOrigin', 'Anonymous')
    image.src = url
    // 图片加载失败的错误处理
    image.onerror = () => {
      reject(new Error('转换失败'))
    }
  })
}

// 格式化文件大小单位显示
export function formatFlowSize(oSize, radix = 2) {
  const size = Math.abs(oSize || 0)
  let result = oSize || 0

  if (size < 1024) {
    result = `${size} B`
  } else if (size >= 1024 && size < 1048576) {
    result = `${(size / 1024).toFixed(radix)} K`
  } else if (size >= 1048576 && size < 1073741824) {
    result = `${(size / 1048576).toFixed(radix)} M`
  } else if (size >= 1073741824 && size < 1099511627776) {
    result = `${(size / 1073741824).toFixed(radix)} G`
  } else {
    result = `${(size / 1099511627776).toFixed(radix)} T`
  }
  return `${oSize >= 0 ? '' : '-'}${result}`
}

// 生成Uuid
export function generateUuid(len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = [],
    i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

// 加密数据
export function encrypt(dataStr, keyStr = 'NdjBqhoiJ6lX52DU', ivStr = 'nak5iqTaudVXCCH2') {
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)
  let encrypted = CryptoJS.AES.encrypt(dataStr, key, { iv: iv })
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
}

/**
 * 通用js方法封装处理
 * Copyright (c) 2019
 */

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 日期格式化
export function parseTimeMin(time) {
  // 时间戳
  let date = new Date(parseInt(time) * 1000);
  let Year = date.getFullYear();
  let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  let Hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  let Minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  let Sechond = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  // console.log(GMT)  // 2022-09-07 15:56:07
  return Year + '-' + Moth + '-' + Day + ' ' + Hour + ':' + Minute + ':' + Sechond;
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  let search = params;
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  search['begin_time'] = dateRange[0];
  search['end_time'] = dateRange[1];
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return "";
  }
  var actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key].value == ('' + value)) {
      actions.push(datas[key].label);
      return true;
    }
  })
  if (actions.length === 0) {
    actions.push(value);
  }
  return actions.join('');
}

// 回显数据字典（字符串、数组）
export function selectDictLabels(datas, value, separator) {
  if (value === undefined || value.length === 0) {
    return "";
  }
  if (Array.isArray(value)) {
    value = value.join(",");
  }
  var actions = [];
  var currentSeparator = undefined === separator ? "," : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    var match = false;
    Object.keys(datas).some((key) => {
      if (datas[key].value == ('' + temp[val])) {
        actions.push(datas[key].label + currentSeparator);
        match = true;
      }
    })
    if (!match) {
      actions.push(temp[val] + currentSeparator);
    }
  })
  return actions.join('').substring(0, actions.join('').length - 1);
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments, flag = true, i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === 'undefined') {
      flag = false;
      return '';
    }
    return arg;
  });
  return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}

// 数据合并
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p]);
      } else {
        source[p] = target[p];
      }
    } catch (e) {
      source[p] = target[p];
    }
  }
  return source;
};

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parent_id',
    childrenList: children || 'children'
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }

  return tree;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}

// 验证是否为blob格式
export function blobValidate(data) {
  return data.type !== 'application/json'
}

