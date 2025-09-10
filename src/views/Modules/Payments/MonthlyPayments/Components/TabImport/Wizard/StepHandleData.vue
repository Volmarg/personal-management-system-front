<template>
  <BaseStep>
    <div class="monthly-import-step-handle-data">
      <div class="handle-data-tooltip">
        <MediumButtonWithIcon :text="$t('payments.monthly.tabs.import.step.processData.button.reloadData.label')"
                              @button-click="isDataReloadWarningModalVisible = true"
                              background-color-class="bg-blue-500"
        />

        <MediumButtonWithIcon :text="$t('payments.monthly.tabs.import.step.processData.button.removeIncomes.label')"
                              @button-click="removeIncomes"
                              background-color-class="bg-blue-500"
        />

        <VueInput type="number"
                  v-model="multiplierValue"
                  label="Multiplier"
                  class="mx-2 w-48"
        />
      </div>

      <!-- Special case where navigation is on top due to issues with select-cell not showing all options properly -->
      <SimpleTable :headers="tableHeaders"
                   :data="tableData"
                   :overflow-x-auto="false"
                   :results-per-page="resultsPerPage"
                   :navigation-on-top="true"
                   table-direct-wrapper-classes="pb-24"
                   ref="table"
                   class="import-data-table"
                   @update:component-model-value="onComponentValueChange"
                   @action="onAction"
      />

    </div>

    <teleport to="body">
      <WarningModal :is-visible="isDataReloadWarningModalVisible"
                    id="data-reload-warning-modal"
                    :title="$t('payments.monthly.tabs.import.step.processData.reloadDataModal.header')"
                    @modal-closed="isDataReloadWarningModalVisible = false"
                    @confirm="reloadData(); isDataReloadWarningModalVisible = false"
      >
        <template #content>
          <p class="data-holder text-2md">{{ $t('payments.monthly.tabs.import.step.processData.reloadDataModal.body') }}</p>
        </template>
      </WarningModal>
    </teleport>
  </BaseStep>
</template>

<script lang="ts">
import VueInput             from "@/components/Form/Input.vue";
import SimpleTable          from "@/components/Ui/Table/SimpleTable.vue";
import PaymentTypeSelect    from "@/views/Modules/Payments/Components/Common/PaymentTypeSelect.vue";
import Actions              from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/Actions.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import BaseStep             from "@/components/Ui/Wizard/BaseStep.vue";
import WarningModal         from "@/components/Modal/WarningModal.vue";

import RowAndCellDataMixin from "@/components/Ui/Table/Mixin/RowAndCellDataMixin.vue";

import BaseError from "@/scripts/Core/Error/BaseError";

import {ComponentData}                            from "@/scripts/Vue/Types/Components/types";
import {UploadWizardStore, UploadWizardStoreType} from "@/scripts/Vue/Store/Module/Payments/Monthly/UploadWizardStore";

import {ImportActionEnum, ImportMappedFieldEnum, ImportStepNameEnum} from "@/scripts/Core/Enum/PaymentMonthly";

import moment from "moment/moment";

import {required} from "@vuelidate/validators";

/**
 * Using: {@see https://github.com/exceljs/exceljs}
 */
