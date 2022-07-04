import XEUtils from 'xe-utils'
export default {
  formatDate({ cellValue }, format) { // 时间转化
    return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
  },
  formatTel({ cellValue }) { // 手机号四位加空格
    if (cellValue) {
      if (cellValue.includes('-')) { // 包含-
        // 获取-最后的位置
        const position = cellValue.lastIndexOf('-')
        // -后面的数字，四位一个空格，从后面开始数，把后面的反转然后在4位一个空格
        const val = cellValue.slice(position + 1).split('').reverse().join('').replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
        // -后面的反转过来，在拼接-前面的
        return cellValue.slice(0, position + 1) + val.split('').reverse().join('')
      }
      const val = cellValue.split('').reverse().join('').replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
      return val.split('').reverse().join('')
    }
  },
  formatBoolean({ cellValue }) { // 根据布尔值返回是否
    if (cellValue === true) {
      return '是'
    } else if (cellValue === false) {
      return '否'
    }
  }
}
