module.exports = {
  resetPreLoad(config) {
    // 去除webpack自带的空闲预加载插件，与路由懒加载冲突了
    config.plugins.delete('prefetch')

    // 去除一些资源的懒加载，优化首屏加载性能
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ])

    // 删除注释、console.log、debugger
    // const terser = config.optimization.minimizer('terser')
    // terser.tap(args => {
    //   const { terserOptions } = args[0]
    //   Object.assign(terserOptions, {
    //     compress: {
    //       ...terserOptions.compress,
    //       drop_console: true,
    //       drop_debugger: true,
    //     },
    //     format: {
    //       comments: /@license/i,
    //     },
    //   })
    //   return args
    // })
  },
}
