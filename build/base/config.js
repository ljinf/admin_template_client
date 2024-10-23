const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  setNameAndAlias(config) {
    config.name = 'Loading'
    config.resolve.alias.set('@', resolve('../../src'))
  },

  // 设置build性能提示
  resetPerformance(config) {
    config.performance
      .maxEntrypointSize(10000000) // 入口起点的最大体积
      .maxAssetSize(30000000) // 根据单个资源体积，控制 webpack 何时生成性能提示
      .assetFilter(function (assetFilename) {
        // 此属性容许 webpack 控制用于计算性能提示的文件
        return assetFilename.endsWith('.js')
      })
  },
}
