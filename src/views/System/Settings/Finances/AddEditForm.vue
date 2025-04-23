<template>
  <div class="flex justify-center mt-10">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>

      <FormInput type="text"
                 v-model="form.name"
                 :label="$t('systemSettings.tab.finances.currencies.form.name.label')"
                 :question-mark-text="$t('systemSettings.tab.finances.currencies.form.name.about')"
                 :is-required="true"
      />

      <FormInput type="text"
                 v-model="form.symbol"
                 :label="$t('systemSettings.tab.finances.currencies.form.symbol.label')"
                 :question-mark-text="$t('systemSettings.tab.finances.currencies.form.symbol.about')"
                 :is-required="true"
      />

      <FormInput type="number"
                 v-model="form.multiplier"
                 :label="$t('systemSettings.tab.finances.currencies.form.multiplier.label')"
                 :question-mark-text="$t('systemSettings.tab.finances.currencies.form.multiplier.about')"
                 :is-required="true"
      />

      <div class="ml-6 flex flex-row hover:opacity-70 cursor-pointer">
        <Checkbox class="transform scale-75"
                  v-model="form.isDefault"
                  ref="checkbox"
        />
        <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
               @click="this.$refs.checkbox.toggle()"
        >
          {{ $t('systemSettings.tab.finances.currencies.form.isDefault.label') }}
        </label>
      </div>

      <MediumButtonWithIcon :text="$t('systemSettings.tab.finances.currencies.form.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="ml-6 w-full mb-1 md:col-start-1 md:col-end-2 mt-6 pr-6 md:pr-0"
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
import Checkbox             from "@/components/Form/Checkbox.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import SymfonySystemRoutes     from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";

export default {
  data(): ComponentData {
    return {
      oldName: null,
      form: {
        name: '',
        symbol: '',
        multiplier: '',
        isDefault: false
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
    name: {
      type: [String, null],
      required: false,
      default: null
    },
    symbol: {
      type: [String, null],
      required: false,
      default: null
    },
    multiplier: {
      type: [Number, null],
      required: false,
      default: null
    },
    isDefault: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  components: {
    Checkbox,
    MediumButtonWithIcon,
    FormInput,
  },
  methods: {
    /**
     * @description resets the form state
     */
    clearForm(): void {
      this.form.name = '';
      this.form.symbol = '';
      this.form.multiplier = '';
      this.form.isDefault = false;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let dataBag = {
        ...this.form,
        oldName: this.oldName
      }

      let config = new BackendModuleCallConfig(SymfonySystemRoutes.SETTINGS_FINANCES_BASE_URL, this.id, BaseApiResponse, dataBag);
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
    this.form.symbol = this.symbol;
    this.form.multiplier = this.multiplier;
    this.form.isDefault = this.isDefault;
    this.oldName = this.name;
  }
}
</script>