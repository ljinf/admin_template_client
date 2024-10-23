const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  setupCompression(config) {
    config.plugin('compressionPlugin').use(
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css)(\?.*)?$/i, //用['js', 'css']有个缺点就是map文件也会压缩,这时候压缩就没多大意义,用正则会更好一点
        threshold: 10240, // 单位bytes, 大于10k才会考虑压缩
        minRatio: 0.8, // 默认压缩率, 压缩结果能低于百分之八十才会进行压缩
      }),
    )
  },
}
