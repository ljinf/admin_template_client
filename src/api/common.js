import request from '@/utils/request'

// 上传文件
export function uploadFile(file, data, params, callback) {
  const formData = new FormData()
  // 文件参数
  formData.append('file', file, file.name)

  // 其他参数
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value)
  }
  return request({
    url: '/upload/',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    },

    params: {
      action: 'upload',
      dir: 'film_zip',
      ...params,
    },
    data: formData,
    //上传进度监听
    onUploadProgress:callback,
  })
}

// 上传图片
export function uploadImage(file, data, params) {
  const formData = new FormData()
  // 文件参数
  formData.append('file', file, file.name)

  // 其他参数
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value)
  }
  return request({
    url: '/upload/',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    },
    params: {
      action: 'upload',
      dir: 'poster_image',
      ...params,
    },
    data: formData,
  })
}

// 下载文件
export function downloadFile(url, params) {
  return request({
    url: url,
    method: 'get',
    params: {
      isExport: 0,
      ...params,
    },
    responseType: 'blob',
  })
}

// 获取CDN配置
export async function getConfigCDN() {
  await request({
    url: '/config/',
    method: 'get',
  })
}
