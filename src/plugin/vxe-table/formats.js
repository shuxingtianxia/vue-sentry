
import VXETable from 'vxe-table'

const files = require.context('./format', true, /\.js$/)
const formats = files.keys().map(key => files(key).default || files(key))

/**
 * 格式化单元格
 */
const assignFormats = Object.assign({}, ...formats)
VXETable.formats.mixin({
  ...assignFormats
})
