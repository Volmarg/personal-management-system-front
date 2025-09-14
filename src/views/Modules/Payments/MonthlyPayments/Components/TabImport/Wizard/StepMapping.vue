<template>
  <BaseStep>
    <div>
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
import MultiSelect from "@/components/Form/MultiSelect.vue";
import BaseStep    from "@/components/Ui/Wizard/BaseStep.vue";

import VuelidateHandler from "@/scripts/Vue/Mixins/VuelidateHandler.vue";

import {ComponentData}                            from "@/scripts/Vue/Types/Components/types";
import {UploadWizardStore, UploadWizardStoreType} from "@/scripts/Vue/Store/Module/Payments/Monthly/UploadWizardStore";
import {ImportMappedFieldEnum}                    from "@/scripts/Core/Enum/PaymentMonthly";

import moment from "moment";

/**
 * Using: {@see https://github.com/exceljs/exceljs}
 */
export default {
  data(): ComponentData {
    return {
      headersRowNum: 1,
      wizardStore: null as null | UploadWizardStoreType,
      validationErrors: {},
    }
  },
  mixins: [
    VuelidateHandler,
  ],
  components: {
    BaseStep,
    MultiSelect
  },
  computed: {
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
  },
  beforeMount(): void {
    this.wizardStore = UploadWizardStore();
  },
  watch: {
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