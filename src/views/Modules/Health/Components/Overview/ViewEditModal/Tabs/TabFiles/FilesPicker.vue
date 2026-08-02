<template>
  <div>

    <div>
      <FilesList :files="mergedFilesData"
                 :illness="illness"
                 @appointment-change="$emit('appointmentChange')"
                 @remove-file="onFileRemove"
                 ref="filesList"
      />
    </div>

    <div class="flex justify-center mt-10 flex-wrap md:flex-nowrap">
      <MediumButtonWithIcon :text="$t('generic.selectFiles')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full md:w-auto"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            background-color-class="bg-blue-500"
                            @button-click="isPickerModalVisible = true"
      />

      <MediumButtonWithIcon :text="$t('generic.button.confirm.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full md:w-auto ml-0 mt-2 md:ml-2 md:mt-0"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            background-color-class="bg-blue-500"
                            @button-click="onConfirm"
      />
    </div>

    <teleport to="body">
      <StorageItemPickerModal
          :is-modal-visible="isPickerModalVisible"
          :checked-file-ids="getSelectedFilesIds(mergedFilesData)"
          @on-selection-confirm="pickedFilesData = $event"
          @modal-closed="isPickerModalVisible = false"
          class="relative z-22"
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import {ComponentData}       from "@/scripts/Vue/Types/Components/types";
import {HealthFileStateEnum} from "@/scripts/Core/Types/Modules/Health";

import ArrayTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

import ImagePickerUtilsMixin from "@/views/Modules/Storage/Common/Modal/ImagePicker/Mixin/ImagePickerUtilsMixin.vue";
import FilesMixin            from "@/views/Modules/Health/Mixin/FilesMixin.vue";

import StorageItemPickerModal from "@/views/Modules/Storage/Common/Modal/ImagePicker/StorageItemPickerModal.vue";
import MediumButtonWithIcon   from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FilesList              from "@/views/Modules/Health/Components/Overview/ViewEditModal/Tabs/TabFiles/FilesList.vue";

export default {
  data(): ComponentData {
    return {
      pickedFilesData: [],
      currentFilesData: [],
      mergedFilesData: [],
      isPickerModalVisible: false,
    }
  },
  props: {
    illness: {
      type: Object,
      required: true,
    },
  },
  components: {
    FilesList,
    MediumButtonWithIcon,
    StorageItemPickerModal
  },
  mixins: [
    FilesMixin,
    ImagePickerUtilsMixin
  ],
  emits: [
    'appointmentChange',
    'clearPickedFiles',
    'confirmFiles',
    'unlinkFile'
  ],
  computed: {
    /**
     * @description check if any of the merged files is of state 'new'
     */
    hasNewFiles(): boolean {
      return Boolean(this.mergedFilesData.find((fileData) => fileData.state === HealthFileStateEnum.confirmed));
    },
  },
  methods: {
    /**
     * @description validates all list elements, and emits event with info if everything is valid or not
     */
    onConfirm() {
      this.$emit('confirmFiles', {
        elementsState: this.$refs.filesList.getListElementsState(),
      });
    },
    /**
     * @description checks if current files need unlinking. That's a must, else the picker gets a bit glitchy, meaning:
     *              - you have the current file picked,
     *              - you uncheck it,
     *              - you save the selection, but the file is then back due to data merging
     */
    unlinkCurrentFiles(): void {
      if (ArrayTypeProcessor.isEmpty(this.mergedFilesData)) {
        return;
      }

      for (let idx in this.currentFilesData) {
        let currentFile = this.currentFilesData[idx];

        if (!this.pickedFilesData.find((mergedFile) => mergedFile.id === currentFile.id)) {
          delete this.currentFilesData[idx];
          this.$emit('unlinkFile', {
            hasRemovedCurrentFiles: true
          })
        }
      }
    },
    /**
     * @description merges both the provided "current files" and the newly picked ones (unsaved)
     *
     * @param skipUnlink {boolean} - this was initially added due to logic present in {@link onFileRemove}
     *                               which can be triggered from perspective of unuopened {@link StorageItemPickerModal}.
     */
    mergeFilesData(skipUnlink: boolean = false): void {
      this.mergedFilesData = [];
      if (!skipUnlink) {
        this.unlinkCurrentFiles();
      }

      for (let idx in this.currentFilesData) {
        let file = {...this.currentFilesData[idx]};
        file.state = HealthFileStateEnum.unconfirmed;
        this.mergedFilesData.push(file)
      }

      for (let idx in this.pickedFilesData) {
        let file = {...this.pickedFilesData[idx]};
        if (this.mergedFilesData.find((addedFile) => addedFile.id === file.id)) {
          continue;
        }

        file.state = HealthFileStateEnum.confirmed;
        this.mergedFilesData.push(file)
      }

    },
    /**
     * @description removes the selected file from selection list
     */
    onFileRemove(eventData): void {
      /**
       * @description this is for case when modal is not yet opened, so no picked files data is there,
       *              in that case we operate on persisted files data
       */
      if (ArrayTypeProcessor.isEmpty(this.pickedFilesData) && !ArrayTypeProcessor.isEmpty(this.currentFilesData)) {
        this.currentFilesData = this.currentFilesData.filter((dataChunk) => dataChunk.id != eventData.id);
        this.mergeFilesData(true);
        this.$emit('unlinkFile', {
          hasRemovedCurrentFiles: true
        })
        return;
      }

      this.pickedFilesData = this.pickedFilesData.filter((dataChunk) => dataChunk.id !== eventData.id);
    }
  },
  created(): void {
    this.currentFilesData = this.files;
    this.mergeFilesData();
  },
  watch: {
    /**
     * @description this will refresh the file list state (example: confirmation icon)
     */
    illness: {
      deep: true,
      handler: function() {
        this.hasRemovedCurrentFiles = false;
        this.currentFilesData = this.files;
        this.mergeFilesData();
      }
    },
    pickedFilesData: {
      deep: true,
      handler: function() {
        this.mergeFilesData();
      }
    }
  }
}
</script>