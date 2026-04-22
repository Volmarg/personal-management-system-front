<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>

      <div class="grid gap-y-6">
        <FieldSelect v-model="form.fieldName" />

        <FormInput type="text"
                   v-model="form.description"
                   :label="$t('payments.settings.tab.monthlyImport.tab.filterRule.form.element.description.label')"
                   class="mb-0-force"
        />

        <TypeSelect v-model="form.type" />

        <FormInput type="text"
                   v-model="form.rule"
                   :is-required="true"
                   :label="$t('payments.settings.tab.monthlyImport.tab.filterRule.form.element.rule.label')"
                   class="mb-0-force"
        />

        <div class="mb-4">
          <ImportProfileSelect v-model="form.profileId"/>
        </div>
      </div>

      <MediumButtonWithIcon :text="$t('payments.settings.tab.monthlyImport.tab.filterRule.form.element.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import ImportProfileSelect  from "@/views/Modules/Payments/MonthlyPayments/Components/TabImport/Wizard/StepMapping/ImportProfileSelect.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";
import TypeSelect           from "@/views/Modules/Payments/Components/Settings/MonthlyPayments/TabFilterRules/TypeSelect.vue";
import FieldSelect          from "@/views/Modules/Payments/Components/Settings/MonthlyPayments/TabFilterRules/FieldSelect.vue";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyPaymentsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

export default {
  data(): ComponentData {
    return {
      form: {
        description: null,
        fieldName: null,
        rule: null,
        type: null,
        profileId: null,
      }
    }
  },
  props: {
    header: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: [Number, null],
      required: false,
      default: null
    },
    importProfileId: {
      type: [Number, null],
      required: false,
      default: null
    },
    description: {
      type: [String, null],
      required: false,
      default: null
    },
    fieldName: {
      type: [String, null],
      required: false,
      default: null
    },
    rule: {
      type: [String, null],
      required: false,
      default: null
    },
    typeValue: {
      type: [String, null],
      required: false,
      default: null
    }
  },
  components: {
    FormInput,
    TypeSelect,
    FieldSelect,
    ImportProfileSelect,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description resets the form state
     */
    clearForm(): void {
      this.form.description = '';
      this.form.fieldName = '';
      this.form.rule = '';
      this.form.type = '';
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyPaymentsRoutes.SETTINGS_PAYMENT_MONTHLY_IMPORT_FILTER_RULES, this.id, BaseApiResponse, this.form);
      config.reload = false;

      let response: BaseApiResponse;
      if (this.id) {
        response = await this.$moduleCall.update(config);
      } else {
        response = await this.$moduleCall.new(config);
      }

      if (response.success) {
        this.$emit('submit');
        this.clearForm();
      }
    }
  },
  beforeMount(): void {
    this.form.fieldName = this.fieldName;
    this.form.description = this.description;
    this.form.rule = this.rule;
    this.form.type = this.typeValue;
    this.form.profileId = this.importProfileId;
  }
}
</script>