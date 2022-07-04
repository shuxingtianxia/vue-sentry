const getters = {
  language: state => state.app.language || 'ZH',
  asideRoutes: state => state.menu.aside, // 菜单权限
  isRoutes: state => state.menu.isRoutes,
  hasButtonPermission: state => (permission) => ((state.menu.btns || []).indexOf(permission) > -1) // 按钮权限
}
export default getters
