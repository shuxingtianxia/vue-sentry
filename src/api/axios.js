import { request } from './service'
import { progress } from '@/utils/loading'

// get请求
export function getAction({ url, params, defineHeader = {}, ...args }) {
  console.log('args', args)
  const body = {
    url,
    method: 'get',
    params,
    ...args
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

// post 请求
export function postAction({ url, data, params, defineHeader = {}, ...args }) {
  const body = {
    url,
    method: 'post',
    data,
    params,
    ...args
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

// post表单提交数据
export function postFormAction({ url, data, params, ...args }) {
  return request({
    url,
    method: 'post',
    data,
    params,
    ...args,
    transformRequest: [function(res) {
      let ret = ''
      for (const it in res) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(res[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// put请求
export function putAction({ url, data, params, ...args }) {
  return request({
    url,
    method: 'put',
    data,
    params,
    ...args
  })
}

// delete请求
export function deleteAction({ url, data, params, ...args }) {
  return request({
    url,
    method: 'delete',
    data,
    params,
    ...args
  })
}

// getBlob （下载文件有进度条）
export function getBlobProgress({ url, params, defineHeader = {}, ...args }) {
  const body = {
    url,
    method: 'get',
    params,
    ...args,
    onDownloadProgress: progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0
      progress(complete)
    },
    responseType: 'blob'
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

// getBlob（下载文件无进度条）
export function getBlob({ url, params, defineHeader = {}, ...args }) {
  const body = {
    url,
    method: 'get',
    params,
    ...args,
    onDownloadProgress: progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0
      progress(complete)
    },
    responseType: 'blob'
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

// postBlob （下载文件有进度条）
export function postBlob({ url, data, params, defineHeader = {}, ...args }) {
  const body = {
    url,
    method: 'get',
    data,
    params,
    ...args,
    onDownloadProgress: progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0
      progress(complete)
    },
    responseType: 'blob'
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}

// post （上传文件有进度条）
export function postFileAction({ url, data, defineHeader = {}, ...args }) {
  const body = {
    url,
    method: 'post',
    data,
    ...args,
    onUploadProgress: progressEvent => {
      const complete = progressEvent.loaded / progressEvent.total * 100 | 0
      progress(complete)
    }
  }
  if (JSON.stringify(defineHeader) !== '{}') {
    Object.assign(body, defineHeader)
  }
  return request(body)
}
