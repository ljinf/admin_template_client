import store from '@/store'
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {setToken, getToken} from '@/utils'
import {generateTitle} from '@/lang/utils'
import {isRelogin} from "@/utils/request";
import {Message} from "element-ui";

NProgress.configure({showSpinner: false})

export default async function bootStrapRouter() {
    const whiteList = ['/login', '/register']
    router.beforeEach((to, from, next) => {
        NProgress.start()
        if (getToken()) {
            // to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
            document.title = generateTitle(to.meta.title) // 设置标题
            /* has token*/
            if (to.path === '/login') {
                next({path: '/'})
                NProgress.done()
            } else if (whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                if (store.getters.roles.length === 0) {
                    isRelogin.show = true
                    // 判断当前用户是否已拉取完user_info信息
                    store.dispatch('GetInfo').then(() => {
                        isRelogin.show = false
                        store.dispatch('GenerateRoutes').then(accessRoutes => {
                            if (accessRoutes !== undefined && accessRoutes.length > 0) {
                                console.log(accessRoutes);
                                // 根据roles权限生成可访问的路由表
                                router.addRoutes(accessRoutes) // 动态添加可访问路由表
                                next({...to, replace: true}) // hack方法 确保addRoutes已完成
                            } else {
                                Message.error("无权限访问！")
                                store.dispatch('LogOut').then(() => {
                                    next({path: '/'})
                                })
                            }
                        })
                    }).catch(err => {
                        console.log("logout");
                        store.dispatch('LogOut').then(() => {
                            Message.error(err)
                            next({path: '/'})
                        })
                    })
                } else {
                    next()
                }
            }
        } else {
            // 没有token
            console.log("没有token");
            if (whiteList.indexOf(to.path) !== -1) {
                // 在免登录白名单，直接进入
                next()
            } else {
                next(`/login?redirect=${encodeURIComponent(to.fullPath)}`) // 否则全部重定向到登录页
                NProgress.done()
            }
        }
    })

    // 路由后置守卫
    router.afterEach(() => {
        NProgress.done()
    })
}
