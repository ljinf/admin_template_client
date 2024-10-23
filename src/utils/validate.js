/**
 * Created by Jorken on 23/05/21.
 */
// 验证url
export function validUrl(_, value, callback) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确网址'))
  } else {
    callback()
  }
}

// 验证邮箱
export function validEmail(_, value, callback) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}

// 验证密码
export function validPassword(_, value, callback) {
  const reg = /^[A-Za-z0-9]{6,20}$/
  if (!reg.test(value)) {
    callback(new Error('密码限制长度为6,20个字符, 只可输入大写英文、小写英文、数字'))
  } else {
    callback()
  }
}

// 验证账号
export function validAccount(_, value, callback) {
  const reg = /^[A-Za-z0-9_]{2,20}$/
  if (!reg.test(value)) {
    callback(new Error('账号限制为2-20位数字、英文、下横线'))
  } else {
    callback()
  }
}

// 验证Ips
export function validIps(_, value, callback) {
  const reg =
    /^(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}(?:\/(?:3[0-2]|[1-2]?\d|))?(?:,(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}(?:\/(?:3[0-2]|[1-2]?\d|))?)*$/
  if (!value && value !== 0) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的IP地址, 以逗号分隔'))
    } else {
      callback()
    }
  }
}
