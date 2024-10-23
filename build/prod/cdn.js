module.exports = {
  setupLibsCDN(config) {
    // 外部cdn库
    const externals = {
      ['vue']: 'Vue',
      ['vuex']: 'Vuex',
      ['axios']: 'axios',
      ['echarts']: 'echarts',
      ['vue-i18n']: 'VueI18n',
      ['element-ui']: 'ELEMENT',
      ['vue-router']: 'VueRouter',
      ['@smallwei/avue']: 'AVUE',
    }

    // cdn链接
    const cdnUrl = process.env.VUE_APP_TOOL_CDN
    const cdn = {
      css: [`${cdnUrl}/libs/avue.index.css`],
      js: [
        // vue
        `${cdnUrl}/libs/vue.min@2.6.10.js`,
        // vue-router
        `${cdnUrl}/libs/vue-router.min@3.0.2.js`,
        // vuex
        `${cdnUrl}/libs/vuex.min@3.1.0.js`,
        // axios
        `${cdnUrl}/libs/axios.min@0.18.1.js`,
        // element-ui
        `${cdnUrl}/libs/element-ui.min@2.15.14.js`,
        // avue
        `${cdnUrl}/libs/avue.min@2.10.16.js`,
        // vue-i18n
        `${cdnUrl}/libs/vue-i18n.min@7.3.2.js`,
        // echarts
        `${cdnUrl}/libs/echarts.min@5.3.1.js`,
      ],
    }

    // 定义不被webpack导入
    config.externals(externals)

    // 注入cdn链接到index.html
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  },
}
