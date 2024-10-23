<template>
  <div class="upload-file">
    <div
        class="upload-btn"
        v-if="!readonly && fileList.length === 0">
      <el-button
          icon="el-icon-upload"
          @click="handleUpload">
        <span>{{ uploadText }}</span>
      </el-button>
      <span class="tips">请上传小于{{ maxSize }}</span>
      <span
          class="tips"
          v-if="fileTypes.length">
        且类型为{{ fileTypes.join('、') }}
      </span>
      <span class="tips">的文件</span>
    </div>
    <div
        class="file-list"
        :style="{ width: width }">
      <template v-for="(item, index) in fileList">
        <file-item
            v-if="index === 0 || multiple"
            :key="index"
            :readonly="readonly"
            :multiple="multiple"
            :fileItem="item"
            :fileIndex="index"
            @on-delete="handleDelete"
            @on-edit="handleUpload">
          <el-progress
              style="margin-top: 5px"
              slot="progress"
              :stroke-width="2"
              :percentage="item.progress"></el-progress>
        </file-item>
      </template>
    </div>

    <input
        ref="uploadRef"
        hidden
        type="file"
        :multiple="multiple"
        @change="onUploadChange($event)"/>
  </div>
</template>

<script>
import FileItem from './FileItem.vue'
import {uploadFile} from '@/api/common'

export default {
  components: {
    FileItem,
  },
  props: {
    width: {
      type: String,
      default: '100%',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    uploadText: {
      type: String,
      default: '上传文件',
    },
    maxSize: {
      type: String,
      default: '5M',
    },
    fileTypes: {
      type: Array,
      default() {
        return ['txt']
      },
    },
    value: {
      type: Array,
      default() {
        return []
      },
    },
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    params: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      isProgress: false,
      timer: null,
      fileList: [],
      progress: 0,
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.fileList = newVal
      },
      deep: true,
    },
    fileList: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true,
    },
  },
  mounted() {
    this.fileList = this.value
  },
  methods: {
    // 点击上传
    handleUpload() {
      this.$refs.uploadRef.click()
    },

    // 点击删除
    handleDelete(index) {
      this.fileList.splice(index, 1)
    },

    // 根据单位生成大小
    formatBityeByUnit(size, unit) {
      if (!size) return 0
      if (unit.toUpperCase() === 'K') {
        return size * 1024
      } else if (unit.toUpperCase() === 'M') {
        return size * 1048576
      }
    },

    uploadCallback(progress) {
      const lastIndex = this.fileList.length - 1
      const fileItem = this.fileList[lastIndex]
      this.fileList.splice(lastIndex, 1, {
        ...fileItem,
        progress,
      })
    },

    // 监听文件并上传
    async onUploadChange(e) {
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        const item = files[i]
        const fileType = item.name?.split('.')?.slice(-1)?.toString()
        const sizeUnit = this.maxSize?.slice(-1)
        const sizeNum = parseInt(this.maxSize?.slice(0, -1))
        const generateSize = this.formatBityeByUnit(sizeNum, sizeUnit)

        if (this.fileTypes?.length && !this.fileTypes.includes(fileType)) {
          return this.$message.warning(`只能上传类型${this.fileTypes.toString()}的文件`)
        }
        if (this.maxSize && item.size > generateSize) {
          return this.$message.warning(`文件大小不能超过${this.maxSize}`)
        }

        if (this.multiple) {
          this.fileList.push({
            name: item.name,
            progress: 0,
            url: '',
          })
        } else {
          this.fileList = [
            {
              size: item.size,
              name: item.name,
              progress: 0,
              url: '',
            },
          ]
        }

        const resData = await uploadFile(item, this.data, this.params, (progressEvent) => {
          const fileItem = this.fileList[i]
          this.fileList.splice(i, 1, {
            ...fileItem,
            progress: Math.round((progressEvent.loaded * 100) / progressEvent.total),
          })
        })

        if (resData) {

          if (resData.code === 0) {
            const fileItem = this.fileList[i]
            this.fileList.splice(i, 1, {
              ...fileItem,
              url: resData?.data?.fileName,
              md5: resData?.data?.md5,
            })
          } else {
            this.$message.error(resData.msg)
          }

          // this.timer = setTimeout(() => {
          //   this.uploadCallback(50)
          //   setTimeout(() => {
          //     this.uploadCallback(80)
          //     setTimeout(() => {
          //       if (resData.code === 0) {
          //         const lastIndex = this.fileList.length - 1
          //         const fileItem = this.fileList[lastIndex]
          //         this.fileList.splice(lastIndex, 1, {
          //           ...fileItem,
          //           url: resData?.data?.fileName,
          //           md5: resData?.data?.md5,
          //         })
          //         this.uploadCallback(100)
          //         this.deactivated()
          //       }else {
          //         this.$message.error(resData.msg)
          //       }
          //     }, 1000)
          //   }, 2000)
          // }, 2500)
        }
      }

      e.target.value = ''
    },
    deactivated() {
      clearTimeout(this.timer)
    },
  },
}
</script>

<style lang="scss" scoped>
.upload-btn {
  .el-button {
    background-color: #f9f9f9;
  }

  .tips {
    color: #999;
    font-size: 10px;

    &:first-of-type {
      margin-left: 10px;
    }
  }
}
</style>
