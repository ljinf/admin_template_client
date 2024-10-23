export function searchColumns() {
    return [
        {
            prop: 'username',
            placeholder: '请输入用户名称',
        },
        {
            prop: 'phone_number',
            placeholder: '请输入用户手机号',
        },
        {
            prop: 'status',
            type: 'select',
            dicData: [
                {label: '正常', value: 0},
                {label: '禁用', value: 1},
            ],
            placeholder: '请选择账号状态',
        },
    ]
}

export function tableColumns() {
    return [
        {
            label: '用户编号',
            prop: 'userId',
        },
        {
            label: '用户名称',
            prop: 'username',
        },
        {
            label: '用户昵称',
            prop: 'nickName',
        },
        {
            label: '手机号',
            prop: 'phoneNumber',
        },
        {
            label: '账号状态',
            prop: 'status',
            html: true,
            formatter: row =>
                `<span class="${row?.status === '0' ? 'text-success' : 'text-danger'}">${
                    row?.status === '0' ? '正常' : '禁用'
                }</span>`,
        },
        {
            width: 140,
            label: '创建时间',
            overHidden: true,
            prop: 'createTime',
            formatter: row => this.$formatTime(row?.createTime),
        },
    ]
}
