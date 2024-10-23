import {listMenu} from "@/api/system/menu";
import {handleTree} from "@/utils";

const menu = {
    state: {
        // 菜单树选项
        menuOptions: [],
    },

    mutations: {
        SET_MENU: (state, list) => {
            state.menuOptions = list
        },
    },

    actions: {
        // 获取菜单树选项
        GetMenuOptions({commit, state}) {
            return new Promise((resolve, reject) => {
                listMenu().then(response => {
                    let menuOptions = [];
                    const menu = {menu_id: 0, menu_name: '主类目', children: []};
                    menu.children = handleTree(response.data.rows, "menu_id");
                    menuOptions.push(menu);
                    commit('SET_MENU', menuOptions)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default menu
