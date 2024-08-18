<template>
  <Modal :title="$t('views.user.settings.files.modal.header.label')"
         :is-visible="isVisible"
         :size="isPhoneBreakingPoint ? 'full' : 'medium'"
  >
    <template #cancelButton>
      <MediumButtonWithIcon
          :text="$t('userSettings.personalDataModal.buttons.close.label')"
          margin-right-class="mr-0"
          class="w-full sm:w-auto m-0-force"
          button-classes="w-full sm:w-auto"
          text-classes="text-center w-full"
          @click="$emit('modalClosed')"
      />
    </template>

    <template #content>
      <CvList :files-data="cvFiles"
              @file-removed="onFileRemoved"
              @file-updated="onFileUpdated"

      />
      <Upload :configuration-id="formConfigId"
              class="mt-10"
              @upload-finished="onUploadFinished"
      />
    </template>
  </Modal>

</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Upload               from "@/components/Ui/Upload/Component/Upload.vue";
import CvList               from "@/views/User/Settings/Views/Files/components/Cv/components/CvList/CvList.vue";
import Modal                from "@/components/Modal/Modal.vue";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import {UserData}        from "@/scripts/Core/Types/UserData";
import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import SymfonyRoutes     from "@/router/SymfonyRoutes";
import SymfonyFileRoutes from "@/router/SymfonyRoutes/SymfonyFileRoutes";
import GetUserCvList     from "@/scripts/Response/File/Upload/GetUserCvList";
import UploadedFileDTO   from "@/scripts/Dto/File/UploadedFileDTO";

export default {
  data(): ComponentData {
    return {
      cvFiles          : [] as Array<UploadedFileDTO>,
      loggedInUserData : null as null | UserData,
      formConfigId     : '308b18b64b73fdcae6d08c7974469652f8ab7343',
    }
  },
  props: {
    isVisible: {
      type     : Boolean,
      required : false,
    }
  },
  emits: [
    'fileRemoved',
    'fileUpdate',
    'uploadFinished'
  ],
  mixins: [
    ResponsiveVarsMixin
  ],
  components: {
    Modal,
    Upload,
    CvList,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description makes ajax call and fetches the base information about user uploaded cv files
     */
    async getUserCvFiles(): Promise<void> {
      let calledUrl = SymfonyRoutes.buildUrl(SymfonyFileRoutes.GET_USER_CV_LIST);
      this.$rootEvent.showFullPageLoader();
      this.$axios.getWithCsrf(calledUrl, GetUserCvList).then((response: GetUserCvList) => {
        this.$rootEvent.hideFullPageLoader();
        this.cvFiles = [];
        this.$nextTick( () => {
          this.cvFiles = response.filesData;
        })
      })
    },
    /**
     * @description handler for when file is getting removed
     */
    async onFileRemoved(): Promise<void> {
      await this.getUserCvFiles()
      this.$emit('fileRemoved');
    },
    /**
     * @description handler for when file is getting updated
     */
    async onFileUpdated(): Promise<void> {
      await this.getUserCvFiles()
      this.$emit('fileUpdate');
    },
    /**
     * @description handler for when files are uploaded
     */
    async onUploadFinished(): Promise<void> {
      await this.getUserCvFiles()
      this.$emit('uploadFinished');
    }
  },
  created(): void {
    this.getUserCvFiles();
  }
}
</script>