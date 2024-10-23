<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage">
    <div class="lang-select">
      <svg-icon name="lang" />
      <span class="lang-text">{{ langMap[language] }}</span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="language === 'zh'"
        command="zh">
        简体中文
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language === 'en'"
        command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      langMap: {
        zh: '中',
        en: 'EN',
      },
    }
  },
  computed: {
    language() {
      return this.$store.getters['setting/language']
    },
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setting/setLanguage', lang)
    },
  },
}
</script>

<style lang="scss">
.lang-select {
  height: 100%;
  padding: 0 12px;
  .lang-text {
    font-size: 14px;
    margin-left: 5px;
  }
}
</style>
