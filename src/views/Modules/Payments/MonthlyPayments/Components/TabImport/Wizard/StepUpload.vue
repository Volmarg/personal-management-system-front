<template>
  <BaseStep @next="isTouched = true">
    <div>
      <Upload :configuration-id="configurationId"
              :return-file-on-upload="true"
              @upload-finished="onUploadFinish"
      />

      <div class="mt-4">
        <p v-if="!isUploaded"
           class="text-red-500"
        >
          {{ $t('payments.monthly.tabs.import.step.upload.text.noFileUploaded') }}
        </p>

        <p v-else-if="isUploaded"
           class="text-green-500"
        >
          {{ $t('payments.monthly.tabs.import.step.upload.text.fileUploaded') }}
        </p>
      </div>

    </div>
  </BaseStep>
</template>

<script lang="ts">
import ExcelJS    from "exceljs";
import {Workbook} from "exceljs/index";

import Upload   from "@/components/Ui/Upload/Component/Upload.vue";
import BaseStep from "@/components/Ui/Wizard/BaseStep.vue";

import StepInterfaceMixin from "@/components/Ui/Wizard/mixin/StepInterfaceMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {VueUploadItem} from "vue-upload-component/src/FileUpload.vue";
import {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";

import {UploadWizardStore, UploadWizardStoreType} from "@/scripts/Vue/Store/Module/Payments/Monthly/UploadWizardStore";

import BaseError from "@/scripts/Core/Error/BaseError";

export default {
  data(): ComponentData {
    return {
      headersRowNum: 1,
      configurationId: 'b54c2e78d5dbcc4441f813da11783859e2588d8b',
      /**
       * @description imported file might not have the header for some columns, so this will be displayed in such case
       */
      undefinedHeaderPrefix: 'unknown-',
      wizardStore: null as null | UploadWizardStoreType,
      isUploaded: false,
      isTouched: false,
    }
  },
  components: {
    BaseStep,
    Upload
  },
  mixins: [
    StepInterfaceMixin
  ],
  emits: [
    'uploaded',
  ],
  methods: {
    /**
     * @description this step is considered valid if the file has been uploaded
     */
    isValid(): boolean {
      return this.isUploaded;
    },
    /**
     * @description takes the uploaded data and:
     *              - reads out the headers for mapping step,
     *              - sets the worksheet which will be used in further steps
     */
    async onUploadFinish(data): Promise<void> {
      let file = data.file as VueUploadItem;
      let stream = file.file?.stream();

      if (!stream) {
        throw new BaseError("Could not read the file stream. It's empty?");
      }

      let workbook = new ExcelJS.Workbook() as Workbook;
      await workbook.xlsx.read(stream);

      if (workbook.worksheets.length > 1) {
        this.$rootEvent.showNotification(ToastTypeEnum[ToastTypeEnum.warning], this.$t('payments.monthly.tabs.import.step.upload.text.moreThanOneWorksheet'));
      }

      this.wizardStore.worksheet = workbook.getWorksheet(1);
      this.wizardStore.worksheet.getRow(this.headersRowNum).eachCell((cell, index) => {
        if ('undefined' === typeof cell.value) {
          return
        }

        this.wizardStore.fileHeaders[index] = cell.value;
      });

      // push columns without headers
      let headersCount = Object.keys(this.wizardStore.fileHeaders).length;
      while (headersCount < this.wizardStore.worksheet.columnCount) {
        headersCount++;
        this.wizardStore.fileHeaders[headersCount] = this.undefinedHeaderPrefix + headersCount;
      }

      this.isUploaded = true;
      this.$parent.updateStepValidity(this.isValid());
    }
  },
  created(): void {
    this.wizardStore = UploadWizardStore();
  }
}
</script>