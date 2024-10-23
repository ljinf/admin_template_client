export function searchColumns() {
    return [
        {
            prop: 'role_name',
            placeholder: '请输入角色名称',
        },
        {
            prop: 'role_key',
            placeholder: '请输入权限字符',
        },
        {
            prop: 'status',
            type: 'select',
            dicData: [
                {label: '正常', value: 1},
                {label: '禁用', value: 2},
            ],
            placeholder: '请选择角色状态',
        },
    ]
}

export function tableColumns() {
    return [
        {
            label: '角色编号',
            prop: 'roleId',
        },
        {
            label: '角色名称',
            prop: 'roleName',
        },
        {
            label: '权限字符',
            prop: 'roleKey',
        },
        {
            label: '显示顺序',
            prop: 'roleSort',
        },
        {
            label: '账号状态',
            prop: 'status',
            html: true,
            formatter: row =>
              `<span class="${row?.status === 1 ? 'text-success' : 'text-danger'}">${
                row?.status === 1 ? '正常' : '禁用'
              }</span>`,
        }
    ]
}
