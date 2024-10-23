const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // 配置scss全局引入变量和mixins
  resetScssLoader(config) {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['src/styles/variables.scss', 'src/styles/mixins.scss'], //  src/styles下面的公用样式，不用每次引入
        })
        .end()
    })
  },
  // 配置svg-loader
  setupSvgLoader(config) {
    config.module.rule('svg').exclude.add(resolve('../../src/assets/icon')).end()
    config.module
      .rule('icon')
      .test(/\.svg$/)
      .include.add(resolve('../../src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
}
