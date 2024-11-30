<template>
  <div class="flex justify-center">
    <div class="mt-6 w-full flex flex-col"
         :class="{
            [formWrapperClasses]: true
         }"
    >
      <h2 class="text-lg text-center">{{ header }}</h2>

      <FormInput type="text"
                 v-model="form.name"
                 :label="$t('notes.settings.form.name.label')"
      />

      <CategorySelect :label="$t('notes.settings.form.parent.label')"
                      v-model="form.parentId"
      />

      <MediumButtonWithIcon :text="$t('notes.settings.form.submit.label')"
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
import CategorySelect       from "@/views/Modules/Notes/Components/CategorySelect.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyNotesRoutes      from "@/router/SymfonyRoutes/Modules/SymfonyNotesRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

export default {
  data(): ComponentData {
    return {
      form: {
        parentId: null,
        name: '',
      }
    }
  },
  props: {
    header: {
      type: String,
      required: true,
    },
    formWrapperClasses: {
      type: String,
      required: false,
      default: 'md:w-1/2 lg:w-1/3 '
    },
    parentId: {
      type: [Number, null],
      required: false,
      default: null,
    },
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
  },
  components: {
    MediumButtonWithIcon,
    FormInput,
    CategorySelect
  },
  emits: [
    "formSubmit"
  ],
  methods: {
    /**
     * @description wipes the form data
     */
    clearFormData(): void {
      this.form.parentId = null;
      this.form.name = '';
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyNotesRoutes.NOTES_CATEGORIES_BASE_URL, this.id, BaseApiResponse, this.form);
      config.reload = false;

      let response: BaseApiResponse;
      if (this.id) {
        response = await this.$moduleCall.update(config);
      } else {
        response = await this.$moduleCall.new(config);
      }

      if (response.success) {
        this.$emit('submit');
        this.clearFormData();
      }
    }
  },
  created(): void {
    this.form.name = this.name;
    this.form.parentId = this.parentId;
  }
}
</script>