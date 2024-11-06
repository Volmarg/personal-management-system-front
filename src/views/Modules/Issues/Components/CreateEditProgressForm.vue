<template>
  <div class="flex justify-center w-full">
    <div class="mt-6 w-full flex flex-col lg:w-2/3">
      <h2 class="text-lg mb-2">{{ header }}</h2>

      <Wyswig v-model="form.information"
              :initial-value="initialInformation"
      />

      <FormInput type="datetime-local"
                 v-model="form.date"
                 :label="$t('issues.pending.modal.viewEdit.tabs.progress.form.date.label')"
      />

      <MediumButtonWithIcon :text="$t('issues.pending.modal.viewEdit.tabs.progress.form.submit.label')"
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
import Wyswig               from "@/components/Form/Wyswig.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput            from "@/components/Form/Input.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonyIssuesRoutes from "@/router/SymfonyRoutes/Modules/SymfonyIssuesRoutes";
import BaseApiResponse     from "@/scripts/Response/BaseApiResponse";

export default {
  data(): ComponentData {
    return {
      form: {
        date: '',
        information: '',
      }
    }
  },
  props: {
    id: {
      type: [Number, null],
      required: false,
      default: null,
    },
    issueId: {
      type: [Number, null],
      required: false,
      default: null
    },
    header: {
      type: String,
      required: true,
    },
    initialDate: {
      type: String,
      required: false,
      default: ""
    },
    initialInformation: {
      type: String,
      required: false,
      default: ""
    },
  },
  emits: [
    'submit'
  ],
  components: {
    Wyswig,
    FormInput,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let response: BaseApiResponse;
      if (this.id) {
        response = await this.$moduleCall.update(SymfonyIssuesRoutes.ISSUE_PROGRESS_BASE_URL, this.id, this.form);
      } else {
        response = await this.$moduleCall.new(SymfonyIssuesRoutes.ISSUE_PROGRESS_BASE_URL, this.form, BaseApiResponse, this.issueId);
      }

      if (response.success) {
        this.$emit('submit');
      }
    }
  },
  mounted(): void {
    this.form.date = this.initialDate;
  }
}
</script>