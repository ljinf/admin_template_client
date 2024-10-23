import axios from 'axios'
import SearchForm from './SearchForm.vue'
import AvueTable from './AvueTable.vue'
import UploadImage from './UploadImage.vue'
import PageContainer from './PageContainer.vue'
import UploadFile from './upload-file/index.vue'
import DialogForm from './dialog-form/index.vue'
import $dialogForm from './dialog-form/global'
import AvueUeditor from 'avue-plugin-ueditor/packages/ueditor'

const globalComponents = {
  install(Vue, opt = {}) {
    Vue.component('AvueTable', AvueTable)
    Vue.component('SearchForm', SearchForm)
    Vue.component('DialogForm', DialogForm)
    Vue.component('UploadFile', UploadFile)
    Vue.component('UploadImage', UploadImage)
    Vue.component('PageContainer', PageContainer)

    // 富文本编辑器
    Vue.prototype.$axios = axios || window.axios
    Vue.use(AvueUeditor)

    // 注册到全局弹框组件
    Vue.prototype.$dialogForm = $dialogForm
  },
}

export default globalComponents
