const { run } = require('runjs')
const open = require('open')
const chalk = require('chalk')

run('vue-cli-service build')
const config = require('../../vue.config')
const port = 9526
const publicPath = config.publicPath
const connect = require('connect')
const serveStatic = require('serve-static')
const app = connect()

app.use(
  publicPath,
  serveStatic('./dist', {
    index: ['index.html', '/'],
  }),
)

app.listen(port, function () {
  console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`))
  open(`http://localhost:${port}${publicPath}`)
})
