<template>
  <div>
    <ColorBorderBar v-for="file in files"
                    :key="file.id"
                    class="single-uploaded-file"
    >
      <slot>
        <div class="flex md:flex-row justify-between w-full flex-col"
             :class="{
                'items-center': isExtraSectionActive,
             }"
        >

          <div class="file-info">
            <p>{{ file.name }}</p>
            <p> ({{ bytesToMb(file.size) }} Mb) </p>
          </div>

          <div class="extra"
               v-if="isExtraSectionActive"
          >
            <v-input :label="$t('generic.form.upload.field.fileName.label')"
                     type="text"
                     v-if="configuration.allowNaming"
                     class="mt-6 ml-2 w-full lg:w-2/5"
                     :ref="'userDefinedName' + file.id"
                     @input="onFileNameInput(file)"
                     v-model="fileNames[file.id]"
                     :is-disabled="file.uploadHandled"
            />

            <TagInput v-model="fileTags[file.id]"
                      @update:modelValue="onTagInput(file)"
                      :is-disabled="file.uploadHandled"
                      class="w-full lg:w-3/5 self-center lg:mr-4 ml-4"
            />
          </div>

          <div class="upload-status">

            <!-- malicious file -->
            <span v-if="isMalicious(file.status)">
              <la svg-icon-name="bug-solid"
                  :font-size="30"
                  color="red"
                  v-tippy="{
                    content: $t('generic.form.upload.status.malicious.label')
                  }"
              />

            </span>

            <!-- error -->
            <span v-else-if="isFailure(file.status)">
              <la svg-icon-name="times-circle-solid"
                  :font-size="30"
                  color="red"
                  v-tippy="{
                    content: $t('generic.form.upload.status.error.label')
                  }"
              />

            </span>

            <!-- success -->
            <span v-else-if="isSuccess(file.status)">
              <la svg-icon-name="check-circle-solid"
                  :font-size="30"
                  color="green"
                  v-tippy="{
                    content: $t('generic.form.upload.status.success.label')
                  }"
              />

            </span>

          </div>

          <div class="actions">

            <!-- remove -->
            <div v-if="!file.success">
              <la svg-icon-name="trash-alt"
                  :font-size="30"
                  color="red"
                  class="hover:opacity-50 cursor-pointer"
                  @click.prevent="$emit('removeFile', file)"
                  v-tippy="{
                    content: $t('generic.form.upload.actions.remove.label')
                  }"
              />
            </div>

          </div>
        </div>
      </slot>

    </ColorBorderBar>

  </div>
</template>

<script lang="ts">
import LineAwesome    from "@/components/Ui/Icons/LineAwesome.vue";
import ColorBorderBar from "@/components/Ui/Bar/ColorBorderBar.vue";
import Input          from "@/components/Form/Input.vue";
import TagInput       from "@/components/Ui/Upload/Component/components/TagInput.vue";

import UploadStatusMixin from "@/components/Ui/Upload/Component/mixin/UploadStatusMixin.vue";

import {VueUploadItem} from "vue-upload-component";

export default {
  data() {
    return {
      fileNames: {},
      fileTags: {},
    }
  },
  props: {
    files: {
      type     : Array,
      required : true,
    },
    configuration: {
      type     : Object,
      required : true,
    }
  },
  mixins: [
    UploadStatusMixin,
  ],
  components: {
    ColorBorderBar,
    TagInput,
    "la": LineAwesome,
    "v-input": Input,
  },
  computed: {
    /**
     * @description check if there is anything that defines extra section as active
     */
    isExtraSectionActive(): boolean {
      return (this.configuration.allowNaming || this.configuration.allowTagging);
    }
  },
  methods: {
    /**
     * @description check if file was detected to be malicious - did antivirus for example,
     *              considered this file to be unsafe
     */
    isMalicious(fileState): boolean {
      return (fileState === this.uploadStatus.malicious);
    },
    /**
     * @description check if file was uploaded with success
     */
    isSuccess(fileState): boolean {
      return (fileState === this.uploadStatus.success);
    },
    /**
     * @description check if there were some issues with uploading the file
     */
    isFailure(fileState): boolean {
      return (fileState === this.uploadStatus.error);
    },
    /**
     * @description takes the filesize and returns mb based value
     */
    bytesToMb(fileSize: number): string {
      return (fileSize / 1024 / 1024).toFixed(2);
    },
    /**
     * @description handler for when file / data name is inserted
     */
    onFileNameInput(file: VueUploadItem) {
      file.userDefinedName = this.fileNames[file.id];
    },
    /**
     * @description handler for when file / data name is inserted
     */
    onTagInput(file: VueUploadItem) {
      file.tags = this.fileTags[file.id];
    }
  },
  emits: [
    "removeFile"
  ]
}
</script>

<style lang="scss" scoped>
.extra {
  @apply flex flex-col lg:flex-row w-full lg:w-3/5 justify-between gap-x-5 self-end mb-4 lg:mb-0
}

.file-info {
  * {
    @apply break-all flex justify-center
  }

  @apply flex flex-col w-full lg:w-1/4
}

</style>