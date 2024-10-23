<template>
  <section
    class="app-main"
    id="app-main">
    <transition name="fade">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapGetters(['userInfo']),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
  },
  mounted() {
    if (!window?.$waterMark?.CONTAINERID && this.userInfo?.uid) {
      window.$waterMark = this.watermark({
        id: 'app-main',
        text: this.userInfo.uid,
        fontSize: '16px',
        width: 100,
        height: 100,
        degree: -25,
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  flex: 1;
  width: 100%;
  overflow: hidden;
}
</style>
