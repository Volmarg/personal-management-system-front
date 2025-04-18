<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-5/6 w-full flex flex-col">
      <h2 class="text-lg mb-10"
          v-if="header"
      >{{ header }}</h2>

      <FormInput type="text"
                 v-model="form.title"
                 :is-required="true"
                 :label="$t('notes.new.form.title.label')"
      />

      <Wyswig v-model="form.body"
              :initial-value="initialBody"
      />

      <CategorySelect :label="$t('notes.new.form.category.label')"
                      v-model="form.category"
                      :selected="initialCategory"
                      :required="true"
      />

      <MediumButtonWithIcon :text="$t('notes.new.form.submit.label')"
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
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import CategorySelect       from "@/views/Modules/Notes/Components/CategorySelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import SymfonyNotesRoutes      from "@/router/SymfonyRoutes/Modules/SymfonyNotesRoutes";

export default {
  data(): ComponentData {
    return {
      form: {
        title: '',
        body: '',
        category: null,
      },
    }
  },
  props: {
    id: {
      type: [Number, null],
      required: false,
      default: null
    },
    header: {
      type: String,
      required: false,
      default: ''
    },
    initialBody: {
      type: String,
      required: false,
      default: '',
    },
    initialTitle: {
      type: String,
      required: false,
      default: '',
    },
    initialCategory: {
      type: [Number, null],
      required: false,
      default: null,
    },
  },
  components: {
    CategorySelect,
    MediumButtonWithIcon,
    FormInput,
    Wyswig
  },
  methods: {
    /**
     * @description wipes the form data
     */
    clearFormData(): void {
      this.form.title = '';
      this.form.body = '';
      this.form.category = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyNotesRoutes.NOTES_BASE_URL, this.id, BaseApiResponse, this.form);
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
  beforeMount() {
    this.form.title = this.initialTitle;
    this.form.body = this.initialBody;
    this.form.category = this.initialCategory;
  },
  watch: {
    initialCategory(): void {
      this.form.category = this.initialCategory;
    }
  }
}
</script>