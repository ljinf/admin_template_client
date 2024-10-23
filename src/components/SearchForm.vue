<template>
  <div class="search-form">
    <div class="left">
      <avue-form
        ref="searchFormRef"
        v-model="searchForm"
        :option="{ ...baseOptions, ...searchOptions, column: formColumns }"
        @keyup.enter.native="handleSearch">
        <template slot="menuBtn">
          <el-button
            type="primary"
            @click="handleSearch">
            {{ $t('buttons.search') }}
          </el-button>

          <el-button
            v-if="searchOptions.resetBtn || true"
            @click="handleReset">
            {{ $t('buttons.reset') }}
          </el-button>

          <slot name="newBtn"></slot>
        </template>
      </avue-form>
    </div>

    <div class="right">
      <slot name="right-menu"> </slot>
    </div>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      resetData: {},
      searchForm: {},
      baseOptions: {
        menuBtn: false,
        filterDic: true,
        span: 4,
        gutter: 20,
        menuSpan: 10,
        labelWidth: 0,
        labelPosition: 'left',
      },
    }
  },
  props: {
    value: {
      type: Object,
      default() {
        return {}
      },
    },
    searchColumns: {
      type: Array,
      default() {
        return []
      },
    },
    searchOptions: {
      type: Object,
      default() {
        return {
          resetBtn: true,
        }
      },
    },
  },
  computed: {
    ...mapGetters('setting', ['language']),
    menuColumn() {
      return {
        label: '',
        labelWidth: 0,
        prop: 'menuBtn',
        span: this.searchOptions.menuSpan || 6,
      }
    },
    formColumns() {
      return [...this.searchColumns, this.menuColumn]
    },
  },
  watch: {
    searchForm: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true,
    },
  },
  methods: {
    // 初始化搜索的表单数据
    initSearchForm() {
      this.resetData = deepClone(this.value) // 保留一份用于重置
      this.searchForm = deepClone(this.value)
    },

    // 点击搜索
    handleSearch() {
      delete this.searchForm.menuBtn
      this.$emit('on-search', this.searchForm)
    },

    // 点击重置，把数据重置为初始化阶段
    handleReset() {
      if (Object.keys(this.resetData)?.length) {
        this.$refs.searchFormRef.resetForm()
        this.searchForm = deepClone(this.resetData)
      } else {
        this.$refs.searchFormRef.resetForm()
      }
      delete this.searchForm.menuBtn
      this.$emit('on-search', this.searchForm)
    },
  },
  mounted() {
    this.initSearchForm()
  },
}
</script>

<style lang="scss" scoped>
.search-form {
  @include flexbox();
  width: 100%;
  .left {
    flex: 1;
    overflow: hidden;
  }
}
</style>
