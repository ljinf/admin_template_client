<template>
  <div
    :class="classObj"
    class="app-container">
    <!-- 移动端菜单的cover -->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside" />

    <!-- 左侧菜单 -->
    <sidebar class="sidebar-container" />

    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 右侧头部 -->
      <div class="app-header">
        <navbar @toggleRightPanel="toggleRightPanel" />
        <tags-view v-if="showTagsView" />
      </div>

      <!-- 内容区域 -->
      <app-main />

      <!-- 系统设置 -->
      <setting ref="settingRef"></setting>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ResizeMixin from '@/mixins/resize'
import Navbar from './components/navbar'
import TagsView from './components/tagsView'
import Setting from './components/setting'
import Sidebar from './components/sidebar'
import AppMain from './components/AppMain.vue'

export default {
  name: 'Layout',
  mixins: [ResizeMixin],
  components: {
    Navbar,
    TagsView,
    Setting,
    Sidebar,
    AppMain,
  },
  computed: {
    ...mapState({
      sidebar: state => state.setting.sidebar,
      device: state => state.setting.device,
      showTagsView: state => state.setting.showTagsView,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      }
    },
  },
  methods: {
    toggleRightPanel() {
      if (this.$refs.settingRef.show) {
        this.$refs.settingRef.show = false
      } else {
        this.$refs.settingRef.show = true
      }
    },
    handleClickOutside() {
      this.$store.dispatch('setting/closeSideBar', { withoutAnimation: false })
    },
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
