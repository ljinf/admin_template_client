<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{ $t('config.title') }}</h3>

      <div class="drawer-item">
        <span>{{ $t('config.theme') }}</span>
        <theme-picker
          style="float: right; height: 26px; margin: -3px 8px 0 0"
          @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('config.tagsView') }}</span>
        <el-switch
          v-model="tagsView"
          active-text="ON"
          inactive-text="OFF"
          class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from './Theme.vue'

export default {
  components: { ThemePicker },
  data() {
    return {}
  },
  computed: {
    isShowJob() {
      return this.$store.getters.language === 'zh'
    },
    fixedHeader: {
      get() {
        return this.$store.state.setting.fixedHeader
      },
      set(val) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'fixedHeader',
          value: val,
        })
      },
    },
    tagsView: {
      get() {
        return this.$store.state.setting.showTagsView
      },
      set(val) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'showTagsView',
          value: val,
        })
      },
    },
    sidebarLogo: {
      get() {
        return this.$store.state.setting.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'sidebarLogo',
          value: val,
        })
      },
    },
    lang() {
      return this.$store.getters.language
    },
  },
  watch: {
    tagsView() {
      window.eventBus.$emit('resetTableHeight')
    },
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('setting/changeSetting', {
        key: 'theme',
        value: val,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }

  .job-link {
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
</style>
