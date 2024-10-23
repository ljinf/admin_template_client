import Vue from 'vue'
import App from './App'
import i18n from './lang'
import store from './store'
import router from './router'
import Element from 'element-ui'
import Avue from '@smallwei/avue'
import globalUtils from './utils'
import globalMixins from './mixins/common'
import globalComponents from './components'
import directive from './directive'// directive
import plugins from './plugins' // plugins
import bootStrapRouter from './router/setup'
import '@/assets/icon'
import '@smallwei/avue/lib/index.css'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'

// 只有开发环境开启Vue提示
Vue.config.productionTip = process.env.NODE_ENV === 'development'

// 全局引入Avue
Vue.use(Avue, {
    size: 'mini',
    i18n: (key, value) => i18n.t(key, value),
})

// 全局引入Element-ui
Vue.use(Element, {
    size: 'mini',
    i18n: (key, value) => i18n.t(key, value),
})

// 注册全局mixin
Vue.use(globalMixins)

// 注册全局工具
Vue.use(globalUtils)

// 注册全局组件
Vue.use(globalComponents)

Vue.use(directive)

Vue.use(plugins)

// 启动App
bootStrapApp()

async function bootStrapApp() {
    await bootStrapRouter() // 挂载路由
    const app = new Vue({
        el: '#app',
        router,
        store,
        i18n,
        render: h => h(App),
    })
    window.eventBus = app // 全局化eventBus
}
