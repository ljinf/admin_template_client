export function editDialogForm() {
    return [
        {
            label: '角色名称',
            prop: 'roleName',
            rules: [
                {
                    required: true,
                    message: '请输入角色名称',
                },
            ],
        },
        {
            label: '权限字符',
            prop: 'roleKey',
            placeholder: "控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole(\'admin\')`)",
            rules: [
                {
                    required: true,
                    message: '请输入权限字符',
                },
            ],
        },
        {
            label: '角色顺序',
            prop: 'roleSort',
            type: 'number'
        },
        {
            type: 'select',
            label: '状态',
            prop: 'status',
            dicData: [
                {value: 1, label: '启用'},
                {value: 2, label: '禁用'},
            ],
            props: {
                label: 'label',
                value: 'value',
            },
        },
        {
            type: 'tree',
            multiple: true,
            label: '菜单权限',
            prop: 'menuIds',
            checkStrictly: true,
            dicData: this.menuOptions,
            props: {
                label: 'label',
                value: 'id',
                children: "children",
            },
            checked: (checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) => {
                this.selectedMenuIds = checkedKeys.checkedKeys;
            },
        },
    ]
}
