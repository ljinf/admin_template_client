import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('setting/closeSideBar', { withoutAnimation: false })
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('setting/toggleDevice', 'mobile')
      store.dispatch('setting/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('setting/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('setting/closeSideBar', { withoutAnimation: true })
        }
      }
    },
  },
}
