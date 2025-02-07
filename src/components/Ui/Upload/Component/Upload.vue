<template>
  <Container>

    <div class="example-simple">
      <h1 class="h1-blue text-xl">{{ $t('generic.form.upload.header') }}</h1>

      <div class="flex justify-center">

        <!-- uploaded data list -->
        <div class="uploaded-data-list mt-5">
          <UploadedFilesList :files="files"
                             :configuration="configuration"
                             @remove-file="onRemoveFile"
          />

          <p class="mt-2">
            <small class="block"
                   v-if="configuration.maxFileSizeMb > 0"
            >
              <span class="font-bold">{{ $t('generic.form.upload.test.maxFileSize') }} </span>
              <span>{{ configuration.maxFileSizeMb }} Mb</span>
            </small>

            <small class="block"
                   v-if="areAllowedExtensionsSet"
            >
              <span class="font-bold">{{ $t('generic.form.upload.test.allowedFileExtensions') }} </span>
              <span>{{ configuredExtensionsString }}</span>
            </small>

            <small class="block"
                   v-if="areAllowedMimeTypesSet"
            >
              <span class="font-bold">{{ $t('generic.form.upload.test.allowedMimeTypes') }} </span>
              <span>{{ configuredMimeTypesString }}</span>
            </small>

            <small class="block"
                   v-if="configuration.allowNaming"
            >
              <span class="font-bold">*</span>
              <span class="font-bold">{{ $t('generic.form.upload.test.allowedNameCharacters') }}</span>
              <span>{{ $t('generic.form.upload.test.allowedCharactersList') }}</span>
              <span class="italic">({{ $t('generic.form.upload.test.anyOtherCharactersWillBeRemoved') }})</span>
            </small>
          </p>

          <slot name="beforeActions"></slot>

          <!-- actions -->
          <div class="actions flex justify-center sm:flex-row flex-wrap mt-5 flex-col">

            <!-- keep in mind that what limits the selectable files in windows are the MIME TYPES -->

            <MediumButtonWithIcon :text="$t('generic.form.upload.button.select.label')"
                                  button-classes="action-button"
                                  class="action"
                                  @click="$refs.upload.$refs.input.click()"
            >
              <template #icon>
                <la svg-icon-name="hand-pointer"
                    color="white"
                />
              </template>
            </MediumButtonWithIcon>

            <MediumButtonWithIcon :text="$t('generic.form.upload.button.upload.label')"
                                  :disabled="!canUpload"
                                  v-if="!$refs.upload || !$refs.upload.active"
                                  @click.prevent="$refs.upload.active = true"
                                  button-classes="action-button"
                                  class="action"
            >
              <template #icon>
                <la svg-icon-name="file-upload-solid"
                    color="white"
                />
              </template>
            </MediumButtonWithIcon>

            <MediumButtonWithIcon :text="$t('generic.form.upload.button.clearList.label')"
                                  v-if="!$refs.upload || !$refs.upload.active"
                                  @click.prevent="files = []"
                                  button-classes="action-button"
                                  class="action"
            >
              <template #icon>
                <la svg-icon-name="times-circle-solid"
                    color="white"
                />
              </template>
            </MediumButtonWithIcon>

          </div>

          <slot name="afterActions"></slot>
        </div>
      </div>

    </div>

    <!-- uploader instance, triggered via action button, -->
    <VueUploadComponent
        class="upload-component"
        :custom-action="handleUpload"
        :extensions="configuration.allowedExtensions"
        :accept="configuredMimeTypesString"
        :multiple="configuration.isMultiUpload"
        :size="allowedSizeBytes"
        v-model="files"
        @input-filter="onInputFilter"
        @input-file="inputFile"
        ref="upload"
    />

  </Container>
</template>

<script lang="ts">
import UploadedFilesList    from "@/components/Ui/Upload/Component/components/UploadedFilesList.vue";
import Container            from "@/components/Ui/Containers/Container.vue";
import VueUploadComponent, {VueUploadItem} from 'vue-upload-component/src/FileUpload.vue'
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import LineAwesome          from "@/components/Ui/Icons/LineAwesome.vue";

import UploadStatusMixin from "@/components/Ui/Upload/Component/mixin/UploadStatusMixin.vue";

import SymfonyRoutes     from "@/router/SymfonyRoutes";
import UploadResponse    from "@/scripts/Response/File/Upload/UploadResponse";
import SymfonyFileRoutes from "@/router/SymfonyRoutes/SymfonyFileRoutes";

import {ToastTypeEnum}                from "@/scripts/Libs/ToastNotification";
import GetUploadConfigurationResponse from "@/scripts/Response/File/Upload/GetUploadConfigurationResponse";
import UploadConfigurationDTO         from "@/scripts/Dto/File/UploadConfigurationDTO";
import Logger                         from "@/scripts/Core/Logger";

