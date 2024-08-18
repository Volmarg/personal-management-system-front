<template>
  <div>
    <div class="w-full flex items-center justify-start p-4 bg-transparent shadow border-l-4 border-current mb-3 bg-white text-gray-500 text-2md border-blue-500">

      <div class="sm:grid sm:grid-cols-3 left-side-grid w-full grid-rows-2 sm:grid-rows-1">

        <div class="center-flex">
          <FileName :name="fileData.originalName" />
        </div>

        <!-- add actions (download file, remove file, rename file) -->

        <div class="flex justify-end mb-0">
          <UserBasedNameInput
              :initial-name="fileData.userBasedName ?? ''"
              v-show="!isTabletBreakingPoint"
              v-model="userBasedName"
          />
        </div>

        <div class="actions sm:flex justify-center sm:justify-end mb-0 align-self-center row-start-2 sm:row-start-auto">
          <la svg-icon-name="trash-alt"
              :font-size="30"
              color="red"
              class="hover:opacity-50 cursor-pointer mr-2 sm:mr-0"
              @click="removeFile"
              v-tippy="$t('views.user.settings.files.modal.singleCvData.actions.delete')"
          />

          <la svg-icon-name="save-solid"
              v-show="!isTabletBreakingPoint"
              :font-size="30"
              color="green"
              class="hover:opacity-50 cursor-pointer mr-2 sm:mr-0"
              @click="updateFile"
              v-tippy="$t('views.user.settings.files.modal.singleCvData.actions.save')"
          />

          <la svg-icon-name="edit-solid"
              v-show="isTabletBreakingPoint"
              :font-size="30"
              color="rgb(59, 130, 246)"
              class="hover:opacity-50 cursor-pointer mr-2 sm:mr-0"
              @click="isEditDialogVisible = true"
              v-tippy="$t('views.user.settings.files.modal.singleCvData.actions.save')"
          />

          <a
            :href="publicFilePath"
            target="_blank"
            class="sm:mr-0 mr-6"
          >
            <fa
                :icon="['far', 'eye']"
                v-if="null !== publicFilePath"
                color="rgba(0,0,0,0.6)"
                class="hover:opacity-50 cursor-pointer text-2xl ml-1 absolute sm:relative"
                v-tippy="$t('views.user.settings.files.modal.singleCvData.actions.viewDownload')"
            />
          </a>

        </div>
      </div>

    </div>

  </div>

  <EditDialog
      :is-visible="isEditDialogVisible"
      :initial-user-based-name="userBasedName ?? fileData.userBasedName ?? ''"
      ref="editDialog"
      @modal-closed="isEditDialogVisible = false"
      @user-based-name-changed="userBasedName = $event.value"
      @clicked-save="updateFile"
  />
</template>

<script lang="ts">
import FileName           from "@/views/User/Settings/Views/Files/components/Cv/components/SingleCvData/components/FileName.vue";
import UserBasedNameInput from "@/views/User/Settings/Views/Files/components/Cv/components/SingleCvData/components/UserBasedNameInput.vue";
import LineAwesome        from "@/components/Ui/Icons/LineAwesome.vue";
import EditDialog         from "@/views/User/Settings/Views/Files/components/Cv/components/SingleCvData/components/EditDialog.vue";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import {ComponentData}     from "@/scripts/Vue/Types/Components/types";
import UploadedFileDTO     from "@/scripts/Dto/File/UploadedFileDTO";
import SymfonyRoutes       from "@/router/SymfonyRoutes";
import SymfonyFileRoutes   from "@/router/SymfonyRoutes/SymfonyFileRoutes";
import BaseApiResponse     from "@/scripts/Response/BaseApiResponse";
import {ToastTypeEnum}     from "@/scripts/Libs/ToastNotification";
import PublicFolderService from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

export default {
  data(): ComponentData {
    return {
      isEditDialogVisible: false,
      isChecked: false,
      userBasedName: null,
    }
  },
  props: {
    fileData: {
      type     : Object as () => UploadedFileDTO,
      required : true,
    },
  },
  components: {
    FileName,
    EditDialog,
    UserBasedNameInput,
    "la": LineAwesome,
  },
  emits: [
    "fileRemoved",
    "fileUpdated"
  ],
  mixins: [
    ResponsiveVarsMixin
  ],
  computed: {
    /**
     * @description return the public folder file path alongside with the access token
     */
    publicFilePath(): string | null {
      if (null === this.fileData.getPublicFilePath()) {
        return null;
      }
      return PublicFolderService.buildPathWithToken(this.fileData.getPublicFilePath());
    }
  },
  methods: {
    /**
     * @description handles file removal
     */
    async removeFile(): Promise<void> {
      let calledUrl = SymfonyRoutes.buildUrl(SymfonyFileRoutes.DELETE_FILE, {
        [SymfonyFileRoutes.DELETE_FILE_PARAM_ID]: this.fileData.id
      });

      this.$axios.getWithCsrf(calledUrl).then((response: BaseApiResponse) => {
        if (response.success) {
          this.$rootEvent.showNotification(ToastTypeEnum.success, response.message);
          this.$emit('fileRemoved');
          return;
        }

        this.$rootEvent.showNotification(ToastTypeEnum.error, response.message);
        return;
      })
    },
    async updateFile(): Promise<void> {
      let calledUrl = SymfonyRoutes.buildUrl(SymfonyFileRoutes.UPDATE_FILE, {
        [SymfonyFileRoutes.UPDATE_FILE_PARAM_ID]: this.fileData.id
      });

      let data = {
        userDefinedName: this.userBasedName,
      };

      this.$axios.postWithCsrf(calledUrl, data).then((response: BaseApiResponse) => {
        if (response.success) {
          this.$rootEvent.showNotification(ToastTypeEnum.success, response.message);
          this.$emit('fileUpdated');
          return;
        }

        this.$rootEvent.showNotification(ToastTypeEnum.error, response.message);
        return;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.left-side-grid {
  grid-template-columns: 200px 1fr 100px;
}

.center-flex {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @apply flex-row sm:flex-col
}

</style>