<template>

  <WarningBlock v-if="isWarnBlockVisible"
                :text="$t('health.overview.tabs.subTabs.tabs.files.text.unsavedFiles')"
                class="mb-4 mx-3"
  />

  <FilesPicker :illness="illness"
               @appointment-change="onAppointmentChange"
               @confirm-files="onConfirm"
               @unlink-file="onFileUnlink"
               ref="filesPicker"
  />

</template>

<script lang="ts">

import FilesPicker  from "@/views/Modules/Health/Components/Overview/ViewEditModal/Tabs/TabFiles/FilesPicker.vue";
import WarningBlock from "@/components/Page/WarningBlock.vue";

import DoctorAppointmentMixin from "@/views/Modules/Health/Mixin/DoctorAppointmentMixin.vue";

import {ComponentData}            from "@/scripts/Vue/Types/Components/types";
import {AppointmentFilesSaveData} from "@/scripts/Core/Types/Modules/Health";

import ArrayTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

import {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";

export default {
  data(): ComponentData {
    return {
      isFilesPickerMounted: false,
      hasRemovedCurrentFiles: false,
      hasAppointmentChanged: false,
    }
  },
  props: {
    illness: {
      type: Object,
      required: true,
    },
  },
  components: {
    FilesPicker,
    WarningBlock,
  },
  mixins: [
    DoctorAppointmentMixin,
  ],
  emits: [
    'removeFileRelation',
    'filesSaved',
  ],
  computed: {
    /**
     * @description decides when warn block should be visible
     */
    isWarnBlockVisible(): boolean {
      if (this.isFilesPickerMounted && this.$refs.filesPicker.hasNewFiles) {
        return true;
      }

      if (this.hasRemovedCurrentFiles) {
        return true;
      }

      if (this.hasAppointmentChanged) {
        return true;
      }

      return false;
    }
  },
  methods: {
    /**
     * @description track if any appointment selet has its value changed
     */
    onAppointmentChange(): void {
      if (!this.hasAppointmentChanged) {
        this.hasAppointmentChanged = true;
        return;
      }

      return;
    },
    /**
     * @description tracks if any of current files was removed/unlinked
     */
    onFileUnlink(eventData: Record<string, boolean>): void {
      if (this.hasRemovedCurrentFiles) {
        return;
      }

      this.hasRemovedCurrentFiles = eventData.hasRemovedCurrentFiles;
    },
    /**
     * @description if data is valid - saves the data - otherwise shows a message without triggering save
     */
    async onConfirm(eventData): Promise<void> {
      let areAllElementsValid = ArrayTypeProcessor.isEmpty(eventData.elementsState.filter((element) => element.isValid === false));
      if (areAllElementsValid) {
        let savedData: AppointmentFilesSaveData = [];

        for (let elementState of eventData.elementsState) {
          let appointmentData = savedData.find((chunk) => chunk.appointmentId === elementState.appointmentId)
          if (appointmentData) {
            appointmentData.storageFileIds.push(elementState.fileId);
            continue;
          }
          savedData.push({
            appointmentId: elementState.appointmentId as number,
            storageFileIds: [elementState.fileId] as Array<number>
          });
        }

        await this.saveFiles(savedData, this.illness.id);
        this.$emit('filesSaved');
        return;
      }

      this.$rootEvent.showNotification(ToastTypeEnum.warning, this.$t('health.overview.tabs.subTabs.tabs.files.text.notValidFiles'));
    },
  },
  mounted(): void {
    this.isFilesPickerMounted = true;
  },
  watch: {
    /**
     * @description hides the unconfirmed-changes warn
     */
    illness: {
      deep: true,
      handler: function () {
        this.hasRemovedCurrentFiles = false;
        this.hasAppointmentChanged = false;
      }
    }
  }
}
</script>
