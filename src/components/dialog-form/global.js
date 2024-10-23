import Vue from 'vue'
import store from '@/store'
import DialogComponent from './index.vue'
import i18n from '@/lang'

const Plugin = function () {
  this.$root = {}
}

Plugin.prototype.initMounted = function () {
  this.$root = (() => {
    let DialogConstructor = Vue.extend(DialogComponent)
    let instance = new DialogConstructor({ store, i18n })
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.dom = instance.vm.$el
    return instance.vm
  })()
}

Plugin.prototype.show = function (opt) {
  this.initMounted()
  this.$root.show(opt)
}
export default new Plugin()
