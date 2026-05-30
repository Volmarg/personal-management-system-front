<template>
  <BaseStep @next="isTouched = true">
    <div>
      <Upload :configuration-id="configurationId"
              :return-file-on-upload="true"
              @upload-finished="onUploadFinish"
              @cleared="showCsvDelimiterSelect = false"
              @filter-passed="onFilterPassed"
      >
        <template #beforeExtensions>

          <div class="w-full">
            <VueInput type="text"
                      :label="$t('payments.monthly.tabs.import.step.upload.text.csvDelimiter')"
                      v-model="csvDelimiter"
                      class="mt-3"
                      v-if="showCsvDelimiterSelect"
            />
          </div>

        </template>
      </Upload>
    </div>

    <div>
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

import VueInput from "@/components/Form/Input.vue";
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
      csvDelimiter: ",",
      showCsvDelimiterSelect: false,
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
    VueInput,
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
     * @description
     */
    onFilterPassed(data): void {
      if ("text/csv" === data?.file?.type) {
        this.showCsvDelimiterSelect = true;
        return;
      }

      this.showCsvDelimiterSelect = false;
    },
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

      var workbook = new ExcelJS.Workbook() as Workbook;

      if ("text/csv" === file.type) {
        this.handleCsvUpload(workbook, file);
      } else {
        await workbook.xlsx.read(stream);
        this.handleWorkbookData(workbook);
      }
    },
    /**
     * @description handles uploaded csv file, reads && parses it to the known worksheet structure
     */
    handleCsvUpload(workbook: Workbook, nativeFile: VueUploadItem): void {
      const csvReaderOptions = {
        parserOptions: {
          delimiter: this.csvDelimiter,
          quote: false,
        },
      };

      const reader = new FileReader();
      reader.onload = async () => {

        const browserStream = nativeFile.file.stream();

        // Add an explicit Node-compatible .pipe wrapper that ExcelJS looks for
        const mockNodeStream = {
          pipe: (destination) => {
            const reader = browserStream.getReader();
            const decoder = new TextDecoder('utf-8');

            function readChunks() {
              reader.read().then(({done, value}) => {
                if (done) {
                  // Signal to the destination stream that parsing is finished
                  destination.end ? destination.end() : destination.emit('end');
                  return;
                }

                // Convert the browser Uint8Array chunk to string data
                const textChunk = decoder.decode(value, {stream: true});
                destination.write ? destination.write(textChunk) : destination.emit('data', textChunk);
                readChunks();
              }).catch(err => {
                destination.emit && destination.emit('error', err);
              });
            }

            readChunks();
            return destination;
          },
        };

        await workbook.csv.read(mockNodeStream, csvReaderOptions);
        this.handleWorkbookData(workbook);
      };

      reader.readAsText(nativeFile.file);
    },
    /**
     * @description takes the uploaded data and:
     *              - reads out the headers for mapping step,
     *              - sets the worksheet which will be used in further steps
     */
    handleWorkbookData(workbook: Workbook): void {
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