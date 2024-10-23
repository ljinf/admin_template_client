<template>
  <div
    class="chart-card"
    :style="{ width: width, height: height }"
    :class="{ 'is-border': border }">
    <div
      class="title"
      :class="{ 'is-padding': isTitlePadding, 'top-center': align === 'top-center' }">
      <div
        v-if="title"
        class="left">
        {{ title }}
      </div>
      <slot name="title-right"></slot>
    </div>

    <div
      ref="chartRef"
      class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { debounce } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      chart: null,
      resizeHandler: null,
    }
  },
  props: {
    border: {
      type: Boolean,
      default: true,
    },
    isTitlePadding: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
    },
    width: {
      type: String,
      default: '100%',
    },
    align: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '100%',
    },
    option: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('setting', ['sidebar', 'tagsView']),
  },
  watch: {
    'sidebar.opened'() {
      this.$nextTick(() => {
        this.resizeHandler()
      })
    },
    tagsView() {
      this.$nextTick(() => {
        this.resizeHandler()
      })
    },
    option: {
      handler() {
        this.initChart()
      },
      deep: true,
    },
  },
  methods: {
    resize() {
      const { chart } = this
      chart && chart.resize()
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chartRef)

      this.chart.setOption({
        color: [
          '#50D166',
          '#3F66F6',
          '#fac858',
          '#ee6666',
          '#73c0de',
          '#fc8452',
          '#9a60b4',
          '#ea7ccc',
          '#3ba272',
        ],
        grid: {
          top: '15%',
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true,
        },
        ...this.option,
      })
    },
    initListener() {
      this.resizeHandler = debounce(() => {
        this.resize()
      }, 300)
      window.addEventListener('resize', this.resizeHandler)
    },
    destroyListener() {
      window.removeEventListener('resize', this.resizeHandler)
      this.resizeHandler = null
    },
  },
  mounted() {
    this.initChart()
    if (!this.resizeHandler) {
      this.initListener()
    }
  },
  beforeDestroy() {
    this.destroyListener()
  },
}
</script>

<style lang="scss" scoped>
.chart-card {
  position: relative;
  .title {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.is-padding {
      padding: 0 15px;
    }
    &.top-center {
      width: 100%;
      align-items: flex-start;
      justify-content: center;
    }
    .left {
      font-weight: bold;
      font-size: 15px;
    }
  }
  .chart {
    width: 100%;
    height: 100%;
  }
  &.is-border {
    border: 1px solid #eee;
  }
}
</style>
