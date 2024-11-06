<template>
  <div class="flex justify-center">
    <div class="mt-6 w-full flex flex-col">
      <h2 class="text-lg mb-2">{{ header }}</h2>
      <FormInput type="text"
                 v-model="form.name"
                 :label="$t('issues.pending.common.createEditForm.name.label')"
      />

      <FormInput type="text"
                 v-model="form.description"
                 :label="$t('issues.pending.common.createEditForm.description.label')"
      />

      <div class="flex flex-row hover:opacity-70 cursor-pointer">
        <Checkbox class="transform scale-75"
                  v-model="form.showOnDashboard"
                  ref="showOnDashboard"
        />
        <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
               @click="$refs.showOnDashboard.toggle()"
        >{{ $t('issues.pending.common.createEditForm.showOnDashboard.label') }}</label>
      </div>

      <MediumButtonWithIcon :text="$t('issues.pending.common.createEditForm.submit.label')"
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

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import SymfonyIssuesRoutes from "@/router/SymfonyRoutes/Modules/SymfonyIssuesRoutes";
import Checkbox from "@/components/Form/Checkbox.vue";
import BaseApiResponse from "@/scripts/Response/BaseApiResponse";

export default {
  data(): ComponentData {
    return {
      form: {
        name: '',
        description: '',
        showOnDashboard: false,
      }
    }
  },
  props: {
    id: {
      type: [Number, null],
      required: false,
      default: null,
    },
    header: {
      type: String,
      required: true,
    },
    initialName: {
      type: String,
      required: false,
      default: ""
    },
    initialDescription: {
      type: String,
      required: false,
      default: ""
    },
    initialShowOnDashboard: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  emits: [
    'submit'
  ],
  components: {
    Checkbox,
    FormInput,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let dataBag = {
        name: this.form.name,
        information: this.form.description,
        isForDashboard: this.form.showOnDashboard,
      };

      let response: BaseApiResponse;
      if (this.id) {
        response = await this.$moduleCall.update(SymfonyIssuesRoutes.ISSUE_BASE_URL, this.id, dataBag);
      } else {
        response = await this.$moduleCall.new(SymfonyIssuesRoutes.ISSUE_BASE_URL, dataBag);
      }

      if (response.success) {
        this.$emit('submit');
      }
    }
  },
  mounted(): void {
    this.form.name = this.initialName;
    this.form.description = this.initialDescription;
    this.form.showOnDashboard = this.initialShowOnDashboard;
  }
}
</script>