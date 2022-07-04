const plugins = []

if (process.env.NODE_ENV === 'production') {
// 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
  plugins.push([
    'transform-remove-console',
    {
      // 保留 console.error 与 console.warn
      exclude: ['error', 'warn']
    }
  ])
}
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins
}
