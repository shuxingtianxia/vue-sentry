import cookies from '../utils/cookies'
import db from './util.db'
import log from './util.log'
import i18n from '../i18n'
const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function(titleText) {
  const processTitle = process.env.VUE_APP_TITLE || '闻泰物流管理'
  window.document.title = `${processTitle}${i18n.t(titleText) ? ` | ${i18n.t(titleText)}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function(url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'wt-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('wt-link-temp'))
}

export default util
