<template>
  <FormInput type="text"
             v-model="form.name"
             :label="$t('todo.common.form.createEditTodo.name.label')"
  />
  <FormInput type="text"
             v-model="form.description"
             :label="$t('todo.common.form.createEditTodo.description.label')"
  />

  <ModuleSelect :options="years"
                :initial-module-id="form.moduleId"
                :initial-record="form.recordId"
                :force-fetched-record-ids="forceFetchedRecordIds"
                @record-change="form.recordId = $event"
                @module-change="form.moduleId = $event"
                :class="{
                  'mb-6': canSelectModule
                }"
                v-show="canSelectModule"
                ref="moduleSelect"
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
                        @button-click="onSubmit"
                        v-if="isSubmitVisible"
  />
</template>

<script lang="ts">
import ModuleSelect         from "@/views/Modules/Todo/Components/ModuleSelect.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Checkbox             from "@/components/Form/Checkbox.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import SymfonyTodoRoutes       from "@/router/SymfonyRoutes/Modules/SymfonyTodoRoutes";
import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";

import {TodoState} from "@/scripts/Vue/Store/Module/Todo/TodoState";

export default {
  data(): ComponentData {
    return {
      form: {
        name: '',
        description: '',
        moduleId: null,
        recordId: null,
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
    initialModuleId: {
      type: String,
      required: false,
      default: null
    },
    initialModuleRecordId: {
      type: Number,
      required: false,
      default: null
    },
    initialShowOnDashboard: {
      type: Boolean,
      required: false,
      default: false
    },
    forceFetchedRecordIds: {
      type: Array,
      required: false,
      default: () => [],
    },
    canSelectModule: {
      type: Boolean,
      required: false,
      default: true,
    },
    isSubmitVisible: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  emits: [
    'submit'
  ],
  components: {
    Checkbox,
    MediumButtonWithIcon,
    FormInput,
    ModuleSelect
  },
  methods: {
    /**
     * @description wipes the form data
     */
    clearFormData(): void {
      this.form.name = '';
      this.form.description = '';
      this.form.moduleId = null;
      this.form.recordId = null;
      this.form.showOnDashboard = false;
      if (this.$refs.moduleSelect) {
        this.$refs.moduleSelect.clearSelections();
      }
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let data = {
        moduleId: this.form.moduleId,
        recordId: this.form.recordId,
        name: this.form.name,
        description: this.form.description,
        isForDashboard: this.form.showOnDashboard,
      };

      let config = new BackendModuleCallConfig(SymfonyTodoRoutes.TODO_BASE_URL, this.id, BaseApiResponse, data);
      config.reload = false;

      let response: BaseApiResponse;
      if (this.id) {
        response = await this.$moduleCall.update(config);
      } else {
        response = await this.$moduleCall.new(config);
      }

      if (response.success) {
        this.$emit('submit');
        await TodoState().fetchModulesWithRecordsData();
        this.clearFormData();
      }
    }
  },
  created(): void {
    this.form.name = this.initialName;
    this.form.description = this.initialDesc;
    this.form.moduleId = this.initialModuleId;
    this.form.recordId = this.initialModuleRecordId;
    this.form.showOnDashboard = this.initialShowOnDashboard;
  },
  watch: {
    initialModuleId(): void {
      this.form.moduleId = this.initialModuleId;
    }
  }
}
</script>