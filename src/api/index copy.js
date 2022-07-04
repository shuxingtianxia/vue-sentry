import { assign } from 'lodash'
import log from 'wingtech-ui/src/libs/util.log'
const files = require.context('./modules', true, /\.js$/) // 组件内部使用
const modules = require.context('@/api/modules', true, /\.js$/) // 项目中使用
const generators = files.keys().map(key => files(key).default || files(key))
const moduleGenerators = modules.keys().map(key => modules(key).default || modules(key))
console.log('moduleGenerators', moduleGenerators)
// 预防api定义的名字一样
const keys = []
moduleGenerators.forEach(item => {
  item && keys.push(...Object.keys(item))
})
const assignGenerators = assign({}, ...generators, ...moduleGenerators)
console.log('assign({}, ...moduleGenerators)', assign({}, ...moduleGenerators), keys)
const len = Object.keys(assign({}, ...moduleGenerators)).length
if (keys.length !== len) {
  log.danger('>>>>>>>>>>  api名字重复  >>>>>>>>>>')
}
export default assignGenerators
