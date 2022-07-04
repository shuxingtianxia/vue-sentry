import { getAction, getBlobProgress } from '@/api/axios'

export default {
  login: (params) => getAction({ url: '/api/ump/login', params, noEnvUrl: true }), // 登录
  checkCode: (id) => getBlobProgress({ url: `/user/checkCode/${id}` }), // 获取验证码
  getMenuList: () => getAction({ url: `/user/getMenuList` }), // 获取当前用户拥有的菜单权限
  getButtonList: () => getAction({ url: `/user/getButtonList` }), // 获取当前用户拥有的按钮权限
  forget: (params) => getAction({ url: `/user/retrievePassword`, params }), // 忘记密码
  logout: () => getAction({ url: `/user/logout` }), // 退出登录
  refeshToken: () => getAction({ url: `/user/refresh/token` }) // 刷新token
}
