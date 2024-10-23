const { run } = require('runjs')
const open = require('open')
const chalk = require('chalk')

run(`vue-cli-service build --report`)
const port = 9525
const config = require('../../vue.config.js')
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
  console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`))
  open(`http://localhost:${port}${publicPath}report.html`)
})
