// 新增
export function addDialogForm() {
  return [
    {
      type: "tree",
      label: "上级菜单",
      prop: "parent_id",
      dicData: this.menuOption,
      props: {
        label: "menu_name",
        value: "menu_id"
      }
    },
    {
      label: "菜单类型",
      prop: "menu_type",
      type: "select",
      dicData: [
        { value: "M", label: "目录" },
        { value: "C", label: "菜单" },
        { value: "F", label: "按钮" }
      ],
      props: {
        label: "label",
        value: "value"
      },
      control: (val, form) => {
        if (val === "M") {
          return {
            perms: {
              display: false
            },
            component: {
              display: false
            },
            query: {
              display: false
            },
            is_frame: {
              display: true
            },
            path: {
              display: true
            },
            visible: {
              display: true
            },
            order_num: {
              display: true
            }
          };
        } else if (val === "C") {
          return {
            perms: {
              display: true
            },
            component: {
              display: true
            },
            query: {
              display: true
            },
            is_frame: {
              display: true
            },
            path: {
              display: true
            },
            visible: {
              display: true
            },
            order_num: {
              display: true
            }
          };
        } else {
          // F
          return {
            perms: {
              display: true
            },
            component: {
              display: false
            },
            query: {
              display: false
            },
            is_frame: {
              display: false
            },
            path: {
              display: false
            },
            visible: {
              display: false
            },
            order_num: {
              display: false
            }
          };
        }
      },
      rules: [
        {
          required: true,
          message: "请选择菜单类型"
        }
      ]
    },
    {
      label: "菜单名称",
      prop: "menu_name",
      rules: [
        {
          required: true,
          message: "请选择菜单名称"
        }
      ]
    },
    {
      placeholder: "访问的组件路径，如：`system/user/index`，默认在`views`目录下",
      label: "组件路径",
      prop: "component",
      display: false,
      control: (val, form) => {
        return {
          component: {
            display: form.menu_type === "C"
          }
        };
      }
    },
    {
      placeholder: "访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头",
      label: "路由地址",
      prop: "path",
      display: true,
      control: (val, form) => {
        return {
          path: {
            display: form.menu_type !== "F"
          }
        };
      }
    },
    {
      label: "路由参数",
      prop: "query",
      display: false,
      control: (val, form) => {
        return {
          query: {
            display: form.menu_type === "C"
          }
        };
      }
    },
    {
      placeholder: "控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)",
      label: "权限字符",
      prop: "perms",
      display: false,
      control: (val, form) => {
        return {
          perms: {
            display: form.menu_type !== "M"
          }
        };
      }
    },
    {
      type: "select",
      label: "是否外链",
      prop: "is_frame",
      placeholder: "选择是外链则路由地址需要以`http(s)://`开头",
      display: true,
      control: (val, form) => {
        return {
          is_frame: {
            display: form.menu_type !== "F"
          }
        };
      },
      dicData: [
        { value: "0", label: "是" },
        { value: "1", label: "否" }
      ],
      props: {
        label: "label",
        value: "value"
      }
    },
    {
      type: "number",
      label: "显示排序",
      display: true,
      prop: "order_num",
      control: (val, form) => {
        return {
          order_num: {
            display: form.menu_type !== "F"
          }
        };
      }
    },
    {
      type: "select",
      label: "显示状态",
      prop: "visible",
      placeholder: "选择隐藏则路由将不会出现在侧边栏，但仍然可以访问",
      display: true,
      dicData: [
        { value: "0", label: "显示" },
        { value: "1", label: "隐藏" }
      ],
      props: {
        label: "label",
        value: "value"
      },
      control: (val, form) => {
        return {
          visible: {
            display: form.menu_type !== "F"
          }
        };
      }
    },
    {
      type: "select",
      label: "菜单状态",
      prop: "status",
      placeholder: "选择停用则路由将不会出现在侧边栏，也不能被访问",
      dicData: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" }
      ],
      props: {
        label: "label",
        value: "value"
      }
    }
  ];
}


//菜单类型（M目录 C菜单 F按钮）

