const CompressionWebpackPlugin = require('compression-webpack-plugin')
const VueFilenameInjector = require('@d2-projects/vue-filename-injector')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const themeUtil = require('webpack-theme-color-replacer/themeUtil')
// const forElementUI = require('webpack-theme-color-replacer/forElementUI')
const SentryCliPlugin = require('@sentry/webpack-plugin')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// 基础路径 注意发布之前要先修改这里
const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'

// 设置不参与构建的库
const externals = {}

// 多页配置，默认未开启，如需要请参考 https://cli.vuejs.org/zh/config/#pages
const pages = undefined
const IsProd = process.env.NODE_ENV === 'production'
console.log('npm_config_report', process.env.npm_config_report)
module.exports = {
  // 根据你的实际情况更改这里
  publicPath,
  lintOnSave: true,
  devServer: {
    publicPath, // 和 publicPath 保持一致
    disableHostCheck: process.env.NODE_ENV === 'development', // 关闭 host check，方便使用 ngrok 之类的内网转发工具
    overlay: {
      warnings: true,
      errors: true
    },
    open: true,
    port: 8889,
    proxy: {
      '/service1': {
        // target: "http://192.168.130.220:30101", //原始 dev
        target: 'https://pmisqas.wingtech.com', // dev环境
        // target: " http://192.168.46.65:30001", //x
        // target: " http://192.168.47.70:30001", //s
        changeOrigin: true,
        timeout: 60000,
        ws: false, // 是否代理websockets
        pathRewrite: {
          '^/service1': '/service1'
        },
        secure: false // 如果是https接口，需要配置这个参数 是否验证SSL Certs
      },
      '/i18n': {
        target: 'http://zbxt00.wingtech.com/ELSServer_WT', // 泽邦
        changeOrigin: true,
        timeout: 60000,
        websocket: false,
        pathRewrite: {
          '^/i18n': ''
        },
        secure: false
      },
      '/api': {
        // target: 'https://srmdev.wingtech.com', // dev环境
        target: 'https://srmqas.wingtech.com', // dev环境
        changeOrigin: true,
        timeout: 60000,
        pathRewrite: {
          '^/api': '/service1'
        },
        secure: false // 如果是https接口，需要配置这个参数 是否验证SSL Certs
      }
    }
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: '@import \'~@/assets/style/public.scss\';'
      }
    }
  },
  pages,
  configureWebpack: config => {
    const configNew = {}
    if (IsProd) {
      configNew.externals = externals
      configNew.plugins = [
      // gzip
        new CompressionWebpackPlugin({
          algorithm: 'gzip', // 使用gzip压缩
          filename: '[path].gz[query]', // 压缩后的名字
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240, // 对超过10kb的数据压缩
          minRatio: 0.8, // 压缩率少于0.8才会压缩
          deleteOriginalAssets: false // 是否删除未压缩的源文件
        }),
        // 数据监控sourcemap
        new SentryCliPlugin({
          release: process.env.VUE_APP_RELEASE,
          authToken: '0ed492e4ac7048f5a2d55e04039994c8af7a2d8242014c4e978ff21d43f70e21',
          url: 'http://192.168.56.101:9000',
          org: 'sentry',
          project: 'empty-template',
          urlPrefix: '~/',
          include: './dist',
          ignore: ['node_modules']
        })
      ]
    }

    return configNew
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@assets', resolve('./src/assets'))
      .set('@components', resolve('./src/components'))
      .set('@public', resolve('./public'))
      .set('@routePath', resolve(`./src/router/${IsProd ? 'index' : 'index'}.js`))

    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    config
      .plugin('theme-color-replacer')
      .use(ThemeColorReplacer, [{
        fileName: 'css/theme-colors.[contenthash:8].css',
        matchColors: themeUtil.getMyColors(process.env.VUE_APP_ELEMENT_COLOR, [process.env.VUE_APP_ELEMENT_COLOR, '#c655dd'])
        // changeSelector(cssSelector) { // 可选，功能。更改css选择器以提高css优先级，从而解决延迟加载问题。
        //   console.log('cssSelector', cssSelector)
        //   return cssSelector
        // }
      }])
    config
      // 开发环境 sourcemap 不包含列信息
      .when(process.env.NODE_ENV === 'development',
        configItem => configItem.devtool('cheap-source-map')
      )
      // 预览环境构建 vue-loader 添加 filename
      .when(
        process.env.VUE_APP_SCOURCE_LINK === 'TRUE',
        configItem => VueFilenameInjector(configItem, {
          propName: process.env.VUE_APP_SOURCE_VIEWER_PROP_NAME
        })
      )
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
    // splitChunks
    config.when(process.env.NODE_ENV !== 'development', _config => {
      _config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          wingtechUI: {
            name: 'chunk-wingtechUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?@wt\/wingtech-ui(.*)/ // in order to adapt to cnpm
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          vxeTable: {
            name: 'chunk-vxeTable', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vxe-table(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 2, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      _config.optimization.usedExports = true
      _config.optimization.minimize = true
    })
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      // .use('image-webpack-loader')
      // .loader('image-webpack-loader')
      // .options({
      //   mozjpeg: { progressive: true, quality: 50 },
      //   optipng: { enabled: true },
      //   pngquant: { quality: [0.5, 0.65], speed: 4 },
      //   gifsicle: { interlaced: false }
      // })
      // .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@api', resolve('src/api'))
    // 分析工具
    if (process.env.VUE_APP_npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  // 不输出 map 文件
  productionSourceMap: true,
  // i18n
  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
