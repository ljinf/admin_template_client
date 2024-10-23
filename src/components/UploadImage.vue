<template>
  <div class="upload-image">
    <div class="img-list">
      <template v-for="(imgUrl, index) in previewList">
        <div
          v-if="index === 0 || multiple"
          class="img-item"
          :key="index"
          :style="{ ...btnStyle }">
          <el-image
            class="img"
            fit="contain"
            lazy
            :src="imgUrl"
            :preview-src-list="previewList">
          </el-image>

          <div
            v-if="!readonly && multiple"
            class="del-btn"
            @click.stop="handleDelete(index)">
            <i class="el-icon el-icon-close"></i>
          </div>

          <div
            v-if="!readonly && !multiple"
            class="del-btn"
            @click.stop="handleUpload">
            <i class="el-icon el-icon-edit"></i>
          </div>
        </div>
      </template>

      <div
        v-if="
          (!readonly && !multiple && imageList.length === 0) ||
          (!readonly && multiple && imageList.length < maxNum)
        "
        class="img-item upload-btn"
        :style="btnStyle"
        @click="handleUpload">
        <div class="size-tips">{{ sizeTips }}</div>
        <div><i class="el-icon-upload"></i></div>
        <div class="size-tips min-scale">不大于{{ formatFlowSize(maxSize * 1024, 0) }}</div>
      </div>
    </div>

    <input
      ref="uploadRef"
      hidden
      type="file"
      accept="image/*,video/*"
      :multiple="multiple"
      @change="onUploadChange($event)" />
  </div>
</template>

<script>
import { uploadImage } from '@/api/common'
import ImageCompressor from 'image-compressor.js'
import { formatFlowSize } from '@/utils'

export default {
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    btnStyle: {
      type: Object,
      default() {
        return {
          width: '80px',
          height: '80px',
        }
      },
    },
    maxSize: {
      type: Number,
      default: 500,
    },
    maxNum: {
      type: Number,
      default: 1,
    },
    sizeTips: {
      type: String,
      default: '300 x 300',
    },
    value: {
      type: [Array, String],
      default() {
        return []
      },
    },
    params: {
      type: Object,
      default() {
        return {}
      },
    },
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      imageList: [],
    }
  },
  computed: {
    previewList() {
      if (this.multiple) {
        return this.imageList.map(url => this.$resolveCdnUrl(url))
      } else {
        return this.imageList && typeof this.imageList === 'string'
          ? [this.$resolveCdnUrl(this.imageList)]
          : []
      }
    },
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.multiple) {
          this.imageList = this.value || []
        } else {
          this.imageList = this.value || ''
        }
      },
      deep: true,
    },
    imageList: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true,
    },
  },
  mounted() {
    if (this.multiple) {
      this.imageList = this.value || []
    } else {
      this.imageList = this.value || ''
    }
  },
  methods: {
    formatFlowSize,
    // 点击上传
    handleUpload() {
      this.$refs.uploadRef.click()
    },

    // 点击删除
    handleDelete(index) {
      this.imageList.splice(index, 1)
    },

    // 压缩图片
    compressImgFile(file) {
      return new Promise((resolve, reject) => {
        new ImageCompressor(file, {
          quality: 0.7,
          maxWidth: 375,
          success(compressImg) {
            resolve(compressImg)
          },
          error(err) {
            reject(err)
          },
        })
      })
    },

    // 监听文件并上传
    async onUploadChange(e) {
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        const item = files[i]
        if (item.size > this.maxSize * 1024) {
          this.$message.warning(`文件大小不能超过${this.maxSize}K`)
          break
        } else {
          this.compressImgFile(item).then(async cpImg => {
            const resData = await uploadImage(cpImg, this.data, this.params)
            if (resData.code === 0) {
              if (this.multiple) {
                if (i < this.maxNum) {
                  this.imageList.push(resData?.data?.fileName)
                }
              } else {
                this.imageList = resData?.data?.fileName
              }
            }
          })
        }
      }
      e.target.value = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.img-list {
  @include flexbox($fw: wrap);
  margin-bottom: -8px;
  .img-item {
    position: relative;
    margin-right: 8px;
    margin-bottom: 8px;
    flex-shrink: 0;
    background-color: #f9f9f9;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    .img {
      width: 100%;
      height: 100%;
    }
    .del-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 14px;
      height: 14px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 0 0 0 12px;
      color: #fff;
      .el-icon {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 10px;
        transform: scale(0.7);
      }
    }
  }
  .upload-btn {
    @include flexbox($fd: column, $jc: center, $ai: center);
    border: 1px solid #dcdfe6;
    font-size: 30px;
    color: #999;
    z-index: 9;
    cursor: pointer;
    .size-tips {
      font-size: 10px;
      line-height: 15px;
      transform: scale(0.9);
      &.min-scale {
        transform: scale(0.8);
      }
    }
  }
}
</style>