export function MEditDialogForm() {
  return [
    {
      type: "tree",
      label: "上级菜单",
      prop: "parent_id",
      dicData: this.menuOption,
      props: {
        label: "menu_name",
        value: "menu_id"
      }
    },
    {
      label: "菜单类型",
      prop: "menu_type",
      type: "select",
      dicData: [
        { value: "M", label: "目录" },
        { value: "C", label: "菜单" },
        { value: "F", label: "按钮" }
      ],
      props: {
        label: "label",
        value: "value"
      },
      disabled: true
    },
    {
      label: "菜单名称",
      prop: "menu_name",
      rules: [
        {
          required: true,
          message: "请选择菜单名称"
        }
      ]
    },
    {
      placeholder: "访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头",
      label: "路由地址",
      prop: "path"
    },
    {
      type: "select",
      label: "是否外链",
      prop: "is_frame",
      placeholder: "选择是外链则路由地址需要以`http(s)://`开头",
      dicData: [
        { value: "0", label: "是" },
        { value: "1", label: "否" }
      ],
      props: {
        label: "label",
        value: "value"
      }
    },
    {
      type: "number",
      label: "显示排序",
      prop: "order_num"
    },
    {
      type: "select",
      label: "显示状态",
      prop: "visible",
      placeholder: "选择隐藏则路由将不会出现在侧边栏，但仍然可以访问",
      display: true,
      dicData: [
        { value: "0", label: "显示" },
        { value: "1", label: "隐藏" }
      ],
      props: {
        label: "label",
        value: "value"
      }
    },
    {
      type: "select",
      label: "菜单状态",
      prop: "status",
      placeholder: "选择停用则路由将不会出现在侧边栏，也不能被访问",
      dicData: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" }
      ],
      props: {
        label: "label",
        value: "value"
      }
    }
  ];
}

export function CEditDialogForm() {
  return [
    {
      type: "tree",
      label: "上级菜单",
      prop: "parent_id",
      dicData: this.menuOption,
      props: {
        label: "menu_name",
        value: "menu_id"
      }
    },
    {
      label: "菜单类型",
      prop: "menu_type",
      type: "select",
      dicData: [
        { value: "M", label: "目录" },
        { value: "C", label: "菜单" },
        { value: "F", label: "按钮" }
      ],
      props: {
        label: "label",
        value: "value"
      },
      disabled: true,
      rules: [
        {
          required: true,
          message: "请选择菜单类型"
        }
      ]
    },
    {
      label: "菜单名称",
      prop: "menu_name",
      rules: [
        {
          required: true,
          message: "请选择菜单名称"
        }
      ]
    },
    {
      placeholder: "访问的组件路径，如：`system/user/index`，默认在`views`目录下",
      label: "组件路径",
      prop: "component"
    },
    {
      placeholder: "访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头",
      label: "路由地址",
      prop: "path"
    },
    {
      label: "路由参数",
      prop: "query"
    },
    {
      placeholder: "控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)",
      label: "权限字符",
      prop: "perms"
    },
    {
      type: "select",
      label: "是否外链",
      prop: "is_frame",
      placeholder: "选择是外链则路由地址需要以`http(s)://`开头",
      dicData: [
        { value: "0", label: "是" },
        { value: "1", label: "否" }
      ],
      props: {
        label: "label",
        value: "value"
      }
    },
    {
      type: "number",
      label: "显示排序",
      display: true,
      prop: "order_num"
    },
    {
      type: "select",
      label: "显示状态",
      prop: "visible",
      placeholder: "选择隐藏则路由将不会出现在侧边栏，但仍然可以访问",
      display: true,
      dicData: [
        { value: "0", label: "显示" },
        { value: "1", label: "隐藏" }
      ],
      props: {
        label: "label",
        value: "value"
      }
    },
    {
      type: "select",
      label: "菜单状态",
      prop: "status",
      placeholder: "选择停用则路由将不会出现在侧边栏，也不能被访问",
      dicData: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" }
      ],
      props: {
        label: "label",
        value: "value"
      }
    }
  ];
}

export function FEditDialogForm() {
  return [
    {
      type: "tree",
      label: "上级菜单",
      prop: "parent_id",
      dicData: this.menuOption,
      props: {
        label: "menu_name",
        value: "menu_id"
      }
    },
    {
      label: "菜单类型",
      prop: "menu_type",
      type: "select",
      dicData: [
        { value: "M", label: "目录" },
        { value: "C", label: "菜单" },
        { value: "F", label: "按钮" }
      ],
      props: {
        label: "label",
        value: "value"
      },
      rules: [
        {
          required: true,
          message: "请选择菜单类型"
        }
      ],
      disabled: true
    },
    {
      label: "菜单名称",
      prop: "menu_name",
      rules: [
        {
          required: true,
          message: "请选择菜单名称"
        }
      ]
    },
    {
      placeholder: "控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)",
      label: "权限字符",
      prop: "perms",
      display: false,
      control: (val, form) => {
        return {
          perms: {
            display: form.menu_type !== "M"
          }
        };
      }
    },
    {
      type: "select",
      label: "菜单状态",
      prop: "status",
      placeholder: "选择停用则路由将不会出现在侧边栏，也不能被访问",
      dicData: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" }
      ],
      props: {
        label: "label",
        value: "value"
      }
    }
  ];
}