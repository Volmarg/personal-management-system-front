<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg mb-2">{{ header }}</h2>
      <FormInput type="date"
                 v-model="form.date"
                 :label="$t('job.afterhours.new.form.date.label')"
      />

      <FormInput type="text"
                 v-model="form.description"
                 :label="$t('job.afterhours.new.form.description.label')"
      />

      <FormInput type="number"
                 v-model="form.minutes"
                 :label="$t('job.afterhours.new.form.minutes.label')"
      />

      <GoalInput v-model="form.goal"
                 class="mb-6"
      />

      <TypeSelect v-model="form.type"
                  class="mb-6"
      />

      <MediumButtonWithIcon :text="$t('job.afterhours.new.form.submit.label')"
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
import TypeSelect           from "@/views/Modules/Job/Afterhours/TypeSelect.vue";
import GoalInput            from "@/views/Modules/Job/Afterhours/GoalInput.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import SymfonyJobRoutes        from "@/router/SymfonyRoutes/Modules/SymfonyJobRoutes";
import TypeChecker             from "@/scripts/Core/Services/Types/TypeChecker";

export default {
  data(): ComponentData {
    return {
      form: {
        date: null,
        description: null,
        minutes: null,
        goal: null,
        type: null,
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
    type: {
      type: [String, null],
      required: false,
      default: null,
    },
    date: {
      type: [String, null],
      required: false,
      default: null,
    },
    description: {
      type: [String, null],
      required: false,
      default: null,
    },
    minutes: {
      type: [String, null],
      required: false,
      default: null,
    },
    goal: {
      type: [String, null],
      required: false,
      default: null,
    },
  },
  components: {
    GoalInput, TypeSelect,
    MediumButtonWithIcon,
    FormInput,
  },
  methods: {
    /**
     * @description wipes the form data
     */
    clearForm(): void {
      this.form.date = null;
      this.form.description = null;
      this.form.minutes = null;
      this.form.goal = null;
      this.form.type = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let dataBag = {...this.form};
      if (TypeChecker.isArray(dataBag.goal)) {
        dataBag.goal = dataBag.goal[0];
      }

      let config = new BackendModuleCallConfig(SymfonyJobRoutes.AFTERHOURS_BASE_URL, this.id, BaseApiResponse, dataBag);
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
    this.form.date = this.date;
    this.form.description = this.description;
    this.form.minutes = this.minutes;
    this.form.goal = this.goal;
    this.form.type = this.type;
  }
}
</script>