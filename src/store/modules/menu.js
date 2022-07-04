// 设置文件
import setting from '@/setting.js'
import apiUser from '@/api/modules/user'
import { cloneDeep } from 'lodash'
import { frameInRoutes } from '@/router/routes'
import router from '@/router'
const { getMenuList, getButtonList } = apiUser
// 递归菜单
function menuList(data) {
  data.forEach(item => {
    item.path = item.url
    item.meta = {}
    item.meta.title = item.chineseName
    item.hidden = !item.isShowMenu
    if (item.isOne) {
      item.component = () => import(`@/layout`)
    } else if (item.componentPath) {
      // item.component = (resolve) => require([`@/views${item.componentPath}`], resolve)
      item.component = () => import(`@/views${item.componentPath}`)
    } else {
      item.component = () => import(`@components/common/RouterView`)
    }
    item.meta.cache = true
    item.name = item.componentName
    if (item.children.length) {
      menuList(item.children)
    }
  })
}

/**
 * 将子路由转换为扁平化路由数组（仅一级）
 * @param {待转换的子路由数组} routes
 * @param {父级路由路径} parentPath
 */
function castToFlatRoute(routes, parentPath, flatRoutes = []) {
  for (const item of routes) {
    if (item.children && item.children.length > 0) {
      if (item.redirect && item.redirect !== 'noRedirect') {
        flatRoutes.push({
          name: item.name,
          path: (parentPath + '/' + item.path).substring(1),
          redirect: item.redirect,
          meta: item.meta
        })
      }
      castToFlatRoute(item.children, parentPath + '/' + item.path, flatRoutes)
    } else {
      flatRoutes.push({
        name: item.name,
        path: (parentPath + '/' + item.path).substring(1),
        component: item.component,
        meta: item.meta,
        componentPath: item.componentPath
      })
    }
  }

  return flatRoutes
}

/**
 * 生成扁平化机构路由(仅两级结构)
 * @param {允许访问的路由Tree} accessRoutes
 * 路由基本机构:
 * {
 *   name: String,
 *   path: String,
 *   component: Component,
 *   redirect: String,
 *   children: [
 *   ]
 * }
 */
function generateFlatRoutes(accessRoutes) {
  const flatRoutes = []
  for (const item of accessRoutes) {
    let childrenFflatRoutes = []
    if (item.children && item.children.length > 0) {
      childrenFflatRoutes = castToFlatRoute(item.children, '')
    }

    // 一级路由是布局路由,需要处理的只是其子路由数据
    flatRoutes.push({
      name: item.name,
      path: item.path,
      component: item.component,
      redirect: item.redirect,
      children: childrenFflatRoutes,
      meta: item.meta
    })
  }
  return flatRoutes
}
/*
  该页面主要处理权限问题，例如：菜单权限
*/

// const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

export default {
  namespaced: true,
  state: {
    isRoutes: true, // 默认有权限
    // 侧栏菜单
    aside: [],
    asyncRoutes: [], // 存放请求过来路由的数据
    // 按钮权限
    btns: [],
    // 侧边栏收缩
    asideCollapse: setting.menu.asideCollapse,
    // 侧边栏折叠动画
    asideTransition: setting.menu.asideTransition
  },
  actions: {
    /**
     * 设置侧边栏展开或者收缩
     * @param {Object} context
     * @param {Boolean} collapse is collapse
     */
    async asideCollapseSet({ state, dispatch }, collapse) {
      // store 赋值
      state.asideCollapse = collapse
      // 持久化
      await dispatch('db/set', {
        dbName: 'sys',
        path: 'menu.asideCollapse',
        value: state.asideCollapse,
        user: true
      }, { root: true })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} context
     */
    async asideCollapseToggle({ state, dispatch }) {
      // store 赋值
      state.asideCollapse = !state.asideCollapse
      // 持久化
      await dispatch('db/set', {
        dbName: 'sys',
        path: 'menu.asideCollapse',
        value: state.asideCollapse,
        user: true
      }, { root: true })
    },
    /**
     * 设置侧边栏折叠动画
     * @param {Object} context
     * @param {Boolean} transition is transition
     */
    async asideTransitionSet({ state, dispatch }, transition) {
      // store 赋值
      state.asideTransition = transition
      // 持久化
      await dispatch('db/set', {
        dbName: 'sys',
        path: 'menu.asideTransition',
        value: state.asideTransition,
        user: true
      }, { root: true })
    },
    /**
     * 切换侧边栏折叠动画
     * @param {Object} context
     */
    async asideTransitionToggle({ state, dispatch }) {
      // store 赋值
      state.asideTransition = !state.asideTransition
      // 持久化
      await dispatch('db/set', {
        dbName: 'sys',
        path: 'menu.asideTransition',
        value: state.asideTransition,
        user: true
      }, { root: true })
    },
    /**
     * 持久化数据加载侧边栏设置
     * @param {Object} context
     */
    async asideLoad({ state, dispatch }) {
      // store 赋值
      const menu = await dispatch('db/get', {
        dbName: 'sys',
        path: 'menu',
        defaultValue: setting.menu,
        user: true
      }, { root: true })
      state.asideCollapse = menu.asideCollapse !== undefined ? menu.asideCollapse : setting.menu.asideCollapse
      state.asideTransition = menu.asideTransition !== undefined ? menu.asideTransition : setting.menu.asideTransition
    },
    // 获取菜单权限
    async getMenu({ dispatch, commit }) {
      // 存左侧菜单到vuex中
      let flatRoutes = null
      await getMenuList().then(async res => {
        if (res.code === 200) {
          const routes = res.data
          routes.forEach(item => {
            item.isOne = true
          })
          menuList(routes)
          // 有木有权限
          if (!routes.length) {
            commit('setIsRoutes', false)
          }
          // 存左侧菜单到vuex中
          await commit('asideSet', [...frameInRoutes, ...routes])
          await commit('page/init', [...frameInRoutes, ...routes], { root: true })
          // 用户登录后从数据库加载一系列的设置
          await dispatch('account/load', {}, { root: true })
          const asyncRoutes = cloneDeep(routes)
          // 把三级路由转成二级路由
          flatRoutes = generateFlatRoutes(asyncRoutes)
          commit('asyncRoutes', flatRoutes)
          router.addRoutes([...flatRoutes, {
            path: '*',
            name: 'NoFind',
            component: () => import('@/views/system/error/404')
            // component: (resolve) => require([`@/views/system/error/404`], resolve)
          }])
        }
      })
      // 获取按钮权限
      getButtonList().then(res => {
        if (res.code === 200) {
          commit('setBtns', res.data)
        }
      })
    }
  },
  mutations: {
    /**
     * @description 设置侧边栏菜单
     */
    asideSet(state, menu) {
      // store 赋值
      state.aside = menu
    },
    // 请求过来的路由
    asyncRoutes: (state, asyncRoutes) => {
      state.asyncRoutes = asyncRoutes
    },
    // 设置是不是有权限
    setIsRoutes(state, flag) {
      state.isRoutes = flag
    },
    // 权限按钮
    setBtns: (state, btns) => {
      state.btns = btns
    },
    // 清空菜单
    clearRoutes: (state) => {
      state.aside = []
    }
  }
}

