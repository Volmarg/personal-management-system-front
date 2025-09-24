<template>
  <div class="mt-10">
    <h2 class="text-lg mb-4">{{ $t('systemSettings.tab.notifications.configHeader') }}</h2>

    <div class="flex justify-center mt-10">
      <div class="md:w-1/2 lg:w-1/3 w-full flex flex-col">

        <VueInput type="text"
                  :label="$t('systemSettings.tab.notifications.config.discordWebhook.input.label')"
                  :data-type="notification.discordWebhook"
                  top-wrapper-classes=""
                  :ref="`${inputPrefix}_${notification.discordWebhook}`"
                  v-model="inputValues[notification.discordWebhook]"
        />

        <p class="text-red-500 text-center mt-1">
          {{inputValidationErrors[notification.discordWebhook]}}
        </p>

        <!-- Add multiselect in case when there will be multiple usages for this -->
        <div class="mb-2 flex flex-row hover:opacity-70 cursor-pointer mt-2">
          <Checkbox class="transform scale-75"
                    v-model="usages[notification.discordWebhook][useCase.reminder]"
          />
          <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer">
            {{ $t('systemSettings.tab.notifications.config.discordWebhook.checkbox.label') }}
          </label>
        </div>

        <MediumButtonWithIcon :text="$t('systemSettings.tab.notifications.button.submit.label')"
                              :disabled="Object.keys(inputValidationErrors).length > 0"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6 md:pr-0"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              @button-click="onSubmit"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import VueInput             from "@/components/Form/Input.vue";
import Checkbox             from "@/components/Form/Checkbox.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import VuelidateHandler from "@/scripts/Vue/Mixins/VuelidateHandler.vue";

import {helpers} from "@vuelidate/validators";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonySystemRoutes     from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";

const isDiscordUrl = (url) => new RegExp(/http[s]?:\/\/(www.)?discord\.com\/api\/webhooks\//).test(url);

export default {
  data(): ComponentData {
    return {
      notification: {
        discordWebhook: "discordWebhook",
      },
      useCase: {
        reminder: "reminder",
      },
      loadedConfigs: [],
      inputPrefix: 'configInput',
      inputValues: {},
      inputValidationErrors: {},
      usages: {},
    }
  },
  components: {
    Checkbox,
    MediumButtonWithIcon,
    VueInput
  },
  mixins: [
    VuelidateHandler,
  ],
  computed: {
    /**
     * @description validate inputs
     */
    inputValidations(): Record<string, Array> {
      return {
        [this.notification.discordWebhook]: [
            helpers.withMessage(this.$t('systemSettings.tab.notifications.config.discordWebhook.input.validation.notValidUrl'), isDiscordUrl)
        ],
      }
    },
  },
  methods: {
    /**
     * @description will validate the inputs
     */
    validate(): void {
      this.inputValidationErrors = {};
      for (let type of Object.keys(this.inputValues)) {
        let errors = this.validateValue(this.inputValues[type], this.inputValidations[type]);
        if (errors.length > 0) {
          this.inputValidationErrors[type] = errors[0];
        }
      }
    },
    /**
     * @description reads out the loaded config value of given type or return default data set if config was not found
     */
    getConfigData(configType: string): Record<string, string | boolean> {
      let match = this.loadedConfigs.filter((config) => config.name === configType);
      if (match) {
        return match[0];
      }

      return {
        name: configType,
        value: '',
        activeForReminder: false,
      }
    },
    /**
     * @description sends the config values to backend
     */
    onSubmit(): void {
      if (Object.keys(this.inputValidationErrors).length > 0) {
        return;
      }

      let inputRefNames = Object.keys(this.$refs).filter((refName: string) => refName.includes(this.inputPrefix));

      let configs = [] as Array<Record<string, unknown>>;
      for (let refName of inputRefNames) {
        let ref  = this.$refs[refName];
        let type = ref.$el.getAttribute('data-type');

        configs.push({
          name: type,
          value: this.inputValues[type],
          activeForReminder: this.usages[type][this.useCase.reminder],
        });
      }

      let dataBag = {
        'configs': configs
      };

      let config = new BackendModuleCallConfig(SymfonySystemRoutes.SETTINGS_NOTIFICATIONS_CONFIG_BASE, null, BaseApiResponse, dataBag);
      config.reload = false;

      this.$moduleCall.update(config);
    },
    /**
     * @description fetches all the configs data
     */
    async fetchConfigs(): Promise<void> {
      this.loadedConfigs = await this.$moduleCall.getAll(SymfonySystemRoutes.SETTINGS_NOTIFICATIONS_CONFIG_BASE);
      for (let idx of Object.keys(this.notification)) {
        let type = this.notification[idx];
        let configData = this.getConfigData(type);

        this.inputValues[type] = configData?.value ?? '';
        this.usages[type][this.useCase.reminder] = configData?.activeForReminder ?? false;
      }
    }
  },
  beforeMount(): void {
    this.usages[this.notification.discordWebhook] = {
      [this.useCase.reminder]: false
    };

    this.fetchConfigs();
  },
  watch: {
    inputValues: {
      deep: true,
      handler: function () {
        this.validate();
      }
    }
  }
}
</script>