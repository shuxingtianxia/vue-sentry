(function() {
  var class2type = {}
  var toString = class2type.toString; // =>Object.prototype.toString

  // 设定数据类型的映射表
  ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'Symbol'].forEach(name => {
    class2type[`[object ${name}]`] = name.toLowerCase()
  })

  function toType(obj) {
    if (obj == null) {
      // 传递的值是null或者undefined，就返回对应的字符串
      return obj + ''
    }
    // 基本数据类型都采用typeof检测
    return typeof obj === 'object' || typeof obj === 'function'
      ? class2type[toString.call(obj)] || 'object'
      : typeof obj
  }
  try {
    window.toType = toType
  } catch (err) {
    global.toType = toType
  }
})()

