import axios from 'axios'
import cookies from '@/utils/cookies'
import { Message } from 'element-ui'
import { errorLog } from './tools'
import { addPending, removePending } from './cancelRequest'
const cookieToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJUTVNfVEVTVF8wMiIsIlVTRVItSU5GTyI6IntcImFyZWFcIjpcIua3seWcs1wiLFwiY3JlYXRlQWNjb3VudFwiOlwiU1owMjE1M1wiLFwiY3JlYXRlVGltZVwiOjE2MjgwNDM4MzQwMDAsXCJkZXBhcnRtZW50XCI6XCJJVFwiLFwiZW1haWxcIjpcIjExMTExQHFxLmNvbVwiLFwibmFtZVwiOlwi5rWL6K-VMlwiLFwicGFzc3dvcmRcIjpcImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlXCIsXCJzdGF0aW9uXCI6XCJcIixcInN0YXR1c1wiOlwiMVwiLFwidGVscGhvbmVcIjpcIlwiLFwidHlwZVwiOlwiMlwiLFwidXBkYXRlQWNjb3VudFwiOlwiU1owMjE1M1wiLFwidXBkYXRlVGltZVwiOjE2MzI2NDIzOTIwMDAsXCJ1c2VyQWNjb3VudFwiOlwiVE1TX1RFU1RfMDJcIixcInVzZXJOYW1lXCI6XCJ0ZXN0MlwifSJ9.HadX97K01HyhkGnvTgw7BnxEoXDwD2IyFJJsSCpVfmM'

// const fileStream = ['user/checkCode', 'attach/download']

/**
 * @description 创建请求实例
 */
function createService() {
  // 创建一个 axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(config => {
    const flag = removePending(config, 'request') // 在请求开始前，对之前的请求做检查取消操作
    if (flag) throw new Error('请勿重复请求')
    addPending(config)
    config.headers.language = (cookies.get('lang') && cookies.get('lang').toUpperCase()) || 'ZH'
    config.headers.token = cookies.get('token') || cookieToken
    return config
  }, error => {
    // 发送失败
    return Promise.reject(error)
  })
  // 响应拦截
  service.interceptors.response.use(
    response => {
      removePending(response.config, 'response') // 在请求结束后，移除本次请求
      // dataAxios 是 axios 返回数据中的 data
      const dataAxios = response.data
      // 这个状态码是和后端约定的
      const { code } = dataAxios
      // 根据 code 进行判断
      if (code === 200 || code === undefined) {
        // 如果没有 code 代表返回的是文件流
        return dataAxios
      } else {
        // 有 code 代表这是一个后端接口 可以进行进一步的判断
        switch (code) {
          case 200:
            // [ 示例 ] code === 0 代表没有错误
            return dataAxios.data
          case 401:
            Message.error(`${dataAxios.message}`)

            return Promise.reject(dataAxios)
          default:
            // 不是正确的 code
            Message.error(`${dataAxios.message}`)
            // errorCreate(`${dataAxios.message}: ${response.config.url}`)
            return dataAxios
        }
      }
    },
    error => {
      const status = error.response && error.response.status
      console.log('error', error, '===========', error.message, status, error.config)
      switch (status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: error.message = '请求超时'; break
      }
      if (error.message === '请勿重复请求') return error
      removePending(error.config, 'response')
      errorLog(error)
      return Promise.reject(error)
    }
  )
  return service
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */

function createRequestFunction(service) {
  return function(config) {
    const token = cookies.get('token') || cookieToken
    const configDefault = {
      headers: {
        Authorization: token
        // 'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      timeout: 5000,
      baseURL: config.noEnvUrl ? '' : process.env.VUE_APP_API, // 不使用VUE_APP_API的路径，需要加noEnvUrl为true
      data: {},
      method: config.method || 'get'
    }
    return service(Object.assign(configDefault, config))
  }
}

// 用于真实网络请求的实例和请求方法
export const service = createService()
export const request = createRequestFunction(service)

// 用于模拟网络请求的实例和请求方法
export const serviceForMock = createService()
export const requestForMock = createRequestFunction(serviceForMock)
