import { Message, MessageBox } from 'element-ui'
import util from '@/libs/util.js'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import router from '@/router'
import apiUser from '@/api/modules/user'
const { login, logout, refeshToken } = apiUser
/*
  该页面主要处理用户方面，比如：登录，注册，清空用户信息，退出登录，刷新token
*/

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    async login({ dispatch }, form) {
      const res = await login(form)
      // 设置 cookie 一定要存 uuid 和 token 两个 cookie
      // 整个系统依赖这两个数据进行校验和存储
      // token 代表用户当前登录状态 建议在网络请求中携带 token
      // 如有必要 token 需要定时更新，默认保存一天
      util.cookies.set('uuid', form.email)
      util.cookies.set('token', res.data)
      // 设置 vuex 用户信息
      await dispatch('user/set', { name: form.email }, { root: true })
      // 用户登录后从持久化数据加载一系列的设置
      await dispatch('load')
      return res
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      // 判断是否需要确认
      if (confirm) {
        commit('gray/set', true, { root: true })
        MessageBox.confirm('确定要注销当前用户吗', '注销用户', { type: 'warning' })
          .then(() => {
            commit('gray/set', false, { root: true })
            logout().then(res => {
              if (res.code === 200) {
                dispatch('account/cancel', {}, { root: true })
              }
            })
          })
          .catch(() => {
            commit('gray/set', false, { root: true })
            Message({ message: '取消注销操作' })
          })
      } else {
        dispatch('account/cancel', {}, { root: true })
      }
    },
    // 清空一些用户信息
    async cancel({ dispatch, commit }) {
      // 删除cookie
      util.cookies.remove('token')
      util.cookies.remove('uuid')
      // 清空 vuex 用户信息
      await dispatch('user/set', {}, { root: true })
      // 清空菜单路由
      await commit('menu/clearRoutes', [], { root: true })
      // 跳转路由
      router.push({ name: 'login' })
      // 清空动态添加的router
      const newRouter = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
      })
      router.matcher = newRouter.matcher
    },
    // 刷新token
    refeshToken({ commit }) {
      refeshToken().then(res => {
        if (res.code === 200) {
          util.cookies.set('token', res.data)
        }
      })
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    async load({ dispatch }) {
      // 加载用户名
      await dispatch('user/load', null, { root: true })
      // 加载主题
      await dispatch('theme/load', null, { root: true })
      // 加载页面过渡效果设置
      await dispatch('transition/load', null, { root: true })
      // 持久化数据加载上次退出时的多页列表
      await dispatch('page/openedLoad', null, { root: true })
      // 持久化数据加载侧边栏配置
      await dispatch('menu/asideLoad', null, { root: true })
      // 持久化数据加载全局尺寸
      await dispatch('size/load', null, { root: true })
      // 持久化数据加载颜色设置
      await dispatch('color/load', null, { root: true })
    }
  }
}
