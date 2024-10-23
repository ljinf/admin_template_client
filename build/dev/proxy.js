module.exports = {
  setupProxy() {
    const proxyPrefix = process.env.VUE_APP_BASE_URL // prefix
    const proxTarget = process.env.VUE_APP_PROXY_TARGET // target
    const rewritePath = proxTarget?.includes(proxyPrefix) ? proxyPrefix : ''

    return {
      [proxyPrefix]: {
        changeOrigin: true,
        target: proxTarget,
        pathRewrite: {
          [`^${proxyPrefix}`]: rewritePath,
        },
      },
      '/api/': {
        changeOrigin: true,
        target: 'http://admin.shortstv.cc/api/',
      },
    }
  },
}
