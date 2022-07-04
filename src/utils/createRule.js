// 快速生成rules
export function createdRules(data) {
  // 判断数据类型
  var class2type = {}
  'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(e, i) {
    class2type['[object ' + e + ']'] = e.toLowerCase()
  })
  function _typeof(obj) {
    if (obj === null) {
      return String('string')
    } else if (obj === undefined) {
      return String('string')
    }
    return typeof obj === 'object' || typeof obj === 'function'
      ? class2type[class2type.toString.call(obj)] || 'object'
      : typeof obj
  }

  // 生成验证
  const tempObj = {}
  for (const attr in data) {
    const type = _typeof(data[attr])
    if (type === 'number' || type === 'string') {
      tempObj[attr] = [{ required: true, message: '不能为空' }]
    } else {
      tempObj[attr] = [{ type, required: true, message: '不能为空', trigger: 'change' }]
    }
  }
  return tempObj
}
