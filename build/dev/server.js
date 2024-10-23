// 开发环境相关的配置
const port = process.env.VUE_APP_SERVER_PORT || 80 // dev server port
const { setupProxy } = require('./proxy')

module.exports = {
  port: port,
  open: true,
  overlay: {
    warnings: false,
    errors: true,
  },
  proxy: setupProxy(),
}
