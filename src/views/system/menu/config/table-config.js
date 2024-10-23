export function searchColumns() {
    return [
        {
            prop: 'menu_name',
            placeholder: '请输入菜单名称',
        },
        {
            prop: 'status',
            type: 'select',
            dicData: [
                {label: '正常', value: 0},
                {label: '禁用', value: 1},
            ],
            filterable: true,
            placeholder: '请选择菜单状态',
        },
    ]
}

export function tableColumns() {
    return {
        //关闭自带按钮，便于自定义
        addBtn: false,
        editBtn: false,
        delBtn: false,

        refreshBtn: false,
        // columnBtn:false,
        // gridBtn: false,

        rowKey: 'menu_id',
        column: [
            {
                label: '菜单名称',
                prop: 'menu_name',
            },
            {
                label: '图标',
                prop: 'icon',
            },
            {
                // width: 200,
                // align: 'left',
                label: '排序',
                prop: 'menu_order',
            },
            {
                label: '权限标识',
                prop: 'perms',
            },
            {
                label: '组件路径',
                prop: 'component',
            },
            {
                label: '菜单状态',
                prop: 'status',
                html: true,
                formatter: row =>
                    `<span class="${row?.status === "0" ? 'text-success' : 'text-danger'}">${
                        row?.status === "0" ? '正常' : '禁用'
                    }</span>`,
            },
            {
                label: '显示状态',
                prop: 'visible',
                html: true,
                formatter: row =>
                    `<span class="${row?.visible === "0" ? 'text-success' : 'text-danger'}">${
                        row?.visible === "0" ? '正常' : '关闭'
                    }</span>`,
            },
            {
                width: 140,
                label: '创建时间',
                overHidden: true,
                prop: 'register_time',
                formatter: row => this.$formatTime(row?.register_time),
            },
        ]
    }
}
