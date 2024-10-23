import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { APP_SETTING } from '@/config/setting'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// webpack的方式导入modules
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    createPersistedState({
      key: APP_SETTING.storeKey,
      fetchBeforeUse: true,
      reducer(val) {
        return {
          setting: val.setting, // 持久化一些设置
          app: val.app,
        }
      },
    }),
  ],
})

export default store
