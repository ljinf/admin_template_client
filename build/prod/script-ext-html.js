module.exports = {
  setupScriptExtHtml(config) {
    config.optimization.runtimeChunk('single')
    config
      .plugin('ScriptExtHtmlWebpackPlugin')
      .after('html')
      .use('script-ext-html-webpack-plugin', [
        {
          inline: /runtime\..*\.js$/,
        },
      ])
      .end()
  },
}
