/**
 * Created by Jorken on 23/05/21.
 */
export * from './auth'
export * from './general'
export * from './tools'
export * from './validate'
import dayjs from 'dayjs'
import request from './request'
import * as tools from './tools'
import BigNumber from 'bignumber.js'

const globalUitls = {
  install(Vue) {
    Vue.prototype.$dayjs = dayjs
    Vue.prototype.$request = request
    Vue.prototype.$endStamp = tools.endStamp
    Vue.prototype.$startStamp = tools.startStamp
    Vue.prototype.$formatFlowSize = tools.formatFlowSize
    Vue.prototype.$resolveUrl = tools.resolveUrl
    Vue.prototype.$formatTime = tools.formatUnixTime
    Vue.prototype.$BigNumber = BigNumber
  },
}

export default globalUitls
