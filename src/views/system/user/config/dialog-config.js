export function addDialogForm() {
    return [
        {
            label: '用户名称',
            prop: 'username',
            rules: [
                {
                    required: true,
                    message: '请输入用户名称',
                },
            ],
        },
        {
            label: '用户昵称',
            prop: 'nickName',
            rules: [
                {
                    required: true,
                    message: '请输入用户昵称',
                },
            ],
        },
        {
            label: '用户密码',
            prop: 'password',
            type: 'password',
            showPassword: true,
            rules: [
                {
                    required: true,
                    message: '请输入密码',
                },
            ],
        },
        {
            label: '手机号',
            prop: 'phoneNumber',
        },
        {
            label: '邮箱',
            prop: 'email',
        },
        {
            type: 'select',
            label: '性别',
            prop: 'sex',
            dicData: [
                //0=男,1=女,2=未知
                {value: '0', label: '男'},
                {value: '1', label: '女'},
                {value: '2', label: '未知'},
            ],
            props: {
                label: 'label',
                value: 'value',
            },
        },
        {
            type: 'select',
            label: '用户角色',
            prop: 'roleIds',
            multiple: true,
            dicData: this.roleOptions,
            props: {
                label: 'roleName',
                value: 'roleId',
            },
        },
        {
            type: 'select',
            label: '状态',
            prop: 'status',
            dicData: [
                {value: '0', label: '启用'},
                {value: '1', label: '禁用'},
            ],
            props: {
                label: 'label',
                value: 'value',
            },
        },
    ]
}


export function editDialogForm() {
    return [
        {
            label: '用户昵称',
            prop: 'nickName',
        },
        {
            label: '手机号',
            prop: 'phoneNumber',
        },
        {
            label: '邮箱',
            prop: 'email',
        },
        {
            type: 'select',
            label: '性别',
            prop: 'sex',
            dicData: [
                //0=男,1=女,2=未知
                {value: '0', label: '男'},
                {value: '1', label: '女'},
                {value: '2', label: '未知'},
            ],
            props: {
                label: 'label',
                value: 'value',
            },
        },
        {
            type: 'select',
            label: '用户角色',
            prop: 'roleIds',
            multiple: true,
            dicData: this.roleOptions,
            props: {
                label: 'roleName',
                value: 'roleId',
            },
        },
        {
            type: 'select',
            label: '状态',
            prop: 'status',
            dicData: [
                {value: '0', label: '启用'},
                {value: '1', label: '禁用'},
            ],
            props: {
                label: 'label',
                value: 'value',
            },
        },
    ]
}