/**
 * Based on:
 * {@link https://lian-yue.github.io/vue-upload-component/#/documents}
 * {@link https://github.com/lian-yue/vue-upload-component/blob/master/docs/views/examples/Simple.vue}
 * {@link https://lian-yue.github.io/vue-upload-component/#/en/examples/full}
 */
export default {
  data() {
    return {
      files: [] as Array<VueUploadItem>,
      upload: {},
      configuration: {} as UploadConfigurationDTO | null,
      url: {
        upload: SymfonyRoutes.buildUrl(SymfonyFileRoutes.UPLOAD_FILES)
      },
    }
  },
  props: {
    canUpload: {
      type: Boolean,
      required: false,
      default: true,
    },
    configurationId: {
      type     : String,
      required : true,
    },
    extraData: {
      type: Object,
      required: false,
      default: function() {
        return {};
      },
    }
  },
  emits: [
    'uploadFinished'
  ],
  mixins: [
    UploadStatusMixin
  ],
  components: {
    MediumButtonWithIcon,
    VueUploadComponent,
    UploadedFilesList,
    Container,
    "la": LineAwesome,
  },
  computed: {
    /**
     * @description check if any extensions are defined as allowed at all
     */
    areAllowedExtensionsSet(): boolean {
      return (Object.keys(this.configuration).length > 1 ? this.configuration.allowedExtensions.length > 0 : false);
    },
    /**
     * @description check if any mime types are defined as allowed at all
     */
    areAllowedMimeTypesSet(): boolean {
      return (Object.keys(this.configuration).length > 1 ? this.configuration.allowedMimeTypes.length > 0 : false);
    },
    /**
     * @description get configured mime types as string
     */
    configuredMimeTypesString(): string {
      return (Object.keys(this.configuration).length > 1 ? this.configuration.allowedMimeTypes.join(',') : '')
    },
    /**
     * @description get configured extensions as string
     */
    configuredExtensionsString(): string {
      return (Object.keys(this.configuration).length > 1 ? this.configuration.allowedExtensions.join(',') : '')
    },
    /**
     * @description return the max allowed bytes - upload component relies on bytes
     */
    allowedSizeBytes(): number {
      return (1024 * 1024 * this.configuration.maxFileSizeMb);
    },
  },
  methods: {
    /**
     * @description filters out the files that can be uploaded
     */
    onInputFilter(newFile, oldFile, prevent) {
      if (this.isFileAlreadyUploaded(newFile)) {
        return prevent();
      }

      if (!this.isFileSizeValid(newFile)) {
        this.$refs.upload.remove(newFile);
        return prevent();
      }

      if (!this.isFileNameValid(newFile)) {
        this.$refs.upload.remove(newFile);
        return prevent();
      }

      if (!this.isExtensionValid(newFile)) {
        this.$refs.upload.remove(newFile);
        return prevent();
      }
    },
    /**
     * @description will check if the give file size is allowed
     */
    isFileSizeValid(file?: VueUploadItem): boolean {
      if (undefined === file) {
        return true;
      }

      let fileSize = file.size as unknown as number;
      if (fileSize > this.allowedSizeBytes) {
        let message = this.$t('generic.form.upload.test.fileToBig') + this.configuration?.maxFileSizeMb;

        this.$rootEvent.showNotification(ToastTypeEnum.info, message);
        return false;
      }

      return true;
    },
    /**
     * @description check file name validity
     */
    isFileNameValid(file?: VueUploadItem): boolean {
      if (undefined === file) {
        return true;
      }

      if (file.name?.includes("..")) {
        this.$rootEvent.showNotification(ToastTypeEnum.info, this.$t('generic.form.upload.test.invalidName'));
        return false;
      }

      return true;
    },
    isFileAlreadyUploaded(file?: VueUploadItem): boolean {
      if (undefined === file) {
        return false;
      }

      for (let fileOnList of this.files) {
        if(
                fileOnList.name === file.name
            &&  fileOnList.size === file.size
            &&  fileOnList.id   !== file.id
        ){
          let message = this.$t('generic.form.upload.test.fileAlreadyOnList') + file.name;
          this.$rootEvent.showNotification(ToastTypeEnum.info, message);
          return true;
        }
      }

      return false;
    },
    /**
     * @description check file name validity
     */
    isExtensionValid(file?: VueUploadItem): boolean {
      if (undefined === file) {
        return true;
      }

      let fileName  = file.name as unknown as string;
      let extension = fileName.replace(/.*\./, "").toLowerCase();

      let lowerCaseExtensions = this.configuration.allowedExtensions.map((extension: string) => {
        return extension.toLowerCase();
      });

      if (!lowerCaseExtensions.includes(extension)) {
        this.$rootEvent.showNotification(ToastTypeEnum.info, this.$t('generic.form.upload.test.extensionNotAllowed') + extension);
        return false;
      }

      return true;
    },
    /**
     * @description when file gets selected, can perform some extra things,
     */
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // Adding file handler
      }

      if (newFile && oldFile) {
        // Updating file handler
      }

      if (!newFile && oldFile) {
        // Removing file handler
      }
    },
    /**
     * @description handles removing the file selected for upload
     */
    onRemoveFile(file): void {
      this.$refs.upload.remove(file)
    },
    /**
     * @description will decide what status will be set on the file based on the server response,
     *              Keep in mind that even if {@see VueUploadItem} can be modified on response and the
     *              update data is reflected on the list, there is still something strange (unknown to me)
     *              on the upload logic (inside the package), which overwrites for example {@see VueUploadItem.success}
     *
     *              So rather than fighting with this, the new dynamic prop is being set and the statuses in here are being
     *              used to determine later on what is shown in GUI etc.
     */
    decideUploadedFileStatus(serverResponse: UploadResponse): string {
      return serverResponse.status;
    },
    /**
     * @description Takes the file and returns its content as base64
     */
    async getBase64FileContent(file: VueUploadItem): Promise<string> {

      /**
       * @description Based on {@link https://github.com/lian-yue/vue-upload-component/issues/317}
       * @info Solution with {@see fromByteArray} and {@see ReadableStreamReadResult} was not working
       *       as sometimes file was getting chopped, sometimes worked
       */
      let promise = new Promise((resolve, reject) => {

        let fileReader   = new FileReader();
        let errorHandler = () => {
          let message = this.$t('messages.internalServerError');
          Logger.error(`Could not read the file: ${file.name}`)
          this.$rootEvent.showNotification(ToastTypeEnum.error, message);
        }

        fileReader.onloadend = () => {
          let base64FileContent = fileReader.result as string;

          let base64regexp     = new RegExp(/data:.*;base64,/);
          let base64Normalized = base64FileContent.replace(base64regexp,"");

          resolve(base64Normalized);
        };

        fileReader.onerror = () => {
          errorHandler()
          reject();
        }

        fileReader.onabort = () => {
          errorHandler()
          reject();
        }

        if (file.file) {
          fileReader.readAsDataURL(file.file);
        } else {
          errorHandler()
          Logger.error(`There is no file data to read.`)
          reject();
        }

      });

      let base64FileContent = await promise as string;

      return base64FileContent;
    },
    /**
     * @description handles uploading the file to backend
     */
    async handleUpload(file: VueUploadItem): Promise<VueUploadItem> {

      let base64fileContent = await this.getBase64FileContent(file);

      let data = {
        fileContent     : base64fileContent,
        fileName        : file.name,
        fileSize        : file.size, // yes, that should be avoided but the uploaded file size is wrong, to small on back, backend has still fallback in case this is manipulated
        userDefinedName : file.userDefinedName,
        uploadConfigId  : this.configuration.identifier,
        extraData       : this.extraData,
      };

      this.$rootEvent.showFullPageLoader();

      let response: UploadResponse = await this.$axios.post(this.url.upload, data, UploadResponse).then((response: UploadResponse) => {
        if (response.isMessageSet()) {
          this.$rootEvent.showNotification(response.getNotificationType(true), response.message);
        }

        return response;
      });

      file.status        = this.decideUploadedFileStatus(response);
      file.uploadHandled = true;

      this.$rootEvent.hideFullPageLoader();
      this.$emit("uploadFinished", {
        isSuccess : response.success,
        message   : response.message,
        status    : response.status,
      });

      return file;
    },
    /**
     * @description will load the upload configuration from backend
     */
    async getUploadConfiguration(): Promise<void> {

      let calledUrl = SymfonyRoutes.buildUrl(
          SymfonyFileRoutes.GET_UPLOAD_CONFIGURATION,
          {
            [SymfonyFileRoutes.GET_UPLOAD_CONFIGURATION_PARAM_ID]: this.configurationId,
          }
      )

      this.$axios.get(calledUrl, GetUploadConfigurationResponse).then((response: GetUploadConfigurationResponse) => {
        this.configuration = response.configuration;
      })
    }
  },
  async created(): Promise<void> {
    await this.getUploadConfiguration();
  }
}
</script>

<style lang="scss" scoped>
.single-uploaded-file + .single-uploaded-file {
  margin-top: 5px;
}

.file-info {
  text-align: left;
}

.actions {
  margin-left: 20px;
  & .action {
    margin-top: 10px;
  }
}

.upload-component * {
  cursor: pointer !important;
}

</style>

<style lang="scss">
.actions {
  & .action .action-button {
    @apply w-full justify-center sm:w-auto
  }
}

</style>