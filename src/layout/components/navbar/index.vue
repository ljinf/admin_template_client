<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar" />

    <div class="right-menu">
      <!-- 国际化 -->
      <lang-select
        v-if="openLanguage"
        class="right-menu-item hover-effect" />

      <!-- 主题 -->
      <div
        v-if="showSetting"
        class="skin-wrap right-menu-item"
        @click="$emit('toggleRightPanel')">
        <svg-icon
          class-name="icon-skin"
          name="skin" />
      </div>

      <!-- 用户信息 -->
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click">
        <div class="avatar-wrapper">
          <div class="username">{{ userInfo.name || userInfo.Name || $t('navbar.unknown') }}</div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="infoPage">
            <span style="display: block">个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span style="display: block">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from './Hamburger.vue'
import LangSelect from '@/components/LangSelect.vue'

export default {
  components: {
    Hamburger,
    LangSelect,
  },
  computed: {
    ...mapGetters(['userInfo']),
    ...mapGetters('setting', ['sidebar', 'device', 'showSetting', 'openLanguage']),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('setting/toggleSideBar')
    },
    async logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.href = '/index';
      })
    },
    infoPage() {
      location.href = '/user/profile';
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navbarHeight;
  overflow: hidden;
  position: relative;
  background: $navbarBg;
  // border-bottom: 1px solid #eee;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    margin-left: 10px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    padding-right: 16px;
    line-height: $navbarHeight;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: $navTextColor;
      vertical-align: text-bottom;
      &.skin-wrap {
        height: 100%;
        padding: 0 16px;
        font-size: 25px;
        cursor: pointer;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        height: 100%;
        padding: 8px 12px;
        position: relative;
        text-align: center;

        .username {
          line-height: 32px;
          font-size: 14px;
          margin-bottom: 2px;
        }
        .userrole {
          font-size: 12px;
          line-height: 14px;
        }
      }
    }
  }
}
</style>
