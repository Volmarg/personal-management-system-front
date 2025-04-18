<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg mb-2">{{ header }}</h2>

      <FormInput type="text"
                 v-model="form.name"
                 :is-required="true"
                 :label="$t('calendar.settings.newEntry.form.name.label')"
      />

      <FormInput type="color"
                 v-model="form.color"
                 :label="$t('calendar.settings.newEntry.form.color.label')"
      />

      <MediumButtonWithIcon :text="$t('calendar.settings.newEntry.form.submit.label')"
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

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import SymfonyCalendarRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyCalendarRoutes";

export default {
  data(): ComponentData {
    return {
      poolsStore: null as null | StoreDefinition,
      defaultColor: '#000000',
      form: {
        name: null,
        color: this.defaultColor,
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
    name: {
      type: [String, null],
      required: false,
      default: null,
    },
    color: {
      type: [String, null],
      required: false,
      default: null,
    },
  },
  components: {
    MediumButtonWithIcon,
    FormInput,
  },
  methods: {
    /**
     * @description wipes the form data
     */
    clearForm(): void {
      this.form.name = null;
      this.form.color = this.defaultColor;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let data = {...this.form};
      data.color = data.color.replace("#", "");

      let config = new BackendModuleCallConfig(SymfonyCalendarRoutes.CALENDAR_MANAGE_BASE_URL, this.id, BaseApiResponse, data);
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
    this.form.name = this.name;
    this.form.color = this.color ?? this.defaultColor;
  },
}
</script>