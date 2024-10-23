<template>
  <div class="file-item">
    <img
      class="file-type-icon"
      :src="`/static/img/${returnFileIcon(fileType)}.png`"
      alt="icon" />

    <div class="file-content">
      <div class="file-name">
        <a
          target="_blank"
          :href="previewUrl(fileItem.url)">
          {{ fileItem.name }}
        </a>
        <slot name="progress"></slot>
      </div>

      <!-- <div class="file-size">{{ returnFileSize(fileSize) }}</div> -->
    </div>

    <div
      v-if="!readonly && multiple"
      class="del-btn"
      @click.stop="$emit('on-delete', fileIndex)">
      <i class="el-icon el-icon-close"></i>
    </div>

    <div
      v-if="!readonly && !multiple"
      class="del-btn"
      @click.stop="$emit('on-edit')">
      <i class="el-icon el-icon-edit"></i>
    </div>
  </div>
</template>

<script>
import { downloadFile } from '@/api/common'

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
    fileIndex: {
      type: Number,
      required: true,
    },
    fileItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fileTypeMap: {
        txt: 'file_txt',
        pdf: 'file_pdf',
        doc: 'file_word',
        docx: 'file_word',
        xlsx: 'file_excel',
        xls: 'file_xls',
        ppt: 'file_ppt',
        jpg: 'file_img',
        jpeg: 'file_img',
        png: 'file_img',
        svg: 'file_img',
        avi: 'file_video',
        mp4: 'file_video',
        rmvb: 'file_video',
        mp3: 'file_music',
        flv: 'file_music',
        exe: 'file_exe',
        apk: 'file_exe',
        zip: 'file_zip',
        html: 'file_html',
        psd: 'file_psd',
        iso: 'file_iso',
        other: 'other',
      },
      fileSize: 0,
    }
  },
  computed: {
    fileType() {
      return this.fileItem?.name?.split('.')?.slice(-1)?.toString()
    },
  },
  methods: {
    // 通过url读取文件信息
    async loadFile(url) {
      const { data: resBlob } = await downloadFile(url)
      const { size } = resBlob
      this.fileSize = size
    },

    // 返回文件可读性大小
    returnFileSize(size) {
      if (size < 1024) {
        return `${size} B`
      } else if (size >= 1024 && size < 1048576) {
        return `${(size / 1024).toFixed(1)} K`
      } else if (size >= 1048576) {
        return `${(size / 1048576).toFixed(1)} M`
      }
    },

    // 返回文件icon
    returnFileIcon(fileType) {
      if (fileType in this.fileTypeMap) {
        return this.fileTypeMap[fileType]
      } else {
        return 'file_cloud'
      }
    },

    // 返回预览地址
    previewUrl(url) {
      const officeFiles = ['doc', 'docx', 'xlsx', 'xls', 'ppt']
      if (officeFiles.includes(this.fileType)) {
        return `https://view.officeapps.live.com/op/view.aspx?src=${this.$resolveCdnUrl(url)}`
      } else {
        return this.$resolveCdnUrl(url)
      }
    },
  },
  watch: {
    'fileItem.url'(newVal) {
      if (newVal) {
        // this.loadFile(newVal)
      }
    },
  },
  mounted() {
    // this.loadFile(this.fileItem.url)
  },
}
</script>

<style lang="scss" scoped>
.file-item {
  @include flexbox();
  position: relative;
  margin-top: 10px;
  border: 1px solid #dcdfe6;
  padding: 5px;
  background-color: #f9f9f9;
  padding-right: 14px;
  .file-type-icon {
    width: 36px;
    height: 36px;
    object-fit: contain;
    flex-shrink: 0;
  }
  .file-content {
    @include flexbox(column, space-between);
    height: 36px;
    width: calc(100% - 36px);
    margin-left: 4px;
    .file-name,
    .file-size {
      width: 100%;
      line-height: 14px;
    }
    .file-name {
      display: inline-block;
      padding: 1px 0;
      @include uniline();
      text-decoration: underline;
    }
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
    cursor: pointer;
    z-index: 9;
    .el-icon {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 10px;
      transform: scale(0.7);
    }
  }
}
</style>
