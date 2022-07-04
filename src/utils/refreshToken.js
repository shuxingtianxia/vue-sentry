import store from '@/store'
import { Message } from 'element-ui'
class RefreshToken {
  constructor() {
    this.currentTime = new Date().getTime()
    this.distinceTime = 0
  }
  setRefreshToken() {
    setInterval(() => {
      if (this.noWatch()) {
        // console.log('this.distinceTime', this.distinceTime)
        this.distinceTime += 60 * 1000
      }
    }, 60 * 1000)

    window.onload = () => {
      document.addEventListener('mousemove', this.handleSetToken.bind(this))
      document.addEventListener('scroll', this.handleSetToken.bind(this), true)
    }
  }
  handleSetToken() {
    if (this.noWatch()) {
      // 超过30分钟超时
      if (this.currentTime + this.distinceTime > this.currentTime + 30 * 60 * 1000) {
        store.dispatch('account/cancel', {}, { root: true })
        // throttle(function() {
        this.currentTime = new Date().getTime()
        this.distinceTime = 0
        Message({
          showClose: false,
          message: 'token无效或过期，请重新登录！',
          type: 'error',
          duration: 3000,
          onClose() {
            // if (vue.$ssoComeIn) { // 内部用户
            //   deleteCookiesDomain()
            //   window.location.replace(window._CONFIG['ssoURL'])
            // } else { // 外部用户
            //   router.push('/login')
            // }
          }
        })
        // })()
        return
      }
      // 25分钟自动刷新
      if (this.currentTime + this.distinceTime > this.currentTime + 25 * 60 * 1000) {
        store.dispatch('account/refeshToken', {}, { root: true })
        this.currentTime = new Date().getTime()
        this.distinceTime = 0
      }
    }
  }
  beforeDestroy() {
    store.dispatch('account/refeshToken', {}, { root: true })
    this.currentTime = new Date().getTime()
    this.distinceTime = 0
  }
  noWatch() {
    const whiteList = ['/login', '/404']
    const isLoginRoute = whiteList.some(ele => window.location.href.indexOf(ele) > 0)
    return !isLoginRoute
  }
}
export default new RefreshToken()
