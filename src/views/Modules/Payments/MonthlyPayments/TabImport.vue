<template>
  <BaseWizard
      :steps="wizardConfig.steps"
      :steps-order="wizardConfig.stepsOrder"
      :steps-labels="wizardConfig.stepsLabels"
      :store="store"
      ref="wizard"
  >
    <!-- important: not using v-show on purpose in wizard, something is wrong as if the v-show hiding gets overwritten -->
    <template #steps>
      <StepUpload :ref="wizardConfig.steps.upload"
                  :class="{
                    'hidden': store.currentStep !== wizardConfig.steps.upload
                  }"
                  @step-validated="$refs.wizard.onStepValidate($event)"
                  @next="goToNextStep(wizardConfig.steps.upload)"
      />

      <StepMapping :ref="wizardConfig.steps.mapping"
                  :class="{
                    'hidden': store.currentStep !== wizardConfig.steps.mapping
                  }"
                  @step-validated="$refs.wizard.onStepValidate($event)"
                  @next="goToNextStep(wizardConfig.steps.mapping)"
                  @previous="goToPreviousStep"
      />

      <StepHandleData :ref="wizardConfig.steps.handleData"
                      :class="{
                        'hidden': store.currentStep !== wizardConfig.steps.handleData
                      }"
                      @step-validated="$refs.wizard.onStepValidate($event)"
                      @next="goToNextStep(wizardConfig.steps.handleData)"
                      @previous="goToPreviousStep"
      />

      <StepSummary :ref="wizardConfig.steps.summary"
                   :class="{
                      'hidden': store.currentStep !== wizardConfig.steps.summary
                   }"
                  @step-validated="$refs.wizard.onStepValidate($event)"
                  @finish="sendToBackend"
                  @previous="goToPreviousStep"
      />

    </template>
  </BaseWizard>

</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BaseWizard from "@/components/Ui/Wizard/BaseWizard.vue";

import StepUpload     from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/Wizard/StepUpload.vue";
import StepMapping    from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/Wizard/StepMapping.vue";
import StepHandleData from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/Wizard/StepHandleData.vue";
import StepSummary    from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/Wizard/StepSummary.vue";

import ResponseHandlerMixin from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";

import {UploadWizardStore, UploadWizardStoreType} from "@/scripts/Vue/Store/Module/Payments/Monthly/UploadWizardStore";
import {PaymentsState}                            from "@/scripts/Vue/Store/Module/Payments/Monthly/PaymentsState";
import {ImportStepNameEnum}                             from "@/scripts/Core/Enum/PaymentMonthly";

import SymfonyPaymentsRoutes                      from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";
import BaseApiResponse                            from "@/scripts/Response/BaseApiResponse";

/**
 * Todo: how about some way to reset upload / or reset all table data if wiped etc?
 */
export default {
  data(): ComponentData {
    return {
      store: UploadWizardStore() as UploadWizardStoreType,
      wizardConfig: {
        steps: {
          upload: ImportStepNameEnum.upload,
          mapping: ImportStepNameEnum.mapping,
          handleData: ImportStepNameEnum.handleData,
          summary: ImportStepNameEnum.summary,
        },
        stepsOrder: [
          ImportStepNameEnum.upload,
          ImportStepNameEnum.mapping,
          ImportStepNameEnum.handleData,
          ImportStepNameEnum.summary,
        ],
        stepsLabels: {
          upload: this.$t('payments.monthly.tabs.import.step.upload.label'),
          mapping: this.$t('payments.monthly.tabs.import.step.map.label'),
          handleData: this.$t('payments.monthly.tabs.import.step.processData.label'),
          summary: this.$t('payments.monthly.tabs.import.step.summary.label'),
        }
      }
    }
  },
  components: {
    BaseWizard,
    StepUpload,
    StepMapping,
    StepHandleData,
    StepSummary,
  },
  mixins: [
    ResponseHandlerMixin,
  ],
  methods: {
    /**
     * @description goes to next step of the wizard
     */
    goToNextStep(stepName: string): void {
      if (!this.$refs[stepName].isValid()) {
        return;
      }

      this.$refs.wizard.nextStep();
    },
    /**
     * @description goes to previous step of the wizard
     */
    goToPreviousStep(): void {
      this.$refs.wizard.previousStep();
    },
    /**
     * @description will send the prepared data to backend, save it to database and then reload the page
     */
    sendToBackend(): void {
      let dataBag = {
        data: this.store.rowsCurrentValues
      };

      let url = SymfonyPaymentsRoutes.buildUrl(SymfonyPaymentsRoutes.MONTHLY_IMPORT_URL);
      this.$rootEvent.showFullPageLoader();

      this.$axios.post(url, dataBag, BaseApiResponse).then((response: BaseApiResponse) => {

        this.handleResponse(response);

        /**
         * @description doing reload on import as otherwise would need to carefully reset the state of each step,
         *              wizard itself and pinia store, this is just easier to handle. PaymentsState call must be present here
         *              because it handles the show/hide page loader, meaning that it would hide loader for THIS save call.
         *              Loader stays present even if response is a success, it serves kinda as "doing things with your data" fake spinner.
         */
        if (response.success) {
          setTimeout(async () => {
            await PaymentsState().getAll();
            location.reload();
          }, 2000);
        }

      });
    },
  },
}
</script>