const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chunks: 'all',
  cacheGroups: {
    libs: {
      name: 'chunk-libs',
      test: /[\\/]node_modules[\\/]/,
      priority: 10,
      chunks: 'initial',
    },
    elementUI: {
      name: 'chunk-elementUI',
      priority: 20,
      test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
    },
    commons: {
      name: 'chunk-commons',
      test: resolve('src/components'),
      minChunks: 3,
      priority: 5,
      reuseExistingChunk: true,
    },
  },
}
