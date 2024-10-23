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
          v-hasPermi="['system:user:add']"
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
            v-hasPermi="['system:user:edit']"
            @click="handleEdit('edit', row)">编辑
        </el-button>
        <el-button
            type="text"
            icon="el-icon-delete"
            v-hasPermi="['system:user:remove']"
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
import {editDialogForm, addDialogForm} from './config/dialog-config'
import {delUser, listUser, updateUser, addUser, getUser} from "@/api/system/user";

export default {
  mixins: [tableMixins],
  data() {
    return {
      dialogForm: {
        password: "123456",
        status: '0',
      },
      roleOptions: [],
      searchForm: {},
    }
  },
  computed: {
    searchColumns,
    editDialogForm,
    addDialogForm,
    tableColumns,
  },
  methods: {
    fetchMethod: listUser,

    // 查询参数格式化
    formatSearch() {
      return deepClone(this.searchForm)
    },

    handleEdit(type, row) {
      getUser(row ? row.userId : '0').then(response => {
        this.roleOptions = response.data.roles;
        let formData = {}
        formData = deepClone(this.dialogForm)
        if (type === 'edit') {
          formData = deepClone(row)
          formData.roleIds = response.data.roleIds
        }
        this.$dialogForm.show({
          title: `${type === 'edit' ? '编辑' : '新增'}信息`,
          width: '50%',
          data: formData,
          option: {
            span: 24,
            labelWidth: 120,
            column: type === 'edit' ? this.editDialogForm : this.addDialogForm,
          },
          callback: async ({data, close}) => {
            let response
            if (data.userId !== undefined) {
              response = await updateUser(data);
            } else {
              response = await addUser(data);
            }
            if (response.code === 200) {
              this.$message.success(`${type === 'edit' ? '编辑' : '新增'}成功`)
            }
            close()
            this.getList()
          },
        })
      });

    },
    // 删除封装
    async delRow(rowKey) {
      this.$confirm(this.$t('tables.deleteTips'), this.$t('tables.tips'), {
        confirmButtonText: this.$t('buttons.confirm'),
        cancelButtonText: this.$t('buttons.cancel'),
        type: 'warning',
      })
          .then(async () => {
            const resData = await delUser(rowKey.userId)
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
}
</script>

<style lang="scss" scoped></style>
