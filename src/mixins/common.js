const commonMountedMixin = {
  methods: {
    // 权限判断
    $checkPerm(perm, module) {
      const permMap = this.$store.getters['app/permMap'] || {}
      const menuModule = module ?? this.$route?.name
      const permList = permMap[menuModule]

      return permList?.some(permItem => {
        const permType = permItem?.Name?.split('.')?.slice(-1)?.toString()
        return perm === permType
      })
    },

    // cdn链接拼接
    $resolveCdnUrl(fileUrl) {
      const baseUrl = this.$store.getters['cdnUrl'] || ''
      return baseUrl + fileUrl
    },
  },
}

const globalMixins = {
  install(Vue) {
    Vue.mixin({
      mixins: [commonMountedMixin],
    })
  },
}

export default globalMixins
