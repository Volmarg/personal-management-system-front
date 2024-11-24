<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg mb-2">{{ $t('goals.payments.form.header') }}</h2>
      <FormInput type="text"
                 v-model="form.name"
                 :label="$t('goals.payments.form.name.label')"
      />

      <FormInput type="date"
                 v-model="form.start"
                 :label="$t('goals.payments.form.start.label')"
      />

      <FormInput type="date"
                 v-model="form.end"
                 :label="$t('goals.payments.form.end.label')"
      />

      <FormInput type="number"
                 v-model="form.goal"
                 :label="$t('goals.payments.form.goal.label')"
      />

      <FormInput type="number"
                 v-model="form.collected"
                 :label="$t('goals.payments.form.collected.label')"
      />

      <div class="mb-4 flex flex-row hover:opacity-70 cursor-pointer">
        <Checkbox class="transform scale-75"
                  v-model="form.isForDashboard"
                  ref="showOnDashboard"
                  @click="$refs.showOnDashboard.toggle()"
        />
        <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
               @click="$refs.showOnDashboard.toggle()"
        >{{ $t('goals.payments.form.showOnDashboard.label') }}</label>
      </div>

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
import Checkbox             from "@/components/Form/Checkbox.vue";
import FormInput            from "@/components/Form/Input.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";

import BaseApiResponse    from "@/scripts/Response/BaseApiResponse";
import SymfonyGoalsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyGoalsRoutes";

export default {
  data(): ComponentData {
    return {
      form: {
        name: '',
        start: '',
        end: '',
        goal: 0,
        collected: 0,
        isForDashboard: false,
      }
    }
  },
  props: {
    id: {
      type: [Number, null],
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    start: {
      type: String,
      required: false,
      default: '',
    },
    end: {
      type: String,
      required: false,
      default: '',
    },
    goal: {
      type: [String, Number],
      required: false,
      default: 0,
    },
    collected: {
      type: [String, Number],
      required: false,
      default: 0,
    },
    isForDashboard: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    FormInput,
    Checkbox,
    MediumButtonWithIcon
  },
  beforeMount(): void {
    this.form.name = this.name;
    this.form.start = this.start;
    this.form.end = this.end;
    this.form.goal = this.goal;
    this.form.collected = this.collected;
    this.form.isForDashboard = this.isForDashboard;
  },
  methods: {
    /**
     * @description resets the form state
     */
    resetForm(): void {
      this.form.name = '';
      this.form.start = '';
      this.form.end = '';
      this.form.goal = 0;
      this.form.collected = 0;
      this.form.isForDashboard = false;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let response: BaseApiResponse;
      let config = new BackendModuleCallConfig(SymfonyGoalsRoutes.GOAL_PAYMENTS_BASE_URL, this.id, BaseApiResponse, this.form);
      config.parentId = this.issueId;
      config.reload = false;

      if (this.id) {
        response = await this.$moduleCall.update(config);
      } else {
        response = await this.$moduleCall.new(config);
      }

      if (response.success) {
        this.resetForm();
        this.$emit('submit');
      }
    }
  }
}
</script>