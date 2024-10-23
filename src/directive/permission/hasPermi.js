
import store from '@/store'

// 暴露指令对象
export default {
// ==== 指令对象的钩子函数，省略 ====
// inserted ，被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
// ==== 指令对象的钩子函数参数，省略 ====
// el ：指令所绑定的元素，可以用来直接操作 DOM
// binding 一个对象，包括：
  // name: 指令名，不包括 v- 前缀
  // value: 指令的绑定值，这里是['system:user:add']
  // oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中使用（无论值是否改变都可用）
  inserted(el, binding, vnode) {
    const { value } = binding
    const all_permission = "*:*:*"; // 特殊权限标识
    // store
    // && 两边是Boolean时，两个都为 true 运算结果为 true
    // && 求值时，如果它们都是真值，则返回最后一个操作数的值，如果有假值，返回第一个假值
    const permissions = store.getters && store.getters.permissions
    // 权限标识存在且为不为空的数组
    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value // ['system:user:add']
      // 遍历 store.getters.permissions ，
      // 是否存在： 当前角色有特殊权限  或 自定义指令绑定值数组中元素存在当前登录角色所拥有的某个权限标识
      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || permissionFlag.includes(permission)
      })
      // 如果匹配不上，需要把该节点（button）从父节点删除
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
