const domain = { // domain
  dev: 'http://srmgatewaydev.wingtech.com', // 开发环境
  qas: 'http://srmgatewayqas.wingtech.com', // 测试环境
  uat: 'http://srmgatewayuat.wingtech.com', // 用户环境
  prd: 'http://srmgateway.wingtech.com' // 正式
}

const sso = { // SSO
  dev: 'http://ssodev.wingtech.com/', // 开发环境
  qas: 'http://ssoqas.wingtech.com/', // 测试环境
  uat: 'http://ssouat.wingtech.com/', // 用户环境
  prd: 'https://sso.wingtech.com/' // 正式
}
export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  domain,
  sso,
  //   env: Object.keys(domain).find(key => domain[key].includes(window.location.hostname)) || 'local'
  env: (function() {
    return domain[process.env.VUE_APP_DOMAIN || 'dev']
  }()),
  ssoUrl: (function() {
    return sso[process.env.VUE_APP_DOMAIN || 'dev']
  }())
}
