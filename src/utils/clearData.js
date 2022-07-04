// 清空数据
export const clearData = (data) => {
  for (const key in data) {
    // 判断数据类型
    if (window.toType(data[key]) === 'number') {
      data[key] = null
    } else if (window.toType(data[key]) === 'string') {
      data[key] = ''
    } else if (window.toType(data[key]) === 'boolean') {
      data[key] = false
    } else if (window.toType(data[key]) === 'array') {
      data[key] = []
    } else if (window.toType(data[key]) === 'object') {
      data[key] = {}
    }
  }
}
