// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 引入公共的组件和工具
import '@/plugin'

// store
import store from '@/store/index'
import refreshToken from './utils/refreshToken'
// 监听滚动事件和滑动事件
refreshToken.setRefreshToken()
// 菜单和路由设置
import router from './router'
// 数据监控  sentry
import '@/plugin/sentry'

// import util from '@/libs/util.js'

// 切换标签页
// document.addEventListener('visibilitychange', () => {
//   const whiteList = ['/login']
//   const curPath = router.history.current.path
//   const token = util.cookies.get('token')

//   if (document.visibilityState === 'hidden' && !whiteList.includes(curPath)) {
//     if (token && token !== 'undefined') refreshToken.beforeDestroy()
//   }
// })

import { mapState } from 'vuex'

// 获取多语言的接口
// import { getLanguage } from '@/api/modules/common'

// 环境配置
import config from '@/libs/config'
Vue.prototype.$config = config

// 按钮权限
Vue.prototype.hasButtonPermission = (permission) => {
  return store.getters['hasButtonPermission'](permission)
}

window.addEventListener('error', (err) => {
  console.log('err', err)
})
new Vue({
  i18n,
  router,
  store,
  computed: {
    ...mapState('permission', [
      'routes'
    ])
  },
  created() {
    // 收集后端返回的多语言添加到对应的json文件中
    // getLanguage().then(res => {
    //   if (res.code === 200) {
    //     this.setLanguage('en', res)
    //     this.setLanguage('zh', res)
    //   }
    // })
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('releases/versionShow')

    // 获取并记录用户 UA
    this.$store.commit('ua/get')
    // 初始化全屏监听
    this.$store.dispatch('fullscreen/listen')
  },
  methods: {
    setLanguage(type, res) {
      const arr = res.data.map(item => { return { [item.code]: item[type] } })
      const obj = {}

      arr.forEach(item => {
        Object.assign(obj, item)
      })
      this.$i18n.mergeLocaleMessage(type, { ...obj })
    }
  },
  render: h => h(App)
}).$mount('#app')
