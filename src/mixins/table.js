import { isFunction } from '@/utils/general'
export default {
  data() {
    return {
      loading: false,
      dataList: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 30,
        pageSizes: [30, 50, 100],
      },
      searchForm: {},
      summaryData: {},
    }
  },
  methods: {
    handleSearch() {
      this.page.currentPage = 1
      this.getList()
    },

    // 分页改变
    onPageChange(pageObj) {
      Object.assign(this.page, pageObj)
      this.getList()
    },

    // 查询封装
    async getList() {
      if (!this.fetchMethod) return
      this.dataList = []

      const searchParams = isFunction(this.formatSearch) ? this.formatSearch() : this.searchForm
      const queryParams = {
        ...searchParams,
        page: this.page.currentPage,
        page_size: this.page.pageSize,
      }

      this.loading = true

      const { data } = await this.fetchMethod(queryParams)
      this.dataList = data?.rows ?? []
      this.page.total = data?.total ?? 0
      this.summaryData = data ?? {}

      this.loading = false
    },

    // 删除封装
    async delRow(rowKey) {
      if (!this.delMethod) return

      this.$confirm(this.$t('tables.deleteTips'), this.$t('tables.tips'), {
        confirmButtonText: this.$t('buttons.confirm'),
        cancelButtonText: this.$t('buttons.cancel'),
        type: 'warning',
      })
        .then(async () => {
          const resData = await this.delMethod(rowKey)
          if (resData.code === 0) {
            this.$message.success(this.$t('tables.successfullyDeleted'))
            this.getList()
          }
        })
        .catch(() => {})
    },
  },
}