export default {
  data(): ComponentData {
    return {
      resultsPerPage: 4,
      multiplierValue: 1,
      wizardStore: null as null | UploadWizardStoreType,
      isDataReloadWarningModalVisible: false,
    }
  },
  components: {
    WarningModal,
    BaseStep,
    MediumButtonWithIcon,
    SimpleTable,
    VueInput
  },
  mixins: [
    RowAndCellDataMixin,
  ],
  computed: {
    tableHeaders(): Array {
      return [
        {
          label: 'id',
          dataValuePath : 'id.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.monthly.tabs.import.step.processData.table.header.date.label'),
          columnStyles: 'width: 200px;',
          dataValuePath : `${ImportMappedFieldEnum.date}.value`,
          dataValidations: `${ImportMappedFieldEnum.date}.validations`,
          dataIsComponentPath : `${ImportMappedFieldEnum.date}.isComponent`,
          dataComponentModelValuePath: `${ImportMappedFieldEnum.date}.modelValue`,
          dataComponentPropertiesPath: `${ImportMappedFieldEnum.date}.componentProps`,
        },
        {
          identifier: ImportMappedFieldEnum.money,
          label: this.$t('payments.monthly.tabs.import.step.processData.table.header.money.label'),
          columnStyles: 'width: 150px;',
          dataValuePath : `${ImportMappedFieldEnum.money}.value`,
          dataValidations: `${ImportMappedFieldEnum.money}.validations`,
          dataIsComponentPath : `${ImportMappedFieldEnum.money}.isComponent`,
          dataComponentModelValuePath: `${ImportMappedFieldEnum.money}.modelValue`,
          dataComponentPropertiesPath: `${ImportMappedFieldEnum.money}.componentProps`,
        },
        {
          label: '',
          columnStyles: 'width: 50px;',
          dataValuePath : 'direction.value',
          dataIsComponentPath : 'direction.isComponent',
          dataComponentModelValuePath: 'direction.modelValue',
          dataComponentPropertiesPath: 'direction.componentProps',
        },
        {
          label: this.$t('payments.monthly.tabs.import.step.processData.table.header.description.label'),
          columnStyles: 'width: 300px;',
          dataValuePath : `${ImportMappedFieldEnum.description}.value`,
          dataValidations: `${ImportMappedFieldEnum.description}.validations`,
          dataIsComponentPath : `${ImportMappedFieldEnum.description}.isComponent`,
          dataComponentModelValuePath: `${ImportMappedFieldEnum.description}.modelValue`,
          dataComponentPropertiesPath: `${ImportMappedFieldEnum.description}.componentProps`,
        },
        {
          label: this.$t('payments.monthly.tabs.import.step.processData.table.header.type.label'),
          columnStyles: 'width: 270px;',
          dataValuePath : `${ImportMappedFieldEnum.type}.value`,
          dataValidations: `${ImportMappedFieldEnum.type}.validations`,
          dataIsComponentPath : `${ImportMappedFieldEnum.type}.isComponent`,
          dataComponentModelValuePath: `${ImportMappedFieldEnum.type}.modelValue`,
          dataComponentPropertiesPath: `${ImportMappedFieldEnum.type}.componentProps`,
        },
        {
          label: this.$t('payments.monthly.tabs.import.step.processData.table.header.actions.label'),
          dataValuePath : 'actions.value',
          columnStyles: 'width: 330px;',
          dataIsComponentPath : 'actions.isComponent',
          dataComponentModelValuePath: 'actions.modelValue',
          dataComponentPropertiesPath: 'actions.componentProps',
        },
        {
          label: this.$t('payments.monthly.tabs.import.step.processData.table.header.currency.label'),
          columnStyles: 'width: 100px;',
          dataValuePath : 'currency.value',
          dataIsComponentPath : 'currency.isComponent',
          dataComponentPropertiesPath: null
        },
      ];
    },
    tableData(): Array {
      let data = [];
      for (let rowIndex in this.wizardStore.rowsCurrentValues) {
        let row = this.wizardStore.rowsCurrentValues[rowIndex];
        let originalRow = this.wizardStore.rowsMappedValues[rowIndex];

        data.push({
          values: {
            id: {
              value: rowIndex,
              isComponent: false,
            },
            [ImportMappedFieldEnum.date]: {
              value: VueInput,
              isComponent: true,
              modelValue: this.fieldDataModifiers(ImportMappedFieldEnum.date, row.date),
              validations: [
                required
              ],
              componentProps: {
                type: 'date',
                isRequired: true,
                label: this.$t('payments.monthly.tabs.import.step.processData.table.input.date.label'),
                topWrapperClasses: ''
              }
            },
            [ImportMappedFieldEnum.money]: {
              value: VueInput,
              isComponent: true,
              modelValue: this.fieldDataModifiers(ImportMappedFieldEnum.money, row.money),
              validations: [
                  required
              ],
              componentProps: {
                type: 'number',
                isRequired: true,
                label: this.$t('payments.monthly.tabs.import.step.processData.table.input.money.label'),
                topWrapperClasses: ''
              }
            },
            direction: {
              value: this.fieldDataModifiers('direction', originalRow.money),
              isComponent: false,
            },
            [ImportMappedFieldEnum.description]: {
              value: VueInput,
              isComponent: true,
              modelValue: this.fieldDataModifiers(ImportMappedFieldEnum.description, row.description),
              validations: [
                required
              ],
              componentProps: {
                type: "text",
                isRequired: true,
                label: this.$t('payments.monthly.tabs.import.step.processData.table.input.description.label'),
                topWrapperClasses: ''
              }
            },
            [ImportMappedFieldEnum.type]: {
              value: PaymentTypeSelect,
              isComponent: true,
              modelValue: row.typeId,
              validations: [
                required
              ],
              componentProps: {
                class: 'type-select'
              }
            },
            [ImportMappedFieldEnum.currency]: {
              value: row.currency,
              isComponent: false,
            },
            actions: {
              value: Actions,
              isComponent: true,
              componentProps: {
                spreadsheetRowData: this.wizardStore.spreadsheetRowsOriginalData[rowIndex]
              }
            },
          },
        })
      }

      return data;
    }
  },
  methods: {
    /**
     * @description reloads imported file data into the table - overrides all the values
     */
    reloadData(): void {
      this.buildRowMappings();
    },
    /**
     * @description removes all the incomes (received money)
     */
    removeIncomes(): void {
      for (let index in this.wizardStore.rowsMappedValues) {
        let rowData = this.wizardStore.rowsMappedValues[index];
        if (rowData.money > 0) {
          this.deleteRowIndex(index)
        }
      }

      this.filterEmptyRows();
    },
    /**
     * @description deletes row of given index, from all the used / tracked rows states
     */
    deleteRowIndex(index: number): void {
      delete this.wizardStore.spreadsheetRowsOriginalData[index]; // these are sheet values, not even mapped to the columns (raw state)
      delete this.wizardStore.rowsCurrentValues[index];           // these are currently used / tracked values
      delete this.wizardStore.rowsMappedValues[index];            // these are the original values from the file
    },
    /**
     * @description this is to be used with {@see deleteRowIndex} since JS leaves blank entry on delete call
     */
    filterEmptyRows(): void {
      this.wizardStore.rowsCurrentValues = this.wizardStore.rowsCurrentValues.filter(Boolean);
      this.wizardStore.spreadsheetRowsOriginalData = this.wizardStore.spreadsheetRowsOriginalData.filter(Boolean);
      this.wizardStore.rowsMappedValues = this.wizardStore.rowsMappedValues.filter(Boolean);
    },
    /**
     * @description handle the action buttons
     */
    onAction(data): void {
      switch(data.originalEvent.actionName) {
        case ImportActionEnum.multiply:
          this.handleMultiply(data);
          break;
        case ImportActionEnum.delete:
          this.handleDelete(data);
          break;
        case ImportActionEnum.reset:
          this.handleReset(data);
          break;
        default:
          throw new BaseError(`Unsupported action ${data.originalEvent.actionName}`);
      }
    },
    /**
     * @description handles the multiply action
     */
    handleMultiply(data: Record<string, unknown>): void {
      let columnNumber = this.tableHeaders.findIndex(
          (headerDefinition: Record<string, string | null | undefined>) => headerDefinition.identifier === ImportMappedFieldEnum.money
      );

      if (!columnNumber) {
        throw new BaseError(`Money column number could not be found! Searched for identifier: ${ImportMappedFieldEnum.money}`);
      }

      let cellId = this.buildCellUniqueId(data.rowNumber, columnNumber);
      let tableComponentRef = this.buildComponentRefName(cellId);
      if (!this.$refs.table.$refs[tableComponentRef] || !this.$refs.table.$refs[tableComponentRef][0]) {
        throw new BaseError(`No table component found for ref: ${tableComponentRef}`);
      }

      let moneyInput = this.$refs.table.$refs[tableComponentRef][0];

      let value = this.wizardStore.rowsCurrentValues[data.rowNumber][ImportMappedFieldEnum.money];
      let usedValue = this.fieldDataModifiers(ImportMappedFieldEnum.money, value)
      let multipliedValue = (usedValue * this.multiplierValue).toFixed(2);

      moneyInput.setValue(multipliedValue);
      this.wizardStore.rowsCurrentValues[data.rowNumber][ImportMappedFieldEnum.money] = multipliedValue;
    },
    /**
     * @description handles the delete-row action
     */
    handleDelete(data): void {
      this.deleteRowIndex(data.rowNumber);
      this.filterEmptyRows();
    },
    /**
     * @description handles the reset-row action
     */
    handleReset(data): void {
      for (let fieldName of Object.keys(this.wizardStore.rowsMappedValues[data.rowNumber])) {
        let value = this.wizardStore.rowsMappedValues[data.rowNumber][fieldName];
        let processedValue = this.fieldDataModifiers(fieldName, value);

        this.wizardStore.rowsCurrentValues[data.rowNumber][fieldName] = processedValue;
      }
    },
    /**
     * @description updates the tracked row values, when user changes the value / v-model of the table components
     */
    onComponentValueChange(data) {
      this.wizardStore.rowsCurrentValues[data.rowNumber][data.cellData.fieldId] = data.value === undefined ? null : data.value;
    },
    /**
     * @description prepares the import-data for display/further processing
     */
    fieldDataModifiers(fieldName: string, value: unknown): string | number | null | undefined {
      let mods = {
        [ImportMappedFieldEnum.date]: () => moment(value).format("YYYY-MM-DD"),
        [ImportMappedFieldEnum.money]: () => Math.abs(value),
        direction: () => {
          let type = value > 0 ? "⬆" : "⬇︎";
          let typeClass = (value > 0 ? "text-green-500" : "text-red-500") + ' text-2xl align-self-center';

          return `<span class="flex flex-col justify-center"><span class="${typeClass}">${type}</span></span>`
        },
        [ImportMappedFieldEnum.description]: () => String(value).trim(),
      }

      return mods[fieldName] ? mods[fieldName]() : value;
    },
    /**
     * @description reads out the imported file rows, and builds the given arrays:
     *              - rows of mapped fields into column values,
     *              - clone of "above" used for tracking table components updated value / v-model,
     *                this is later sent to backend, and DB entries are created from it
     *              - spreadsheet original rows data,
     */
    buildRowMappings(): void {
      // first step needs to set it first
      if (!this.wizardStore.worksheet) {
        return;
      }

      this.wizardStore.rowsMappedValues = [];
      this.wizardStore.worksheet.eachRow((row, index) => {
        let rowData = {};
        let spreadsheetRowData = {};

        if (index === 1) { // skip headers
          return;
        }

        for (let fieldName of Object.keys(this.wizardStore.fieldToColumnMapping)) {
          let headerNumber = this.wizardStore.fieldToColumnMapping[fieldName];
          if (!headerNumber) {
            continue;
          }

          rowData[fieldName] = row.getCell(Number(headerNumber)).value;
        }

        // this is used to show data in view modal
        for (let headerNumber in this.wizardStore.fileHeaders) {
          let headerLabel = this.wizardStore.fileHeaders[headerNumber];
          spreadsheetRowData[headerLabel] = row.getCell(Number(headerNumber)).value ?? '';
        }

        this.wizardStore.spreadsheetRowsOriginalData.push(spreadsheetRowData);
        this.wizardStore.rowsMappedValues[index] = rowData;
      });

      // add extra fields to the tracked row values (these do not come from the import), need them added in here
      this.wizardStore.rowsMappedValues = [...this.wizardStore.rowsMappedValues].filter(Boolean); // reindex + wipe empty values
      for (let mapEntry of this.wizardStore.rowsMappedValues) {
        mapEntry.typeId = null;
      }

      // can't just use {...}, because update array values were propagated on the rowsMappedValues
      this.wizardStore.rowsCurrentValues = JSON.parse(JSON.stringify(this.wizardStore.rowsMappedValues));
    },
    /**
     * @description this step is only ever valid if:
     *              - all the table components are valid,
     *              - table is not empty,
     */
    isValid(): boolean {
      this.$refs.table.validateComponentsValues();
      return this.$refs.table.areComponentsValuesValid && this.wizardStore.rowsMappedValues.length > 0;
    },
  },
  beforeMount():void {
    this.wizardStore = UploadWizardStore();
    this.buildRowMappings();
  },
  watch: {
    /**
     * @description build the table data ONLY when THIS step is active (steps relly kinda on v-show)
     */
    'wizardStore.currentStep'(): void {
      if (this.wizardStore.currentStep === ImportStepNameEnum.handleData && this.wizardStore.rowsMappedValues.length === 0) {
        this.buildRowMappings();
        return;
      }
    },
    /**
     * @description trigger components validation whenever some of the tracked data changes
     */
    'wizardStore.rowsCurrentValues': {
      deep: true,
      handler: function() {
        if (!this.$refs.table) {
          return;
        }

        this.$parent.updateStepValidity(this.isValid());
      }
    }
  }
}
</script>

<style lang="scss">
.monthly-import-step-handle-data {
  .import-data-table {
    table {
      table-layout: fixed !important;
    }
    @apply mt-4
  }

  .handle-data-tooltip {
    @apply flex mt-4 ml-2
  }

  .type-select {
    height: 50px;
  }
}
</style>