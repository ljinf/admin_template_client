// vue-cli 相关配置
const publicPath = process.env.BASE_URL || '/'
const nodeEnv = process.env.NODE_ENV || 'development'
const devServerConfig = require('./build/dev/server')
const splitChunksConfig = require('./build/prod/split-chunks')
// const { setupLibsCDN } = require('./build/prod/cdn')
const { resetPreLoad } = require('./build/base/preload')
const { setupCompression } = require('./build/prod/compression')
const { setupScriptExtHtml } = require('./build/prod/script-ext-html')
const { resetScssLoader, setupSvgLoader } = require('./build/base/loaders')
const { setNameAndAlias, resetPerformance } = require('./build/base/config')

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false, // 关闭终端的eslint检查
  publicPath: publicPath, // 路由和资源路径前缀，默认是/
  productionSourceMap: false, // 关闭打包后生成的sourceMap
  devServer: devServerConfig, // 本地node开发服务器相关配置

  // webpack相关配置
  chainWebpack: config => {
    // 网站标题和资源引用别名
    setNameAndAlias(config)

    // scss loader配置全局引入变量
    resetScssLoader(config)

    // svg-icon 相关loader配置
    setupSvgLoader(config)

    // 重置vue cli 预加载的策略
    resetPreLoad(config)

    // 生产环境打包优化
    config.when(nodeEnv === 'production', config => {
      // 重置打包大小提示
      resetPerformance(config)

      // 以cdn的方式引入工具库
      // setupLibsCDN(config)

      // gzip压缩
      setupCompression(config)

      // 每次打包生成相同的runtimeChunk内联到index.html, 减少请求耗时
      setupScriptExtHtml(config)

      // 提取被重复引入的文件，单独生成一个或多个文件避免重复打包文件
      config.optimization.splitChunks(splitChunksConfig)
    })
  },
}
