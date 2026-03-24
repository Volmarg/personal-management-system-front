<template>
  <BaseStep>
    <div>

      <div class="flex flex-wrap flex-row justify-end mx-4 mt-4 mb-10">
        <div class="w-full md:w-1/4">
          <ImportProfileSelect v-model="selectedProfileId"/>
        </div>
      </div>

      <div v-for="fieldName in Object.keys(wizardStore.fieldToColumnMapping)"
           :key="fieldName"
           class="grid grid-cols-4 mt-6"
      >
        <div class="col-start-1 col-end-2 flex text-center w-full flex-row">
          <div class="w-full align-self-center">
            {{ fieldName }}
          </div>
        </div>

        <div class="col-start-2 col-end-4" style="max-height: 50px;">
          <MultiSelect
              :label="$t('payments.monthly.tabs.import.step.map.form.column.label')"
              :options="mappingOptions"
              @change="onMultiselectEvent($event, fieldName)"
              @select="onMultiselectEvent($event, fieldName)"
              @deselect="onMultiselectEvent($event, fieldName)"
              @clear="onMultiselectEvent($event, fieldName)"
              @paste="onMultiselectEvent($event, fieldName)"
              v-model="wizardStore.fieldToColumnMapping[fieldName]"
              mode="single"
              :allow-show-options-list="true"
              :allow-create-options="false"
              :can-clear="true"
              :required="Object.keys(wizardStore.mappingFieldsValidations).includes(fieldName)"
          />

          <p class="text-red-500 mt-1">
            {{ validationErrors[fieldName] }}
          </p>
        </div>
      </div>
    </div>
  </BaseStep>
</template>

<script lang="ts">
import ImportProfileSelect from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/Wizard/StepMapping/ImportProfileSelect.vue";
import MultiSelect         from "@/components/Form/MultiSelect.vue";
import BaseStep            from "@/components/Ui/Wizard/BaseStep.vue";

import VuelidateHandler from "@/scripts/Vue/Mixins/VuelidateHandler.vue";

import {ComponentData}                            from "@/scripts/Vue/Types/Components/types";
import {UploadWizardStore, UploadWizardStoreType} from "@/scripts/Vue/Store/Module/Payments/Monthly/UploadWizardStore";
import {MonthlyImportProfilesStore}               from "@/scripts/Vue/Store/Module/Payments/Settings/MonthlyImportProfilesStore";
import {ImportMappedFieldEnum}                    from "@/scripts/Core/Enum/PaymentMonthly";

import moment from "moment";

import ArrayTypeProcessor  from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

/**
 * Using: {@see https://github.com/exceljs/exceljs}
 */
export default {
  data(): ComponentData {
    return {
      headersRowNum: 1,
      selectedProfileId: null,
      wizardStore: null as null | UploadWizardStoreType,
      importProfileStore: null,
      validationErrors: {},
    }
  },
  mixins: [
    VuelidateHandler,
  ],
  components: {
    BaseStep,
    MultiSelect,
    ImportProfileSelect
  },
  computed: {
    /**
     * @description returns the selected profile data or null if nothing was found
     */
    selectedProfile(): Record<string, string> | null {
      if (StringTypeProcessor.isEmptyString(this.selectedProfileId) || ArrayTypeProcessor.isEmpty(this.importProfileStore.allEntries)) {
        return null;
      }

      return this.importProfileStore.allEntries.find((profileData: Record<string, string>) => profileData.id === this.selectedProfileId) ?? null;
    },
    /**
     * @description takes the header columns and creates options for selects
     */
    mappingOptions(): Array<unknown> {
      let options: Array<unknown> = [];
      for (let headerIndex of Object.keys(this.wizardStore.fileHeaders)) {
        options.push({
          'value': headerIndex,
          'label': this.wizardStore.fileHeaders[headerIndex],
        })
      }

      return options;
    },
  },
  methods: {
    /**
     * @description handle multiselect event
     */
    onMultiselectEvent(value: unknown, fieldName: string): void {
      this.wizardStore.fieldToColumnMapping[fieldName] = value;
    },
    /**
     * @description goes over the picked column values, and checks if all of them are passing field validation,
     *              returns array of invalid values.
     */
    validateMappedFieldValues(fieldName: string, columnValues: Array<unknown>): Array<unknown> {
      let invalidValues = [];
      for (let value of columnValues) {
        let pushedValue = undefined === value ? '' : value;

        switch (fieldName) {
          case ImportMappedFieldEnum.money:
            if (isNaN(value)) {
              invalidValues.push(pushedValue);
            }
            break;
          case ImportMappedFieldEnum.date:
            if (!moment(value).isValid()) {
              invalidValues.push(pushedValue);
            }
            break;
        }

      }

      return invalidValues;
    },
    /**
     * @description validate this step: make sure that all the field validations are passing
     */
    isValid(): boolean {
      this.validationErrors = {};

      for (let fieldName of Object.keys(this.wizardStore.fieldToColumnMapping)) {
        let mappingValue = this.wizardStore.fieldToColumnMapping[fieldName];

        if (this.wizardStore.worksheet && mappingValue) {
          let columnValues = Object.values(this.wizardStore.worksheet.getColumn(parseInt(mappingValue)).values);
          delete columnValues[this.headersRowNum -1]; // rows are 1 indexed, the array is 0 indexed
          columnValues = columnValues.filter(Boolean);

          let invalidValues = this.validateMappedFieldValues(fieldName, columnValues);
          if (invalidValues.length > 0) {
            let msg = `${this.$t('payments.monthly.tabs.import.step.map.text.columnValuesInvalid') } '${invalidValues.pop()}'`;
            this.validationErrors[fieldName] = msg;
          }
        }

        let validations = this.wizardStore.mappingFieldsValidations[fieldName] ?? [];

        let errors = this.validateValue(mappingValue, validations);
        if (errors.length > 0) {
          this.validationErrors[fieldName] = errors[0];
        }
      }

      return Object.keys(this.validationErrors).length === 0;
    },
    /**
     * @description Updates the selected fields mapping based on selected profile
     */
    updateFieldsMappingFromProfile(): void {
      let profileFieldPattern = "Field";
      if (!this.selectedProfile) {
        return;
      }

      for (let key of Object.keys(this.selectedProfile)) {
        if (!key.toLowerCase().includes(profileFieldPattern.toLowerCase())) {
          continue;
        }

        let mappedFieldName = key.replace(profileFieldPattern, "");
        let mappedFieldValue = this.selectedProfile[key];
        let matchingHeaderOption = this.mappingOptions.find((mappingOption: Record<string, string>): boolean => {
          return mappingOption.label === mappedFieldValue;
        });

        // no such header in uploaded file
        if (!matchingHeaderOption) {
          continue;
        }

        this.wizardStore.fieldToColumnMapping[mappedFieldName] = matchingHeaderOption.value;
      }
    }
  },
  async beforeMount(): Promise<void> {
    this.wizardStore = UploadWizardStore();
    this.importProfileStore = MonthlyImportProfilesStore();
    if (ArrayTypeProcessor.isEmpty(this.importProfileStore.allEntries)) {
      await this.importProfileStore.getAll();
    }
  },
  watch: {
    /**
     * @description reacts to profile selection, updates the selected fields mapping based on selected profile
     */
    selectedProfile() {
      this.updateFieldsMappingFromProfile();
    },
    /**
     * @description trigger validations whenever select value changes
     */
    'wizardStore.fieldToColumnMapping': {
      deep: true,
      handler: function () {
        this.$parent.updateStepValidity(this.isValid());
      }
    }
  }
}
</script>