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
                      v-model="form.category"
      />

      <MediumButtonWithIcon :text="$t('notes.settings.form.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="$emit('formSubmit', form)"
      />

    </div>
  </div>
</template>

<script lang="ts">
import CategorySelect       from "@/views/Modules/Notes/Components/CategorySelect.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      form: {
        category: null,
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
    initialCategory: {
      type: [Number, null],
      required: false,
      default: null,
    },
    initialName: {
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
  created(): void {
    this.form.name = this.initialName;
    this.form.category = this.initialCategory;
  }
}
</script>