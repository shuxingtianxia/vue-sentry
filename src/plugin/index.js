import Vue from 'vue'

// 核心插件
import d2Admin from '@/plugin/d2admin'

// 引入element
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vxe-table
import './utils'
import './vxe-table'

// 引入api
import api from '@/api'
// 按钮权限
// Vue.prototype.hasButtonPermission = (permission) => {
//   return true
// }

Vue.prototype.$api = api
Vue.use(Element, {
  size: 'mini'
})

Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。

Vue.config.productionTip = false

// vxe-table的格式化
import './vxe-table/formats'

// mock数据
import '@/api/mock/index'

// 检验数据类型
import '@/utils/toType'

// Vue.use(pluginImport)
// 核心插件
Vue.use(d2Admin)

