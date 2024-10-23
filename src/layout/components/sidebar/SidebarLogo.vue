<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/">
        <img
          v-if="logo"
          :src="logo"
          class="sidebar-logo" />
        <h1
          v-else
          class="sidebar-title"
          style="text-align: center">
          {{ getFirstName }}
        </h1>
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/">
        <img
          v-if="logo"
          :src="logo"
          class="sidebar-logo" />
        <h1 class="sidebar-title">{{ $t(APP_SETTING.title) }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { APP_SETTING } from '@/config/setting'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    getFirstName() {
      return this.$t(APP_SETTING.title).slice(0, 1)
    },
  },
  data() {
    return {
      APP_SETTING,
      logo: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $navbarHeight;
  line-height: $navbarHeight;
  background: $navbarBg;
  // border-bottom: 1px solid #eee;
  padding: 0 16px;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    text-align: left;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      // display: inline-block;
      color: #fff;
      margin: 0;
      padding: 0;
      height: $navbarHeight;
      line-height: $navbarHeight;
      font-family: 'Roboto', Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      font-weight: 700;
      font-size: 18px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
