<template>
  <div
    class="page-container"
    :class="[arrowScroll ? 'scroll-y' : 'hidden']">
    <div class="page-wrap">
      <div
        class="page-title"
        v-if="showTitle">
        <div class="left-title">
          <el-button
            v-if="showBack"
            class="back"
            icon="el-icon-arrow-left"
            @click="$router.back()">
          </el-button>
          <slot name="left-title">
            <h1>{{ title || generateTitle($route.meta.title) }}</h1>
          </slot>
        </div>
        <div class="title-right">
          <slot name="title-right" />
        </div>
      </div>
      <div class="page-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { generateTitle } from '@/lang/utils'
import { mapGetters } from 'vuex'
export default {
  methods: {
    generateTitle,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    showBack: {
      type: Boolean,
      default: false,
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
    scrollY: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('setting', ['device']),
    arrowScroll() {
      return this.scrollY || this.device === 'mobile'
    },
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  padding: 15px;
  .page-wrap {
    @include flexbox($fd: column);
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #fff;
    .page-title {
      display: flex;
      margin-bottom: 20px;

      .left-title {
        font-size: 14px;
        .back {
          margin-right: 20px;
        }
        @include flexbox($ai: center);
      }
      h1 {
        margin: 0;
        padding: 0;
        flex-shrink: 0;
        font-weight: 500;
        font-size: 20px;
        color: $textColor;
      }
      .title-right {
        flex: 1;
        text-align: right;
      }
    }
    .page-content {
      @include flexbox($fd: column);
      overflow-x: hidden;
      overflow-y: hidden;
      flex: 1;
      height: 100%;
      width: 100%;
    }
  }

  &.hidden {
    overflow: hidden;
  }
  &.scroll-y {
    overflow-x: hidden;
    overflow-y: auto;
    .page-wrap,
    .page-content {
      display: block;
      height: auto;
      min-height: 100%;
    }
  }
}
</style>
