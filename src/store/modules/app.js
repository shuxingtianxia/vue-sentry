import util from '@/libs/util'
export default {
  namespaced: true,
  state: {
    language: util.cookies.get('lang')
  },
  mutations: {
  }
}
