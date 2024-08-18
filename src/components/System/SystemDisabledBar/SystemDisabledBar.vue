<template>
  <div v-if="isBarVisible">
    <div v-if="systemDisabledStore.isDisabled && !systemDisabledStore.isSoonDisabled">
      <Alert :is-shown="true"
             :text="systemDisabledStore.message"
             :type="systemDisabledAlertType"
      />
    </div>

    <div v-if="systemDisabledStore.isSoonDisabled && !systemDisabledStore.isDisabled">
      <Alert :is-shown="true"
             :text="systemDisabledStore.soonDisabledMessage"
             :type="systemSoonDisabledAlertType"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Alert, {AlertTypesEnums} from '@/components/Notification/Alert.vue';

import {systemDisabledStore, SystemDisabledState} from "@/scripts/Vue/Store/SystemDisabledState";

import VueRouter              from "@/router/VueRouter";
import EnvReader              from '@/scripts/Core/System/EnvReader';
import {ComponentData}        from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      systemDisabledStore: systemDisabledStore() as any as SystemDisabledState,
    }
  },
  components: {
    Alert,
  },
  computed: {
    /**
     * @description decide if the bar is visible at all
     */
    isBarVisible(): boolean {
      return(
          this.$route.name !== VueRouter.ROUTE_NAME_INFO
      )
    },
    /**
     * @description will return type of the message bar {@see AlertTypesEnums} for state: system soon getting disabled
     */
    systemSoonDisabledAlertType(): string {
      return AlertTypesEnums.info;
    },
    /**
     * @description will return type of the message bar {@see AlertTypesEnums} for state: system disabled
     */
    systemDisabledAlertType(): string {
      return EnvReader.messageBarType();
    },
  },
}
</script>