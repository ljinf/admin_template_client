import request from "@/utils/request";

// 查询用户列表
export function listUser(query) {
  return request({
    url: "/sys/user/list",
    method: "get",
    params: query
  });
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: "/sys/user/info/" + userId,
    method: "get"
  });
}

// 新增用户
export function addUser(data) {
  return request({
    url: "/sys/user/create",
    method: "post",
    data: data
  });
}

// 修改用户
export function updateUser(data) {
  return request({
    url: "/sys/user/updateInfo",
    method: "put",
    data: data
  });
}

// 删除用户
export function delUser(userId) {
  return request({
    url: "/sys/user/del/" + userId,
    method: "delete"
  });
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  };
  return request({
    url: "/sys/user/resetPwd",
    method: "put",
    data: data
  });
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  };
  return request({
    url: "/sys/user/changeStatus",
    method: "put",
    data: data
  });
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: "/sys/user/profile",
    method: "get"
  });
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: "/sys/user/profile/update",
    method: "put",
    data: data
  });
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    "password": newPassword
  };
  return request({
    url: "/sys/user/profile/update",
    method: "put",
    data: data
  });
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: "/sys/user/profile/avatar",
    method: "post",
    data: data
  });
}

// 查询授权角色
export function getAuthRole(userId) {
  return request({
    url: "/sys/user/authRole/" + userId,
    method: "get"
  });
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: "/sys/user/authRole",
    method: "put",
    params: data
  });
}

// 查询部门下拉树结构
export function deptTreeSelect() {
  return request({
    url: "/sys/user/deptTree",
    method: "get"
  });
}
