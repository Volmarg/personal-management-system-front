<template>
  <FormInput type="text"
             :model-value="form.name"
             :label="$t('todo.common.form.createEditTodo.name.label')"
  />
  <FormInput type="text"
             :model-value="form.description"
             :label="$t('todo.common.form.createEditTodo.description.label')"
  />

  <ModuleSelect :options="years"
                :initial-module="initialModule"
                :initial-record="initialModuleRecord"
                class="mb-6"
  />

  <div class="mt-5 mb-4 flex flex-row hover:opacity-70 cursor-pointer">
    <Checkbox class="transform scale-75"
              v-model="form.showOnDashboard"
    />
    <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
           @click="form.showOnDashboard = !form.showOnDashboard"
    >{{ $t('todo.common.form.createEditTodo.showOnDashboard.label') }}</label>
  </div>

  <MediumButtonWithIcon :text="$t('todo.common.form.createEditTodo.submit.label')"
                        button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                        class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                        button-classes="w-full md:w-auto m-0-force"
                        text-classes="text-center w-full"
                        @button-click="$emit('formSubmit')"
  />
</template>

<script lang="ts">
import ModuleSelect         from "@/views/Modules/Todo/Components/ModuleSelect.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import Checkbox from "@/components/Form/Checkbox.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        name: '',
        description: '',
        module: null,
        moduleId: null,
        showOnDashboard: false,
      }
    }
  },
  props: {
    initialName: {
      type: String,
      required: false,
      default: ''
    },
    initialDesc: {
      type: String,
      required: false,
      default: ''
    },
    initialModule: {
      type: String,
      required: false,
      default: null
    },
    initialModuleRecord: {
      type: Number,
      required: false,
      default: null
    },
    initialShowOnDashboard: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    Checkbox,
    MediumButtonWithIcon,
    FormInput,
    ModuleSelect
  },
  emits: [
    'formSubmit'
  ],
  created(): void {
    this.form.name = this.initialName;
    this.form.description = this.initialDesc;
    this.form.module = this.initialModule;
    this.form.moduleId = this.initialModuleRecord;
    this.form.showOnDashboard = this.initialShowOnDashboard;
  }
}
</script>