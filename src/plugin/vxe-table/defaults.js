import VXETable from 'vxe-table'
import Cookie from 'js-cookie'

/**
 * 修改默认配置
 */
VXETable.setup({
  version: 0,
  zIndex: 3000,
  size: Cookie.get('size') || 'mini'
})
