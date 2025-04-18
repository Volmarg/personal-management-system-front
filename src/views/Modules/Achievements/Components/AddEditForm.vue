<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{header}}</h2>

      <FormInput type="text"
                 v-model="form.name"
                 :is-required="true"
                 :label="$t('achievements.list.form.name.label')"
      />

      <FormInput type="text"
                 v-model="form.description"
                 :label="$t('achievements.list.form.description.label')"
      />

      <MultiSelect
          :label="$t('achievements.list.form.type.label')"
          :options="typeOptions"
          @change="onTypeChanged"
          @select="onTypeChanged"
          @deselect="onTypeChanged"
          @clear="onTypeChanged"
          @paste="onTypeChanged"
          v-model="form.type"
          mode="single"
          :allow-show-options-list="true"
          :allow-create-options="false"
          :can-clear="true"
          :required:="true"
          ref="multiselect"
      />

      <MediumButtonWithIcon :text="$t('achievements.list.form.submitButton.label')"
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
import MultiSelect          from "@/components/Form/MultiSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig   from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse           from "@/scripts/Response/BaseApiResponse";
import StringTypeProcessor       from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import SymfonyAchievementsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyAchievementsRoutes";

export default {
  data(): ComponentData {
    return {
      form: {
        name: null,
        description: null,
        type: null,
      },
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
    name: {
      type: [String, null],
      required: false,
      default: null,
    },
    description: {
      type: [Number, null],
      required: false,
      default: null,
    }
  },
  components: {
    MultiSelect,
    MediumButtonWithIcon,
    FormInput,
  },
  computed: {
    typeOptions(): Array {
      let options = [];
      const types = ["simple", "medium", "hard", "hardcore"];
      for (let type of types) {
        options.push({
          value: type,
          label: StringTypeProcessor.ucFirst(type),
        })
      }

      return options;
    },
  },
  methods: {
    /**
     * @description will save + emit the selected country when country selection option changes
     */
    onTypeChanged(value: number): void {
      this.selected = value;
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    },
    /**
     * @description wipes the form data
     */
    clearForm(): void {
      this.form.name = null;
      this.form.description = null;
      this.form.type = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyAchievementsRoutes.ACHIEVEMENTS_BASE_URL, this.id, BaseApiResponse, this.form);
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
    this.form.name = this.name;
    this.form.description = this.description;
    this.form.type = this.type;
  }
}
</script>