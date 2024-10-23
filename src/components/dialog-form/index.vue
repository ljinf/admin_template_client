<template>
  <component
    v-bind="dialog"
    append-to-body
    :is="dialogType"
    :visible.sync="visible"
    :beforeClose="beforeClose"
    :fullscreen="fullscreen"
    class="el-dialog__wrapper avue-dialog avue-crud__dialog"
    :class="[{ 'avue-dialog--fullscreen': fullscreen }]">
    <div
      slot="title"
      class="avue-crud__dialog__header">
      <span class="el-dialog__title">{{ dialog.title }}</span>
      <div class="avue-crud__dialog__menu">
        <i
          class="el-dialog__close"
          :class="fullscreen ? 'el-icon-news' : 'el-icon-full-screen'"
          @click="handleFullScreen">
        </i>
      </div>
    </div>

    <avue-form
      ref="form"
      v-model="data"
      :option="{ ...deepClone(myOption), ...{ menuBtn: false } }"
      :status.sync="disabled"
      :style="{ paddingRight: '30px' }"
      @submit="handleSubmit"
      @reset-change="close">
    </avue-form>

    <slot name="richText"></slot>

    <div
      class="avue-dialog__footer"
      v-if="vaildData(option.menuBtn, true)"
      :class="'avue-dialog__footer--' + menuPosition">
      <el-button
        @click="reset"
        v-if="vaildData(option.emptyBtn, true)"
        :disabled="disabled"
        :size="$AVUE.size">
        {{ $t(option.emptyText) }}
      </el-button>

      <el-button
        @click="submit"
        :size="$AVUE.size"
        :loading="disabled"
        v-if="vaildData(option.submitBtn, true)"
        type="primary">
        {{ $t(option.submitText) }}
      </el-button>
    </div>
  </component>
</template>

<script>
import { deepClone } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      deepClone,
      opt: {},
      callback: null,
      disabled: false,
      visible: false,
      fullscreen: false,
      dialog: {
        closeOnClickModal: false,
      },
      isDrawer: false,
      option: {
        submitText: 'buttons.submit',
        emptyText: 'buttons.cancel',
        submitIcon: 'el-icon-check',
        emptyIcon: 'el-icon-close',
        column: [],
      },
      data: {},
    }
  },
  computed: {
    ...mapGetters('setting', ['language']),
    dialogType() {
      return this.isDrawer ? 'elDrawer' : 'elDialog'
    },
    menuPosition() {
      return this.opt.menuPosition || 'right'
    },
    myOption() {
      const myOption = deepClone(this.option)
      myOption.column = myOption.column.map(item => this.formatFormItem(item))
      return myOption
    },
  },
  watch: {
    'data.country_id_list'(newVal) {
      if (newVal?.includes(-1) && newVal?.length > 1) {
        this.data.country_id_list = [-1]
      }
    },
  },
  methods: {
    submit() {
      this.$refs.form.submit()
    },
    reset() {
      this.$refs.form.resetForm()
    },
    beforeClose(done) {
      done()
      this.close()
    },
    show(opt) {
      this.opt = opt
      this.callback = opt.callback
      let dialog = deepClone(opt)
      ;['callback', 'option', 'data'].forEach(ele => {
        delete dialog[ele]
      })
      this.dialog = Object.assign(this.dialog, dialog)
      this.dialog.size = this.dialog.width
      this.isDrawer = this.dialog.type === 'drawer'
      this.option = Object.assign(this.option, opt.option)
      this.data = opt.data
      this.visible = true
    },
    close() {
      const callback = () => {
        this.visible = false
        this.$destroy()
        this.$el.remove()
      }
      if (typeof this.dialog.beforeClose === 'function') {
        this.dialog.beforeClose(callback)
      } else {
        callback()
      }
    },
    // 格式化表单翻译
    formatFormItem(item) {
      const chooseTypes = [
        'select',
        'upload',
        'cascader',
        'tree',
        'date',
        'datetime',
        'daterange',
        'datetimerange',
      ]
      //  处理英文的placeholder 默认翻译
      let prefix = chooseTypes.includes(item.type) ? '请选择' : '请输入'
      if (this.language === 'en') {
        prefix = chooseTypes.includes(item.type) ? 'Please choose' : 'Please input'
      }
      const label = item?.label?.toLowerCase()
      if (this.language === 'en') {
        item.placeholder = item.placeholder ? item.placeholder : `${prefix} ${label}`
      } else {
        item.placeholder = item.placeholder ? item.placeholder : `${prefix}${label}`
      }

      // 处理英文的valid message 默认翻译
      if (item?.rules?.length) {
        item.rules.forEach(item => {
          if (item?.required && !item.validator) {
            if (this.language === 'en') {
              item.message = `${prefix} ${label}`
            } else {
              item.message = `${prefix}${label}`
            }
          }
        })
      }
      return item
    },
    handleSubmit(data, done) {
      const doneClose = () => {
        done()
        this.close()
      }
      this.callback && this.callback({ data: data, close: doneClose })
    },
    handleFullScreen() {
      this.fullscreen = !this.fullscreen
    },
  },
}
</script>
