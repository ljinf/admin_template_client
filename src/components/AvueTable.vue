<template>
  <div
    ref="tableWrapRef"
    class="avue-table">
    <avue-crud
      ref="tableRef"
      :key="renderKey"
      :data="dataList"
      :page.sync="pageObj"
      :table-loading="loading"
      :row-class-name="() => 'table-row-class'"
      :cell-class-name="() => 'table-cell-class'"
      :header-cell-class-name="() => 'table-header-cell-class'"
      :option="{
        ...baseOptions,
        ...tableOptions,
        ...resetOptions,
        height: tableHeight,
        column: tableColumns,
      }"
      :summary-method="summaryMethod"
      @size-change="updatePage"
      @current-change="updatePage"
      @selection-change="handleSelectionChange">
      <!-- 自定义头部左侧按钮 -->
      <template v-slot:menuLeft>
        <template name="menuLeft">
          <!-- <span class="text-primary"> {{ $t('tables.total') }}: {{ pager.total }} </span> -->
        </template>
      </template>

      <!-- 自定义头部右侧按钮 -->
      <template v-slot:menuRight>
        <template name="menuRight"></template>
        <el-button
          v-if="baseOptions.refreshBtn"
          circle
          icon="el-icon-refresh"
          @click="$emit('on-refresh')">
        </el-button>

        <!-- 表格顶部右侧列隐藏和显示按钮 -->
        <el-popover
          v-if="baseOptions.columnBtn"
          width="210"
          placement="bottom"
          v-model="columnSetVisible">
          <el-button
            circle
            slot="reference"
            icon="el-icon-setting">
          </el-button>

          <div class="columnset">
            <div class="columnset-title">{{ $t('tables.columnDisplay') }}</div>
            <div class="columnset-content">
              <avue-tree
                ref="columnSetTreeRef"
                node-key="prop"
                :option="columnSetTreeOption"
                :data="tableColumns">
              </avue-tree>
            </div>
            <div style="text-align: center">
              <el-button
                size="mini"
                @click="columnSetVisible = false">
                {{ $t('buttons.cancel') }}
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="handleColumnSet">
                {{ $t('buttons.confirm') }}
              </el-button>
            </div>
          </div>
        </el-popover>
      </template>

      <!-- type是switch的slots -->
      <template
        v-for="{ prop, dicData } in switchSlots"
        v-slot:[prop]="{ row }">
        <el-switch
          v-if="dicData && dicData.length"
          v-model="row[prop]"
          :key="prop"
          :disabled="!$checkPerm('edit')"
          :active-text="dicData[0].label"
          :inactive-text="dicData[1].label"
          :active-value="dicData[0].value"
          :inactive-value="dicData[1].value"
          @change="$emit('on-switch', row)">
        </el-switch>
      </template>

      <!-- 列的slots -->
      <template
        v-for="(_, name) in columnSlots"
        v-slot:[name]="data">
        <slot
          :name="name"
          v-bind="data">
        </slot>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ResizeObserver from 'resize-observer-polyfill'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Object,
      default() {
        return {}
      },
    },
    dataList: {
      type: Array,
      default() {
        return []
      },
    },
    tableColumns: {
      type: Array,
      required: true,
    },
    tableOptions: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      renderKey: '',
      eleObserver: null,
      columnSetVisible: false,
      tableHeight: 500,
      pageObj: {
        single: false,
        total: 0, // 总页数
        pagerCount: 7, //超过多少条隐藏
        currentPage: 1, // 当前页数
        pageSize: 30, // 每页显示多少条
        pageSizes: [30, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true, // 背景颜色
      },
      columnCheckList: [],
      crudTableColumns: [],
      resetOptions: {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        viewBtn: false,
        columnBtn: false,
        refreshBtn: false,
      },
      columnSetTreeOption: {
        menu: false,
        filter: false,
        multiple: true,
        defaultExpandAll: true,
        highlightCurrent: false,
        props: {
          id: 'prop',
          label: 'label',
          value: 'prop',
          children: 'children',
        },
      },
    }
  },
  computed: {
    ...mapGetters('setting', ['language', 'device']),
    showHeader() {
      return (
        Object.keys(this.$scopedSlots).includes('menuLeft') ||
        Object.keys(this.$scopedSlots).includes('menuRight')
      )
    },
    baseOptions() {
      return {
        stripe: true,
        border: true,
        columnBtn: false,
        refreshBtn: false,
        indexWidth: 75,
        align: 'center',
        header: this.showHeader,
        indexLabel: this.$t('tables.number'),
        menu: Object.keys(this.$scopedSlots).includes('menu'),
      }
    },
    // 列的type为开关类型特殊处理一下
    switchSlots() {
      return this.tableColumns.filter(item => item.type === 'switch')
    },
    // 列的slot
    columnSlots() {
      const columnSlots = {}
      for (const key of Object.keys(this.$scopedSlots)) {
        if (!this.switchSlots.some(({ prop }) => prop === key)) {
          columnSlots[key] = this.$scopedSlots[key]
        }
      }
      return columnSlots
    },
  },
  watch: {
    language() {
      this.reRenderTable()
    },
    tableColumns() {
      this.reRenderTable()
    },
    tableHeight(newVal, oldVal) {
      if (oldVal && newVal !== oldVal) {
        this.reRenderTable()
      }
    },
    device(newVal) {
      if (newVal === 'mobile') {
        this.unObserveTableWrapResize()
      }
    },
    columnSetVisible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.columnSetTreeRef.setCheckedKeys(this.columnCheckList)
        })
      }
    },
    page: {
      handler(newVal) {
        Object.assign(this.pageObj, newVal)
      },
      deep: true,
      immediate: true,
    },
    'tableOptions.header'(newVal) {
      if (newVal) {
        this.tableHeight -= 45
      } else {
        this.tableHeight += 45
      }
    },
  },
  methods: {
    // 修改分页大小
    updatePage() {
      this.$emit('onPageChange', this.pageObj)
    },
    //多选变化回调
    handleSelectionChange(selection) {
      this.$emit('handleSelectionChange', selection)
    },
    // 点击确定列显示隐藏设置
    handleColumnSet() {
      const columnReset = columns => {
        columns.forEach(item => {
          if (item?.children?.length) {
            columnReset(item.children)
          } else {
            item.hide = !this.columnCheckList.includes(item.prop)
          }
        })
      }

      this.columnCheckList = this.$refs.columnSetTreeRef.getCheckedKeys()
      columnReset(this.tableColumns)
      this.reRenderTable()
      this.columnSetVisible = false
    },

    // 合计
    summaryMethod() {
      const sumList = this.tableColumns.map(() => '')
      sumList.splice(0, 1, '合计')
      this.tableOptions?.sumColumnList?.forEach(item => {
        const index = this.tableColumns.findIndex(it => it.prop === item.prop)
        if (index > -1) {
          sumList.splice(index, 1, item.count)
        }
      })
      return sumList
    },

    // 初始化表格列(兼容多级表头)
    initTableSet() {
      this.columnCheckList = []
      const pushColumnsSet = columns => {
        columns.forEach(item => {
          if (item?.children?.length) {
            pushColumnsSet(item.children)
          } else {
            this.columnCheckList.push(item.prop)
          }
        })
      }
      // 初始化表单列
      pushColumnsSet(this.tableColumns)
    },

    // 重新渲染表格
    reRenderTable() {
      this.renderKey = `crudTable-${Math.random()}`
    },

    // 暴露refs.tableRef上的可用属性和方法，这样父层的ref可以直接拿到
    exposeCrudRef() {
      const refMethod = Object.entries(this.$refs['tableRef'])
      for (const [key, value] of refMethod) {
        if (!(key.includes('$') || key.includes('_'))) {
          this[key] = value
        }
      }
    },

    // 监听父容器的变化
    observeTableWrapResize() {
      if (this.tableOptions?.height) return
      const element = this.$refs.tableWrapRef
      this.eleObserver = new ResizeObserver(entries => {
        entries.forEach(({ target }) => {
          const react = target.getBoundingClientRect()
          if (!react?.height > 80) return

          let targetHeight = react.height - (this.tableOptions.tableHeaderHeight || 55)

          if (this.tableOptions?.selection) {
            targetHeight -= 50
          }

          if (this.showHeader) {
            targetHeight -= 50
          }

          this.tableHeight = targetHeight
        })
      })
      this.eleObserver?.observe(element)
    },

    // 去除监听父容器
    unObserveTableWrapResize() {
      if (this.$refs?.tableWrapRef) this.eleObserver?.unobserve(this.$refs.tableWrapRef)
    },
  },
  mounted() {
    if (this.device !== 'mobile') {
      this.observeTableWrapResize()
    }
    this.initTableSet()
    this.exposeCrudRef()
  },
  destroyed() {
    this.unObserveTableWrapResize()
  },
  deactivated() {
    this.unObserveTableWrapResize()
  },
}
</script>

<style lang="scss" scoped>
.avue-table {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.columnset {
  .columnset-title {
    font-size: 14px;
    font-weight: bold;
  }
  .columnset-content {
    margin: 10px 0;
    max-height: 420px;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
