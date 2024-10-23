<template>
  <page-container scroll-y>
    <search-form
      v-model="searchForm"
      :searchColumns="searchColumns"
      :searchOptions="{ menuSpan: 4 }"
      @on-search="handleSearch">
    </search-form>
    <avue-crud ref="crud"
               :option="tableColumns"
               :data="menuList">
      <template slot-scope="scope" slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   v-hasPermi="['system:menu:add']"
                   size="small" @click="editMenu('add')">新增
        </el-button>
      </template>
      <template slot-scope="{row,index}" slot="menu">
        <el-button type="text"
                   icon="el-icon-edit"
                   v-hasPermi="['system:menu:edit']"
                   size="small" @click="editMenu('edit',row)">编辑
        </el-button>
        <el-button type="text"
                   icon="el-icon-delete"
                   v-hasPermi="['system:menu:remove']"
                   size="small" @click="delRow(row)">删除
        </el-button>
      </template>
    </avue-crud>
  </page-container>
</template>

<script>
import tableMixins from "@/mixins/table";
import { deepClone, handleTree } from "@/utils";
import { searchColumns, tableColumns } from "./config/table-config";
import { addDialogForm, MEditDialogForm, CEditDialogForm, FEditDialogForm } from "./config/dialog-config";
import { listMenu, getMenu, delMenu, updateMenu, addMenu } from "@/api/system/menu";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  mixins: [tableMixins],
  data() {
    return {
      dialogForm: {
        menu_type: "M",
        status: "0",
        visible: "0",
        is_frame: "1"
      },
      menuList: [],
      searchForm: {}
    };
  },
  computed: {
    ...mapGetters(["menuOption"]),
    searchColumns,
    addDialogForm,
    tableColumns,
    MEditDialogForm,
    CEditDialogForm,
    FEditDialogForm
  },
  watch: {
    dataList(v) {
      this.getBuildMenuTree(v);
    }
  },
  methods: {
    fetchMethod: listMenu,

    getBuildMenuTree(v) {
      this.menuList = handleTree(v, "menu_id");
    },

    // 查询参数格式化
    formatSearch() {
      const searchParams = deepClone(this.searchForm);
      return searchParams;
    },

    //新增，编辑
    editMenu(type, row) {
      let formData = {};
      formData = deepClone(this.dialogForm);
      if (type === "edit") {
        getMenu(row.menu_id).then(response => {
          formData = response.data;
          this.showDialog("edit", formData);
        });
        this.$refs.crud.refreshTable();
        return;
      }

      this.showDialog("add", formData);
    },

    showDialog(type, formData) {
      let dialog = this.addDialogForm;
      if (type === "edit") {
        if (formData.menu_type === "F") {
          dialog = this.FEditDialogForm;
        } else if (formData.menu_type === "M") {
          dialog = this.MEditDialogForm;
        } else if (formData.menu_type === "C") {
          dialog = this.CEditDialogForm;
        }
      }
      this.$dialogForm.show({
        title: `${type === "add" ? "新增" : "编辑"}菜单`,
        width: "50%",
        data: formData,
        option: {
          span: 24,
          labelWidth: 120,
          column: dialog
        },
        callback: async ({ data, close }) => {
          let resData = {};
          if (data.menu_id !== undefined) {
            resData = await updateMenu(data);
          } else {
            if (data.menu_type !== "F") {
              data.icon = "example";//默认图标
            }
            resData = await addMenu(data);
          }
          if (resData.code === 200) {
            this.$message.success(`${type === "edit" ? "编辑" : "新增"}菜单成功`);
          }
          close();
          this.getList();
        }
      });
    },
    // 删除封装
    async delRow(rowKey) {
      this.$confirm(this.$t("tables.deleteTips"), this.$t("tables.tips"), {
        confirmButtonText: this.$t("buttons.confirm"),
        cancelButtonText: this.$t("buttons.cancel"),
        type: "warning"
      })
        .then(async () => {
          const resData = await delMenu(rowKey.menu_id);
          if (resData.code === 200) {
            this.$message.success(this.$t("tables.successfullyDeleted"));
            this.getList();
          }
        }).catch((err) => {
      });
    }
  },
  mounted() {
    store.dispatch("GetMenuOptions");//菜单下拉树
    this.handleSearch();
  }
};
</script>

<style lang="scss" scoped></style>
