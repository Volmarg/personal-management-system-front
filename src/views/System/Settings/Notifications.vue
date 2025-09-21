<template>
  <div class="mt-10">
    <h2 class="text-lg mb-4">{{ $t('systemSettings.tab.notifications.configHeader') }}</h2>

    <div class="flex justify-center mt-10">
      <div class="md:w-1/2 lg:w-1/3 w-full flex flex-col">
        <VueInput type="text"
                  :label="$t('systemSettings.tab.notifications.config.webhook')"
                  :data-type="notification.webhook"
                  :ref="`${inputPrefix}_${notification.webhook}`"
                  v-model="inputValues[notification.webhook]"
        />

        <MediumButtonWithIcon :text="$t('systemSettings.tab.notifications.button.submit.label')"
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
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import DashboardMixin from "@/mixins/DashboardMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonySystemRoutes     from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";

export default {
  data(): ComponentData {
    return {
      inputPrefix: 'configInput',
      inputValues: [],
    }
  },
  components: {
    MediumButtonWithIcon,
    VueInput
  },
  mixins: [
    DashboardMixin,
  ],
  methods: {
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
      let inputRefNames = Object.keys(this.$refs).filter((refName: string) => refName.includes(this.inputPrefix));

      let configs = [] as Array<Record<string, unknown>>;
      for (let refName of inputRefNames) {
        let ref  = this.$refs[refName];
        let type = ref.$el.getAttribute('data-type');

        configs.push({
          name: type,
          value: this.inputValues[type],
          activeForReminder: true,
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
        this.inputValues[type] = this.getConfigData(type)?.value ?? '';
      }
    }
  },
  beforeMount(): void {
    this.fetchConfigs();
  }
}
</script>