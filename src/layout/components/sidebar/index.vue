<template>
  <div :class="{ 'has-logo': showLogo }">
    <sidebar-logo
      v-if="showLogo"
      :collapse="isCollapse" />
    <el-scrollbar
      class="side-scrollbar"
      wrap-class="scrollbar-wrapper">
      <el-menu style="text-align: center"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :background-color="variables.menuBg"
        :unique-opened="false"
        :collapse-transition="false"
        active-text-color="#ffffff"
        mode="vertical">
        <sidebar-item
          v-for="route in sidebarRouters"
          :key="route.path"
          :item="route"
          :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, SidebarLogo },
  computed: {
    ...mapGetters('setting', ['sidebar', 'theme']),
    ...mapGetters('router', ['routes']),
    ...mapGetters(["sidebarRouters"]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.setting.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
}
</script>

<style lang="scss">
.sidebar-container {
  .el-submenu__title {
    &:hover {
      background-color: var(--menuHoverBg) !important;
    }
  }

  .is-active > .el-submenu__title {
    color: var(--theme) !important;
  }

  .el-scrollbar__bar {
    display: none;
  }

  .el-menu-item,
  .el-menu .nest-menu .el-menu-item {
    &:hover {
      background-color: var(--menuHoverBg) !important;
    }

    &:focus,
    &.is-active {
      background-color: var(--theme) !important;
    }
  }
}

.el-menu--vertical {
  > .el-menu--popup {
    padding: 0;
    .nest-menu {
      .el-menu-item {
        height: 46px;
        line-height: 44px;

        &:hover {
          background-color: var(--menuHoverBg) !important;
        }

        &:focus,
        &.is-active {
          background-color: var(--theme) !important;
        }
      }
    }
  }
}
</style>
