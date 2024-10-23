<template>
  <page-container>
    <search-form
      v-model="searchForm"
      :searchColumns="searchColumns"
      :searchOptions="{ menuSpan: 4 }"
      @on-search="handleSearch">
    </search-form>

    <div style="margin-bottom: 5px">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        v-hasPermi="['system:role:add']"
        @click="handleEdit('add')">新增
      </el-button>
    </div>
    <avue-table
      :dataList="dataList"
      :loading="loading"
      :page="page"
      :tableColumns="tableColumns"
      :tableOptions="{ menuWidth: 200 }"
      @onPageChange="onPageChange">
      <template v-slot:menu="{ row }">
        <el-button
          type="text"
          icon="el-icon-edit"
          v-hasPermi="['system:role:edit']"
          @click="handleEdit('edit', row)">编辑
        </el-button>
        <el-button
          type="text"
          icon="el-icon-delete"
          v-hasPermi="['system:role:remove']"
          @click="delRow(row)">删除
        </el-button>
      </template>
    </avue-table>

  </page-container>
</template>

<script>
import tableMixins from '@/mixins/table'
import {deepClone} from '@/utils'
import {searchColumns, tableColumns} from './config/table-config'
import {editDialogForm} from './config/dialog-config'
import {listRole, delRole, addRole, updateRole, getRole, roleProductList} from "@/api/system/role";
import {treeselect as menuTreeselect, roleMenuTreeselect} from "@/api/system/menu";
import {mapGetters} from "vuex";


export default {
  mixins: [tableMixins],
  data() {
    return {
      dialogForm: {},
      searchForm: {},
      // 菜单下拉
      menuOptions: [],
      selectedMenuIds: [],
      selectedProductIds: [],
    }
  },
  computed: {
    searchColumns,
    editDialogForm,
    tableColumns,
  },
  methods: {
    fetchMethod: listRole,

    /** 查询菜单树结构 */
    getMenuTreeselect() {
      menuTreeselect().then(response => {
        this.menuOptions = response.data;
      });
    },

    // 查询参数格式化
    formatSearch() {
      return deepClone(this.searchForm)
    },

    async handleEdit(type, row) {
      this.selectedMenuIds = [];
      let formData = {}
      formData = deepClone(this.dialogForm)
      if (type === 'edit') {
        formData = deepClone(row)
        /** 根据角色ID查询菜单树结构 */
        let response = await roleMenuTreeselect(row.roleId);
        this.menuOptions = response.data.menus;
        formData.menuIds = response.data.checkedKeys;
        this.selectedMenuIds = response.data.checkedKeys;
      }
      this.showDialog(type, formData)
    },

    showDialog(type, formData) {
      let tips = `${type === 'edit' ? '编辑' : '新增'}角色`
      this.$dialogForm.show({
        title: tips,
        width: '50%',
        data: formData,
        option: {
          span: 24,
          labelWidth: 120,
          column: this.editDialogForm,
        },
        callback: async ({data, close}) => {
          data.menuIds = this.selectedMenuIds;
          data.productIds = this.selectedProductIds;
          let res
          if (type === 'add') {
            res = await addRole(data)
          } else if (type === 'edit') {
            res = await updateRole(data)
          }
          if (res.code !== 200) {
            this.$message.success(`操作失败`)
          } else {
            this.$message.success(`操作成功`)
          }
          close()
          this.getList()
        },
      })
    },
    // 删除封装
    async delRow(rows) {
      this.$confirm(this.$t('tables.deleteTips'), this.$t('tables.tips'), {
        confirmButtonText: this.$t('buttons.confirm'),
        cancelButtonText: this.$t('buttons.cancel'),
        type: 'warning',
      })
        .then(async () => {
          const resData = await delRole(rows.roleId)
          if (resData.code === 200) {
            this.$message.success(this.$t('tables.successfullyDeleted'))
            this.getList()
          }
        }).catch((err) => {
      })
    },
  },
  mounted() {
    this.handleSearch()
  },
  created() {
    this.getMenuTreeselect();
  }
}
</script>

<style lang="scss" scoped></style>
