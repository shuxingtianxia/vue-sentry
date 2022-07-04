// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()

/**
 * 添加请求
 * @param {Object} config
 */
export const addPending = (config) => {
  const url = [
    config.method,
    config.url
  ].join('&')
  pending.set(url, url)
}
/**
 * 移除请求
 * @param {Object} config
 */
export const removePending = (config, type) => {
  const url = [
    config.method,
    config.url
  ].join('&')
  if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    if (type === 'request') {
      return true
    } else {
      pending.delete(url)
      return false
    }
  } else {
    return false
  }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}
