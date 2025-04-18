<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg mb-2">{{ header }}</h2>

      <YearSelect v-model="form.year"
                  :years="years"
                  class="mb-6"
      />

      <FormInput type="text"
                 v-model="form.information"
                 :is-required="true"
                 :label="$t('job.holidays.shared.form.information.label')"
      />

      <FormInput type="number"
                 v-model="form.daysSpent"
                 :is-required="true"
                 :label="$t('job.holidays.shared.form.daysSpent.label')"
      />

      <MediumButtonWithIcon :text="$t('job.holidays.shared.form.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onSubmit"
      />

    </div>
  </div>
</template>
<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";
import YearSelect           from "@/components/Form/YearSelect.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {PoolsState}      from "@/scripts/Vue/Store/Module/Job/Holidays/PoolsState";
import {StoreDefinition} from "pinia";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import SymfonyJobRoutes        from "@/router/SymfonyRoutes/Modules/SymfonyJobRoutes";

export default {
  data(): ComponentData {
    return {
      poolsStore: null as null | StoreDefinition,
      form: {
        daysSpent: null,
        information: null,
        year: null,
      }
    }
  },
  props: {
    header: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: [Number, null],
      required: false,
      default: null,
    },
    year: {
      type: [Number, null],
      required: false,
      default: null,
    },
    daysSpent: {
      type: [String, null],
      required: false,
      default: null,
    },
    information: {
      type: [String, null],
      required: false,
      default: null,
    },
  },
  components: {
    YearSelect,
    MediumButtonWithIcon,
    FormInput,
  },
  computed: {
    /**
     * @description returns all years in pools
     */
    years(): Array {
      return this.poolsStore.allEntries.map((pool:Record) => pool.year);
    }
  },
  methods: {
    /**
     * @description wipes the form data
     */
    clearForm(): void {
      this.form.daysSpent = null;
      this.form.information = null;
      this.form.year = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyJobRoutes.HOLIDAYS_SPENT_BASE_URL, this.id, BaseApiResponse, this.form);
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
  async beforeMount(): Promise<void> {
    this.form.daysSpent = this.daysSpent;
    this.form.information = this.information;
    this.form.year = this.year;

    this.poolsStore = PoolsState();
    await this.poolsStore.getAll();
  },
}
</script>